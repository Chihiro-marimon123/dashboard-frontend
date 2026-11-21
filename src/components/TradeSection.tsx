import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoNaturalEarth1 } from "d3-geo";
import { conflictsByEconomicLoss, conflictTradeData, conflictTradeRoutes, ordinal, type ConflictTradeRoute } from "../data";
import { COMMODITY_PRICE_ROWS, PRICE_YEAR_START } from "../commodityPrices";
import { GEO_URL, MAP_WIDTH, MAP_HEIGHT } from "./WorldChoropleth";
import { UKRAINE_COMMODITY_CHANGES, type UkraineCommodityChange } from "../ukraineCommodityChanges";
import { SYRIA_OIL_TRADE_CHANGES, type SyriaOilTradeChange } from "../syriaOilTradeChanges";
import { VENEZUELA_OIL_TRADE_CHANGES, type VenezuelaOilTradeChange } from "../venezuelaOilTradeChanges";
import { SUDAN_COMMODITY_CHANGES, type SudanCommodityChange } from "../sudanCommodityChanges";

const TRADE_SNAPSHOTS = ["before", "after", "latest"] as const;
type SnapshotKey = (typeof TRADE_SNAPSHOTS)[number];

const SNAPSHOT_LABELS: Record<SnapshotKey, string> = {
  before: "Year before conflict",
  after: "Year after conflict began",
  latest: "Latest available",
};

const routeProjection = geoNaturalEarth1()
  .scale(155)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

const ROUTE_DOT_RADIUS = 2.5;
const ROUTE_ARROW_SIZE = 6;
const ROUTE_LABEL_OFFSET = 9;
const COMMODITY_PRICE_SERIES = COMMODITY_PRICE_ROWS.map(([name, unit, values]) => ({
  name,
  unit,
  prices: values.split(",").map((rawValue, index) => ({
    year: PRICE_YEAR_START + index,
    value: rawValue ? Number(rawValue) : null,
  })),
}));
const RESOURCE_SUPPORTED_CONFLICT = "Russia-Ukraine War";
const RESOURCE_SUPPORTED_SERIES = new Set([
  "Crude oil, average",
  "Crude oil, Brent",
  "Crude oil, Dubai",
  "Crude oil, WTI",
  "Coal, Australian",
  "Coal, South African **",
  "Natural gas, US",
  "Natural gas, Europe",
  "Liquefied natural gas, Japan",
  "Wheat, US SRW",
  "Wheat, US HRW",
  "Barley",
  "Soybean oil",
  "Rapeseed oil",
  "Sunflower oil",
  "Phosphate rock",
  "DAP",
  "TSP",
  "Urea",
  "Potassium chloride **",
  "Copper",
  "Tin",
]);
const DISPLAYED_RESOURCE_SERIES = new Set([
  "Crude oil, average",
  "Coal, Australian",
  "Natural gas, Europe",
  "Wheat, US SRW",
  "Wheat, US HRW",
  "Soybean oil",
  "Rapeseed oil",
  "Sunflower oil",
  "Phosphate rock",
  "DAP",
  "TSP",
  "Urea",
  "Potassium chloride **",
]);

function CommodityPriceChart({ name, unit, change, highlightYear, highlightNextYear, prices }: {
  name: string;
  unit: string;
  change: number;
  highlightYear: number;
  highlightNextYear: number;
  prices: { year: number; value: number | null }[];
}) {
  const chartWidth = 440;
  const chartHeight = 240;
  const margins = { top: 16, right: 12, bottom: 50, left: 58 };
  const values = prices.flatMap((point) => point.value === null ? [] : [point.value]);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const valueRange = dataMax - dataMin || Math.abs(dataMax) * 0.1 || 1;
  const min = Math.max(0, dataMin - valueRange * 0.08);
  const max = dataMax + valueRange * 0.08;
  const plotWidth = chartWidth - margins.left - margins.right;
  const plotHeight = chartHeight - margins.top - margins.bottom;
  const highlightIndex = prices.findIndex((point) => point.year === highlightYear);
  const highlightNextIndex = prices.findIndex((point) => point.year === highlightNextYear);
  const highlightedIndices = [highlightIndex, highlightNextIndex];
  const x = (index: number) => margins.left + (index / (prices.length - 1)) * plotWidth;
  const y = (value: number) => margins.top + ((max - value) / (max - min)) * plotHeight;
  const line = prices.reduce<string[]>((segments, point, index) => {
    if (point.value === null) return segments;
    const previousWasMissing = index === 0 || prices[index - 1].value === null;
    segments.push(`${previousWasMissing ? "M" : "L"} ${x(index).toFixed(1)} ${y(point.value).toFixed(1)}`);
    return segments;
  }, []).join(" ");
  const yTicks = Array.from({ length: 4 }, (_, index) => max - ((max - min) * index) / 3);
  const xTicks = [0, 10, 20, ...highlightedIndices, prices.length - 1].filter((index, position, all) => index >= 0 && index < prices.length && all.indexOf(index) === position);
  const highlightStart = prices[highlightIndex]?.value;
  const highlightEnd = prices[highlightNextIndex]?.value;

  return (
    <article style={{ minWidth: 0, border: "1px solid #263342", borderRadius: 8, background: "#0c1118", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", marginBottom: 8 }}>
        <h4 style={{ margin: 0, color: "#dde4ee", fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{name}</h4>
        <div style={{ display: "flex", flexShrink: 0, alignItems: "baseline", gap: 8 }}>
          <span style={{ color: change >= 0 ? "#e3b84e" : "#e07b70", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>{change > 0 ? "+" : ""}{change.toFixed(1)}%</span>
          <span style={{ color: "#7a8899", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>{unit}</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`${name} annual average price from 2000 to 2026`} style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}>
        {yTicks.map((tick, index) => {
          const tickY = y(tick);
          return (
            <g key={index}>
              <line x1={margins.left} x2={chartWidth - margins.right} y1={tickY} y2={tickY} stroke="#243141" strokeWidth={1} />
              <text x={margins.left - 8} y={tickY + 3} textAnchor="end" fill="#7a8899" fontSize={9} fontFamily="JetBrains Mono, monospace">{tick.toLocaleString("en-US", { maximumSignificantDigits: 3 })}</text>
            </g>
          );
        })}
        {highlightedIndices.map((index) => index >= 0 && (
          <line key={index} x1={x(index)} x2={x(index)} y1={margins.top} y2={margins.top + plotHeight} stroke="#45d483" strokeWidth={1.25} strokeDasharray="4 4" strokeOpacity={0.65} />
        ))}
        <path d={line} fill="none" stroke="#e3b84e" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {highlightIndex >= 0 && highlightNextIndex === highlightIndex + 1 && highlightStart !== null && highlightStart !== undefined && highlightEnd !== null && highlightEnd !== undefined && (
          <line x1={x(highlightIndex)} y1={y(highlightStart)} x2={x(highlightNextIndex)} y2={y(highlightEnd)} stroke="#45d483" strokeWidth={4} strokeLinecap="round" />
        )}
        {prices.map((point, index) => point.value === null ? null : (
          <circle key={point.year} cx={x(index)} cy={y(point.value)} r={highlightedIndices.includes(index) ? 4.5 : 2.2} fill={highlightedIndices.includes(index) ? "#45d483" : "#f0c75e"} stroke={highlightedIndices.includes(index) ? "#0c1118" : "none"} strokeWidth={1.5}>
            <title>{`${point.year}: ${point.value} ${unit}`}</title>
          </circle>
        ))}
        {xTicks.map((index) => (
          <text key={index} x={x(index)} y={chartHeight - (index === highlightIndex ? 16 : 29)} textAnchor="middle" fill={highlightedIndices.includes(index) ? "#45d483" : "#7a8899"} fontSize={9} fontWeight={highlightedIndices.includes(index) ? 700 : 400} fontFamily="JetBrains Mono, monospace">{prices[index].year}</text>
        ))}
        <text x={14} y={margins.top + plotHeight / 2} textAnchor="middle" fill="#9aa6b5" fontSize={9} fontFamily="JetBrains Mono, monospace" transform={`rotate(-90 14 ${margins.top + plotHeight / 2})`}>Price</text>
        <text x={margins.left + plotWidth / 2} y={chartHeight - 5} textAnchor="middle" fill="#9aa6b5" fontSize={9} fontFamily="JetBrains Mono, monospace">Year</text>
      </svg>
    </article>
  );
}

function SyriaOilPriceContext({ prices }: {
  prices: { year: number; value: number | null }[];
}) {
  const chartWidth = 540;
  const chartHeight = 250;
  const margins = { top: 18, right: 18, bottom: 38, left: 60 };
  const values = prices.flatMap((point) => point.value === null ? [] : [point.value]);
  const min = Math.floor(Math.min(...values) / 20) * 20;
  const max = Math.ceil(Math.max(...values) / 20) * 20;
  const plotWidth = chartWidth - margins.left - margins.right;
  const plotHeight = chartHeight - margins.top - margins.bottom;
  const x = (index: number) => margins.left + (index / (prices.length - 1)) * plotWidth;
  const y = (value: number) => margins.top + ((max - value) / (max - min)) * plotHeight;
  const line = prices.reduce<string[]>((segments, point, index) => {
    if (point.value === null) return segments;
    segments.push(`${index === 0 || prices[index - 1].value === null ? "M" : "L"} ${x(index).toFixed(1)} ${y(point.value).toFixed(1)}`);
    return segments;
  }, []).join(" ");
  const indexForYear = (year: number) => prices.findIndex((point) => point.year === year);
  const periodStart = indexForYear(2011);
  const periodEnd = indexForYear(2013);
  const price2010 = prices.find((point) => point.year === 2010)?.value;
  const price2011 = prices.find((point) => point.year === 2011)?.value;
  const price2013 = prices.find((point) => point.year === 2013)?.value;
  const periodValues = prices.slice(periodStart, periodEnd + 1);
  const periodLine = periodValues.reduce<string[]>((segments, point, index) => {
    if (point.value === null) return segments;
    const pointIndex = periodStart + index;
    segments.push(`${index === 0 ? "M" : "L"} ${x(pointIndex).toFixed(1)} ${y(point.value).toFixed(1)}`);
    return segments;
  }, []).join(" ");
  const ticks = Array.from({ length: 5 }, (_, index) => max - ((max - min) * index) / 4);
  const yearTicks = [2010, 2013, 2016, 2019, 2022, 2026].map(indexForYear).filter((index) => index >= 0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 24, alignItems: "center", border: "1px solid #263342", borderRadius: 8, background: "#0c1118", padding: 20 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <strong style={{ color: "#dde4ee", fontSize: 14 }}>Crude oil, average</strong>
          <span style={{ color: "#7a8899", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>US dollars per barrel</span>
        </div>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="International crude oil average price from 2010 to 2026, with the Syria conflict period highlighted from 2011 to 2013" style={{ display: "block", width: "100%", height: "auto" }}>
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={margins.left} x2={chartWidth - margins.right} y1={y(tick)} y2={y(tick)} stroke="#243141" />
              <text x={margins.left - 8} y={y(tick) + 3} textAnchor="end" fill="#7a8899" fontSize={9} fontFamily="JetBrains Mono, monospace">${tick}</text>
            </g>
          ))}
          {periodStart >= 0 && periodEnd >= 0 && (
            <rect x={x(periodStart) - 5} y={margins.top} width={x(periodEnd) - x(periodStart) + 10} height={plotHeight} fill="#45d483" fillOpacity={0.12} />
          )}
          <path d={line} fill="none" stroke="#e3b84e" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path d={periodLine} fill="none" stroke="#45d483" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
          {prices.map((point, index) => point.value === null ? null : (
            <circle key={point.year} cx={x(index)} cy={y(point.value)} r={point.year >= 2011 && point.year <= 2013 ? 4 : 2} fill={point.year >= 2011 && point.year <= 2013 ? "#45d483" : "#f0c75e"}>
              <title>{`${point.year}: $${point.value.toFixed(2)} per barrel`}</title>
            </circle>
          ))}
          {yearTicks.map((index) => (
            <text key={index} x={x(index)} y={chartHeight - 14} textAnchor="middle" fill={prices[index].year >= 2011 && prices[index].year <= 2013 ? "#45d483" : "#7a8899"} fontSize={9} fontFamily="JetBrains Mono, monospace">{prices[index].year}</text>
          ))}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#9aa6b5", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}>
          <span>Price (US$/barrel)</span><span>Year</span>
        </div>
      </div>
      <div>
        <div style={{ color: "#45d483", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 1, marginBottom: 10 }}>SYRIA CONFLICT · 2011–2013 FOCUS</div>
        <p style={{ margin: 0, color: "#c5ced8", fontSize: 13, lineHeight: 1.75 }}>
          WESP 2014 identifies the Syrian conflict and wider regional tensions as geopolitical risks to oil supply. These concerns can add an upward risk premium to international crude prices. The World Bank annual average rose from {price2010 == null ? "" : `$${price2010.toFixed(0)}`} per barrel in 2010 to {price2011 == null ? "" : `$${price2011.toFixed(0)}`} in 2011 and remained elevated at {price2013 == null ? "" : `$${price2013.toFixed(0)}`} in 2013. The report notes significant oil-price fluctuations during 2013 amid geopolitical issues.
        </p>
        <p style={{ margin: "12px 0 0", color: "#8190a1", fontSize: 11, lineHeight: 1.7 }}>
          The highlighted movement is the global annual average, not a Syria-specific price. Other supply and demand factors also affected prices; the chart does not isolate a causal Syria-only effect.
        </p>
        <a href="https://policy.desa.un.org/sites/default/files/inline-images/eapd2023/2013/12/WESP2014.pdf" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 12, color: "#9aa6b5", fontSize: 11, textDecoration: "underline" }}>United Nations, World Economic Situation and Prospects 2014</a>
      </div>
    </div>
  );
}

function getRouteGeometry(route: ConflictTradeRoute) {
  const start = routeProjection(route.originCoords);
  const end = routeProjection(route.destinationCoords);
  if (!start || !end) return null;

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const distance = Math.hypot(dx, dy);
  const ux = dx / distance;
  const uy = dy / distance;
  const bend = Math.min(distance * 0.22, 34);
  const controlX = (start[0] + end[0]) / 2 - uy * bend;
  const controlY = (start[1] + end[1]) / 2 + ux * bend;

  // Trim both ends so the line leaves the origin dot and the arrow tip stops at the destination dot's edge.
  const gap = ROUTE_DOT_RADIUS + 1.5;
  const startAngle = Math.atan2(controlY - start[1], controlX - start[0]);
  const endAngle = Math.atan2(end[1] - controlY, end[0] - controlX);
  const lineStart = [start[0] + gap * Math.cos(startAngle), start[1] + gap * Math.sin(startAngle)];
  const arrowSize = Math.min(ROUTE_ARROW_SIZE, distance * 0.3);
  const tip = [end[0] - gap * Math.cos(endAngle), end[1] - gap * Math.sin(endAngle)];
  const arrowBase = [tip[0] - arrowSize * Math.cos(endAngle), tip[1] - arrowSize * Math.sin(endAngle)];
  const arrow = [
    `${tip[0]},${tip[1]}`,
    `${tip[0] - arrowSize * Math.cos(endAngle - Math.PI / 7)},${tip[1] - arrowSize * Math.sin(endAngle - Math.PI / 7)}`,
    `${tip[0] - arrowSize * Math.cos(endAngle + Math.PI / 7)},${tip[1] - arrowSize * Math.sin(endAngle + Math.PI / 7)}`,
  ].join(" ");

  // Push each label away from the other endpoint so close pairs don't overlap.
  const labelOffset = (sign: number): { x: number; y: number; anchor: "start" | "middle" | "end" } => ({
    x: sign * ux * ROUTE_LABEL_OFFSET,
    y: sign * uy * ROUTE_LABEL_OFFSET + 3,
    anchor: Math.abs(ux) < 0.35 ? "middle" : sign * ux > 0 ? "start" : "end",
  });

  return {
    path: `M ${lineStart[0]},${lineStart[1]} Q ${controlX},${controlY} ${arrowBase[0]},${arrowBase[1]}`,
    arrow,
    originLabel: labelOffset(-1),
    destinationLabel: labelOffset(1),
  };
}

function formatTradeValue(value: number | null) {
  return value === null ? "Data unavailable" : `$${value.toFixed(1)}B`;
}

function formatRouteValue(value: number) {
  return value >= 1_000_000_000
    ? `$${(value / 1_000_000_000).toFixed(2)}B`
    : `$${(value / 1_000_000).toFixed(1)}M`;
}

const UKRAINE_CHANGE_BY_COUNTRY = new Map(
  UKRAINE_COMMODITY_CHANGES.map((entry) => [entry.countryId, entry]),
);
const UKRAINE_PARTNERS_WITHOUT_MAP_SHAPE = new Set(["344"]);
const SYRIA_OIL_CHANGE_BY_COUNTRY = new Map(
  SYRIA_OIL_TRADE_CHANGES.map((entry) => [entry.countryId, entry]),
);
const SYRIA_OIL_PARTNERS_WITHOUT_MAP_SHAPE = new Set(["48"]);
const VENEZUELA_OIL_CHANGE_BY_COUNTRY = new Map(
  VENEZUELA_OIL_TRADE_CHANGES.map((entry) => [entry.countryId, entry]),
);
const VENEZUELA_OIL_PARTNERS_WITHOUT_MAP_SHAPE = new Set(["533", "60", "308", "670", "702"]);
const SUDAN_COMMODITY_CHANGE_BY_COUNTRY = new Map(
  SUDAN_COMMODITY_CHANGES.map((entry) => [entry.countryId, entry]),
);

function formatCommodityExport(value: number | null) {
  if (value === null) return "No report";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${value.toLocaleString("en-US")}`;
}

function formatCommodityChange(value: number | null) {
  if (value === null) return "No 2021 export";
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function getCombinedUkraineChange(entry: UkraineCommodityChange) {
  const wheatBefore = entry.wheatBefore;
  const wheatAfter = entry.wheatAfter;
  const cornBefore = entry.cornBefore;
  const cornAfter = entry.cornAfter;
  const before = wheatBefore + cornBefore;
  const after = wheatAfter + cornAfter;
  if (before === 0) return null;
  return ((after - before) / before) * 100;
}

function getSyriaOilChange(before: number | null, after: number | null) {
  if (before === null || after === null || before === 0) return null;
  return ((after - before) / before) * 100;
}

function getSyriaOilDirection(entry: SyriaOilTradeChange) {
  const changes = [
    getSyriaOilChange(entry.crudeBefore, entry.crudeAfter),
    getSyriaOilChange(entry.petroleumBefore, entry.petroleumAfter),
  ].filter((change): change is number => change !== null && Math.abs(change) >= 10);
  return {
    increase: changes.some((change) => change >= 10),
    decrease: changes.some((change) => change <= -10),
  };
}

function formatSyriaOilChange(value: number | null) {
  if (value === null) return "No comparable report";
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function getVenezuelaOilDirection(entry: VenezuelaOilTradeChange) {
  const changes = [
    getSyriaOilChange(entry.crudeBefore, entry.crudeAfter),
    getSyriaOilChange(entry.petroleumBefore, entry.petroleumAfter),
  ].filter((change): change is number => change !== null && Math.abs(change) >= 10);
  return changes.reduce<number | null>((largest, change) => largest === null || Math.abs(change) > Math.abs(largest) ? change : largest, null);
}

function getSudanCommodityChange(before: number | null, after: number | null) {
  if (before === null || after === null || before === 0) return null;
  return ((after - before) / before) * 100;
}

function getSudanCommodityDirection(entry: SudanCommodityChange) {
  const changes = [
    getSudanCommodityChange(entry.goldBefore, entry.goldAfter),
    getSudanCommodityChange(entry.sesameBefore, entry.sesameAfter),
  ].filter((change): change is number => change !== null && Math.abs(change) >= 10);
  return changes.reduce<number | null>((largest, change) => largest === null || Math.abs(change) > Math.abs(largest) ? change : largest, null);
}

export default function TradeSection() {
  const [selectedConflict, setSelectedConflict] = useState(0);
  const [hoveredCommodityCountry, setHoveredCommodityCountry] = useState<UkraineCommodityChange | null>(null);
  const [hoveredSyriaOilCountry, setHoveredSyriaOilCountry] = useState<SyriaOilTradeChange | null>(null);
  const [hoveredVenezuelaOilCountry, setHoveredVenezuelaOilCountry] = useState<VenezuelaOilTradeChange | null>(null);
  const [hoveredSudanCommodityCountry, setHoveredSudanCommodityCountry] = useState<SudanCommodityChange | null>(null);
  const conflict = conflictsByEconomicLoss[selectedConflict];
  const trade = conflictTradeData.find((entry) => entry.rank === conflict.rank);
  const tradeRoute = conflictTradeRoutes.find((route) => route.rank === conflict.rank);
  const isUkraineGrainTrade = conflict.name === "Russia-Ukraine War";
  const isSyriaOilTrade = conflict.name === "Syrian Civil War";
  const isVenezuelaOilTrade = conflict.name === "Venezuelan Political Crisis";
  const isSudanCommodityTrade = conflict.name === "Sudan Civil War";
  const affectedUkraineCountries = UKRAINE_COMMODITY_CHANGES.filter((entry) => {
    if (UKRAINE_PARTNERS_WITHOUT_MAP_SHAPE.has(entry.countryId)) return false;
    const change = getCombinedUkraineChange(entry);
    return change !== null && Math.abs(change) >= 10;
  });
  const increasedUkraineCountries = affectedUkraineCountries.filter((entry) => (getCombinedUkraineChange(entry) ?? 0) >= 10).length;
  const decreasedUkraineCountries = affectedUkraineCountries.filter((entry) => (getCombinedUkraineChange(entry) ?? 0) <= -10).length;
  const affectedSyriaOilCountries = SYRIA_OIL_TRADE_CHANGES.filter((entry) => {
    if (SYRIA_OIL_PARTNERS_WITHOUT_MAP_SHAPE.has(entry.countryId)) return false;
    const direction = getSyriaOilDirection(entry);
    return direction.increase || direction.decrease;
  });
  const increasedSyriaOilCountries = affectedSyriaOilCountries.filter((entry) => getSyriaOilDirection(entry).increase && !getSyriaOilDirection(entry).decrease).length;
  const decreasedSyriaOilCountries = affectedSyriaOilCountries.filter((entry) => getSyriaOilDirection(entry).decrease && !getSyriaOilDirection(entry).increase).length;
  const affectedVenezuelaOilCountries = VENEZUELA_OIL_TRADE_CHANGES.filter((entry) => getVenezuelaOilDirection(entry) !== null);
  const mappedVenezuelaOilCountries = affectedVenezuelaOilCountries.filter((entry) => !VENEZUELA_OIL_PARTNERS_WITHOUT_MAP_SHAPE.has(entry.countryId));
  const increasedVenezuelaOilCountries = mappedVenezuelaOilCountries.filter((entry) => (getVenezuelaOilDirection(entry) ?? 0) >= 10).length;
  const decreasedVenezuelaOilCountries = mappedVenezuelaOilCountries.filter((entry) => (getVenezuelaOilDirection(entry) ?? 0) <= -10).length;
  const affectedSudanCommodityCountries = SUDAN_COMMODITY_CHANGES.filter((entry) => getSudanCommodityDirection(entry) !== null);
  const increasedSudanCommodityCountries = affectedSudanCommodityCountries.filter((entry) => (getSudanCommodityDirection(entry) ?? 0) >= 10).length;
  const decreasedSudanCommodityCountries = affectedSudanCommodityCountries.filter((entry) => (getSudanCommodityDirection(entry) ?? 0) <= -10).length;
  const onsetYear = Number(conflict.period.match(/\b(?:19|20)\d{2}\b/)?.[0]);
  const hasReportBackedConflict = conflict.name === RESOURCE_SUPPORTED_CONFLICT;
  const isSyriaConflict = conflict.name === "Syrian Civil War";
  const crudeOilSeries = COMMODITY_PRICE_SERIES.find((series) => series.name === "Crude oil, average");
  const crudeOilSince2010 = crudeOilSeries?.prices.filter((point) => point.year >= 2010) ?? [];
  const commodityPriceMatches = hasReportBackedConflict ? COMMODITY_PRICE_SERIES.flatMap((series) => {
    if (!RESOURCE_SUPPORTED_SERIES.has(series.name) || !DISPLAYED_RESOURCE_SERIES.has(series.name)) return [];
    const previousPrice = series.prices.find((point) => point.year === onsetYear - 1)?.value;
    const onsetPrice = series.prices.find((point) => point.year === onsetYear)?.value;
    if (previousPrice === null || previousPrice === undefined || onsetPrice === null || onsetPrice === undefined || previousPrice === 0) return [];
    const change = ((onsetPrice - previousPrice) / previousPrice) * 100;
    return Math.abs(change) >= 10 ? [{ ...series, change }] : [];
  }) : [];
  const routeGeometry = tradeRoute ? getRouteGeometry(tradeRoute) : null;
  const previousTotal = trade && trade.before.exports !== null && trade.before.imports !== null
    ? trade.before.exports + trade.before.imports
    : null;

  return (
    <section id="trade" style={{ background: "#000000", padding: "80px 0", border: "1px solid #000000", boxShadow: "rgba(0,0,0,0.25) 0px 4px 4px 0px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          SECTION 02
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 42, fontWeight: 700, color: "#dde4ee", lineHeight: 1.15, marginBottom: 12 }}>
          How does conflict affect
          <br />
          <span style={{ color: "#dfa92a" }}>global trade?</span>
        </h2>
        <div style={{ fontSize: 13, color: "#7a8899", letterSpacing: 1, textTransform: "uppercase", marginBottom: 32 }}>
          Highlights: Top 10 Conflicts by Economic Loss
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          {conflictsByEconomicLoss.map((item, index) => (
            <button
              key={item.rank}
              type="button"
              onClick={() => {
                setSelectedConflict(index);
                setHoveredCommodityCountry(null);
                setHoveredSyriaOilCountry(null);
                setHoveredVenezuelaOilCountry(null);
                setHoveredSudanCommodityCountry(null);
              }}
              aria-pressed={index === selectedConflict}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: `1px solid ${index === selectedConflict ? "#dfa92a" : "#1a2435"}`,
                background: index === selectedConflict ? "#1a160a" : "transparent",
                cursor: "pointer",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                color: index === selectedConflict ? "#dfa92a" : "#7a8899",
                transition: "all 0.2s",
              }}
            >
              <span style={{ opacity: 0.6 }}>{ordinal(item.rank)} · </span>
              {item.country}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#dde4ee" }}>
            Trade in {conflict.country}: exports and imports
          </div>
          <div style={{ fontSize: 12, color: "#7a8899", marginTop: 4 }}>
            Conflict onset: {conflict.period} · Values are annual merchandise trade in current US dollars
          </div>
        </div>

        <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid #1a2435" }}>
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 155 }}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            style={{ width: "100%", height: "auto", display: "block", background: "#070b10" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) => geographies.map((geo) => {
                const countryId = String(Number(geo.id));
                const isSelected = countryId === trade?.countryId;
                const commodityChange = isUkraineGrainTrade ? UKRAINE_CHANGE_BY_COUNTRY.get(countryId) : undefined;
                const syriaOilChange = isSyriaOilTrade ? SYRIA_OIL_CHANGE_BY_COUNTRY.get(countryId) : undefined;
                const venezuelaOilChange = isVenezuelaOilTrade ? VENEZUELA_OIL_CHANGE_BY_COUNTRY.get(countryId) : undefined;
                const sudanCommodityChange = isSudanCommodityTrade ? SUDAN_COMMODITY_CHANGE_BY_COUNTRY.get(countryId) : undefined;
                const combinedChange = commodityChange ? getCombinedUkraineChange(commodityChange) : null;
                const isCommodityIncrease = combinedChange !== null && combinedChange >= 10;
                const isCommodityDecrease = combinedChange !== null && combinedChange <= -10;
                const syriaDirection = syriaOilChange ? getSyriaOilDirection(syriaOilChange) : null;
                const isSyriaIncrease = syriaDirection?.increase === true && !syriaDirection.decrease;
                const isSyriaDecrease = syriaDirection?.decrease === true && !syriaDirection.increase;
                const venezuelaDirection = venezuelaOilChange ? getVenezuelaOilDirection(venezuelaOilChange) : null;
                const sudanDirection = sudanCommodityChange ? getSudanCommodityDirection(sudanCommodityChange) : null;
                const isIncrease = isUkraineGrainTrade ? isCommodityIncrease : isSyriaOilTrade ? isSyriaIncrease : isVenezuelaOilTrade ? venezuelaDirection !== null && venezuelaDirection >= 10 : sudanDirection !== null && sudanDirection >= 10;
                const isDecrease = isUkraineGrainTrade ? isCommodityDecrease : isSyriaOilTrade ? isSyriaDecrease : isVenezuelaOilTrade ? venezuelaDirection !== null && venezuelaDirection <= -10 : sudanDirection !== null && sudanDirection <= -10;
                const countryFill = isIncrease ? "#26885a" : isDecrease ? "#9c3e3e" : isSelected ? "#dfa92a" : "#141e2e";
                const countryStroke = isIncrease ? "#70dc9d" : isDecrease ? "#ed7777" : isSelected ? "#fff0b3" : "#0c1420";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryFill}
                    stroke={countryStroke}
                    strokeWidth={isIncrease || isDecrease || isSelected ? 1 : 0.4}
                    onMouseEnter={() => commodityChange && setHoveredCommodityCountry(commodityChange)}
                    onMouseLeave={() => {
                      setHoveredCommodityCountry(null);
                      setHoveredSyriaOilCountry(null);
                      setHoveredVenezuelaOilCountry(null);
                      setHoveredSudanCommodityCountry(null);
                    }}
                    onMouseMove={() => {
                      if (syriaOilChange) setHoveredSyriaOilCountry(syriaOilChange);
                      if (venezuelaOilChange) setHoveredVenezuelaOilCountry(venezuelaOilChange);
                      if (sudanCommodityChange) setHoveredSudanCommodityCountry(sudanCommodityChange);
                    }}
                    style={{ default: { outline: "none" }, hover: { outline: "none", opacity: 0.85 }, pressed: { outline: "none" } }}
                  />
                );
              })}
            </Geographies>
            {routeGeometry && tradeRoute && (
              <g>
                <path d={routeGeometry.path} fill="none" stroke="#070b10" strokeWidth={4.5} strokeLinecap="round" />
                <path d={routeGeometry.path} fill="none" stroke="#f0c75e" strokeWidth={2} strokeLinecap="round" />
                <polygon points={routeGeometry.arrow} fill="#f0c75e" stroke="#070b10" strokeWidth={1} strokeLinejoin="round" />
              </g>
            )}
            {tradeRoute && (
              <>
                <Marker coordinates={tradeRoute.originCoords}>
                  <circle r={ROUTE_DOT_RADIUS} fill="#fff0b3" stroke="#070b10" strokeWidth={1.25} />
                  <text x={routeGeometry?.originLabel.x ?? 0} y={routeGeometry?.originLabel.y ?? -9} textAnchor={routeGeometry?.originLabel.anchor ?? "middle"} style={{ fontSize: 8, fill: "#fff0b3", fontFamily: "JetBrains Mono, monospace", fontWeight: "bold" }}>{tradeRoute.origin}</text>
                </Marker>
                <Marker coordinates={tradeRoute.destinationCoords}>
                  <circle r={ROUTE_DOT_RADIUS} fill="#fff0b3" stroke="#070b10" strokeWidth={1.25} />
                  <text x={routeGeometry?.destinationLabel.x ?? 0} y={routeGeometry?.destinationLabel.y ?? -9} textAnchor={routeGeometry?.destinationLabel.anchor ?? "middle"} style={{ fontSize: 8, fill: "#fff0b3", fontFamily: "JetBrains Mono, monospace", fontWeight: "bold" }}>{tradeRoute.destination}</text>
                </Marker>
              </>
            )}
          </ComposableMap>
          {isUkraineGrainTrade || isSyriaOilTrade || isVenezuelaOilTrade || isSudanCommodityTrade ? (
            <div aria-label={isUkraineGrainTrade ? "Ukraine grain export change legend" : isSyriaOilTrade ? "Syria oil trade change legend" : isVenezuelaOilTrade ? "Venezuela oil trade change legend" : "Sudan gold sesame trade change legend"} style={{ position: "absolute", left: 12, top: 12, display: "grid", gap: 6, background: "rgba(7,11,16,0.94)", border: "1px solid #1a2435", borderRadius: 6, padding: "9px 11px", color: "#c5ced8", fontSize: 10, maxWidth: "min(235px, 60%)" }}>
              <div style={{ color: "#dde4ee", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>{isUkraineGrainTrade ? "UKRAINE · WHEAT + CORN" : isSyriaOilTrade ? "SYRIA · CRUDE + PETROLEUM" : isVenezuelaOilTrade ? "VENEZUELA · CRUDE + PETROLEUM" : "SUDAN · GOLD + SESAME"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "#26885a" }} />Exports up ≥10%: {isUkraineGrainTrade ? increasedUkraineCountries : isSyriaOilTrade ? increasedSyriaOilCountries : isVenezuelaOilTrade ? increasedVenezuelaOilCountries : increasedSudanCommodityCountries}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "#9c3e3e" }} />Exports down ≥10%: {isUkraineGrainTrade ? decreasedUkraineCountries : isSyriaOilTrade ? decreasedSyriaOilCountries : isVenezuelaOilTrade ? decreasedVenezuelaOilCountries : decreasedSudanCommodityCountries}</div>
            </div>
          ) : (
            <div style={{ position: "absolute", left: 16, top: 16, display: "flex", alignItems: "center", gap: 8, background: "rgba(7,11,16,0.88)", border: "1px solid #1a2435", borderRadius: 6, padding: "8px 12px" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "#dfa92a" }} />
              <span style={{ fontSize: 12, color: "#dde4ee" }}>{conflict.country}</span>
            </div>
          )}
          {tradeRoute && (
            <div style={{ position: "absolute", right: 16, top: 16, maxWidth: "min(360px, 58%)", background: "rgba(7,11,16,0.9)", border: "1px solid #76612e", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ color: "#f0c75e", fontSize: 11, fontFamily: "JetBrains Mono, monospace", marginBottom: 5 }}>{tradeRoute.commodity}</div>
              <div style={{ color: "#dde4ee", fontSize: 12 }}>{tradeRoute.origin} → {tradeRoute.destination}</div>
              <div style={{ color: "#b0b8c8", fontSize: 11, marginTop: 5 }}>
                {tradeRoute.beforeYear} {formatRouteValue(tradeRoute.beforeValueUsd)} → {tradeRoute.afterYear} {formatRouteValue(tradeRoute.afterValueUsd)}
              </div>
            </div>
          )}
          {isUkraineGrainTrade && hoveredCommodityCountry && (
            <div role="status" style={{ position: "absolute", right: 12, bottom: 12, width: "min(290px, calc(100% - 24px))", background: "rgba(7,11,16,0.96)", border: `1px solid ${(getCombinedUkraineChange(hoveredCommodityCountry) ?? 0) >= 0 ? "#26885a" : "#9c3e3e"}`, borderRadius: 6, padding: "10px 12px", pointerEvents: "none", boxShadow: "0 6px 24px rgba(0,0,0,0.45)" }}>
              <div style={{ color: "#dde4ee", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{hoveredCommodityCountry.countryName}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "5px 10px", alignItems: "baseline", fontSize: 10, color: "#9aa6b5" }}>
                <span>Commodity</span><span>2021</span><span>2023 · change</span>
                <span>Wheat</span><span style={{ color: "#c5ced8" }}>{formatCommodityExport(hoveredCommodityCountry.wheatBefore)}</span><span style={{ color: (hoveredCommodityCountry.wheatChange ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{formatCommodityExport(hoveredCommodityCountry.wheatAfter)} · {formatCommodityChange(hoveredCommodityCountry.wheatChange)}</span>
                <span>Maize</span><span style={{ color: "#c5ced8" }}>{formatCommodityExport(hoveredCommodityCountry.cornBefore)}</span><span style={{ color: (hoveredCommodityCountry.cornChange ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{formatCommodityExport(hoveredCommodityCountry.cornAfter)} · {formatCommodityChange(hoveredCommodityCountry.cornChange)}</span>
                <span style={{ gridColumn: "1 / 2", borderTop: "1px solid #263342", paddingTop: 5 }}>Combined</span><span style={{ gridColumn: "2 / 4", borderTop: "1px solid #263342", paddingTop: 5, textAlign: "right", color: (getCombinedUkraineChange(hoveredCommodityCountry) ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{formatCommodityChange(getCombinedUkraineChange(hoveredCommodityCountry))}</span>
              </div>
            </div>
          )}
          {isSyriaOilTrade && hoveredSyriaOilCountry && (
            <div role="status" style={{ position: "absolute", right: 12, bottom: 12, width: "min(310px, calc(100% - 24px))", background: "rgba(7,11,16,0.96)", border: `1px solid ${getSyriaOilDirection(hoveredSyriaOilCountry).increase && !getSyriaOilDirection(hoveredSyriaOilCountry).decrease ? "#26885a" : "#9c3e3e"}`, borderRadius: 6, padding: "10px 12px", pointerEvents: "none", boxShadow: "0 6px 24px rgba(0,0,0,0.45)" }}>
              <div style={{ color: "#dde4ee", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{hoveredSyriaOilCountry.countryName}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "5px 10px", alignItems: "baseline", fontSize: 10, color: "#9aa6b5" }}>
                <span>Commodity</span><span>2010</span><span>2012 · change</span>
                <span>Crude oil (HS 2709)</span><span style={{ color: "#c5ced8" }}>{hoveredSyriaOilCountry.crudeBefore === null ? "No report" : formatCommodityExport(hoveredSyriaOilCountry.crudeBefore)}</span><span style={{ color: (getSyriaOilChange(hoveredSyriaOilCountry.crudeBefore, hoveredSyriaOilCountry.crudeAfter) ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{hoveredSyriaOilCountry.crudeAfter === null ? "No report" : formatCommodityExport(hoveredSyriaOilCountry.crudeAfter)} · {formatSyriaOilChange(getSyriaOilChange(hoveredSyriaOilCountry.crudeBefore, hoveredSyriaOilCountry.crudeAfter))}</span>
                <span>Petroleum products (HS 2710)</span><span style={{ color: "#c5ced8" }}>{hoveredSyriaOilCountry.petroleumBefore === null ? "No report" : formatCommodityExport(hoveredSyriaOilCountry.petroleumBefore)}</span><span style={{ color: (getSyriaOilChange(hoveredSyriaOilCountry.petroleumBefore, hoveredSyriaOilCountry.petroleumAfter) ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{hoveredSyriaOilCountry.petroleumAfter === null ? "No report" : formatCommodityExport(hoveredSyriaOilCountry.petroleumAfter)} · {formatSyriaOilChange(getSyriaOilChange(hoveredSyriaOilCountry.petroleumBefore, hoveredSyriaOilCountry.petroleumAfter))}</span>
              </div>
            </div>
          )}
          {isVenezuelaOilTrade && hoveredVenezuelaOilCountry && (
            <div role="status" style={{ position: "absolute", right: 12, bottom: 12, width: "min(310px, calc(100% - 24px))", background: "rgba(7,11,16,0.96)", border: `1px solid ${(getVenezuelaOilDirection(hoveredVenezuelaOilCountry) ?? 0) >= 0 ? "#26885a" : "#9c3e3e"}`, borderRadius: 6, padding: "10px 12px", pointerEvents: "none", boxShadow: "0 6px 24px rgba(0,0,0,0.45)" }}>
              <div style={{ color: "#dde4ee", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{hoveredVenezuelaOilCountry.countryName}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "5px 10px", alignItems: "baseline", fontSize: 10, color: "#9aa6b5" }}>
                <span>Commodity</span><span>2012</span><span>2014 · change</span>
                <span>Crude oil (HS 2709)</span><span style={{ color: "#c5ced8" }}>{hoveredVenezuelaOilCountry.crudeBefore === null ? "No report" : formatCommodityExport(hoveredVenezuelaOilCountry.crudeBefore)}</span><span style={{ color: (getSyriaOilChange(hoveredVenezuelaOilCountry.crudeBefore, hoveredVenezuelaOilCountry.crudeAfter) ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{hoveredVenezuelaOilCountry.crudeAfter === null ? "No report" : formatCommodityExport(hoveredVenezuelaOilCountry.crudeAfter)} · {formatSyriaOilChange(getSyriaOilChange(hoveredVenezuelaOilCountry.crudeBefore, hoveredVenezuelaOilCountry.crudeAfter))}</span>
                <span>Petroleum products (HS 2710)</span><span style={{ color: "#c5ced8" }}>{hoveredVenezuelaOilCountry.petroleumBefore === null ? "No report" : formatCommodityExport(hoveredVenezuelaOilCountry.petroleumBefore)}</span><span style={{ color: (getSyriaOilChange(hoveredVenezuelaOilCountry.petroleumBefore, hoveredVenezuelaOilCountry.petroleumAfter) ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{hoveredVenezuelaOilCountry.petroleumAfter === null ? "No report" : formatCommodityExport(hoveredVenezuelaOilCountry.petroleumAfter)} · {formatSyriaOilChange(getSyriaOilChange(hoveredVenezuelaOilCountry.petroleumBefore, hoveredVenezuelaOilCountry.petroleumAfter))}</span>
              </div>
            </div>
          )}
          {isSudanCommodityTrade && hoveredSudanCommodityCountry && (
            <div role="status" style={{ position: "absolute", right: 12, bottom: 12, width: "min(310px, calc(100% - 24px))", background: "rgba(7,11,16,0.96)", border: `1px solid ${(getSudanCommodityDirection(hoveredSudanCommodityCountry) ?? 0) >= 0 ? "#26885a" : "#9c3e3e"}`, borderRadius: 6, padding: "10px 12px", pointerEvents: "none", boxShadow: "0 6px 24px rgba(0,0,0,0.45)" }}>
              <div style={{ color: "#dde4ee", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{hoveredSudanCommodityCountry.countryName}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "5px 10px", alignItems: "baseline", fontSize: 10, color: "#9aa6b5" }}>
                <span>Commodity</span><span>2022</span><span>2024 · change</span>
                <span>Gold (HS 7108)</span><span style={{ color: "#c5ced8" }}>{formatCommodityExport(hoveredSudanCommodityCountry.goldBefore)}</span><span style={{ color: (getSyriaOilChange(hoveredSudanCommodityCountry.goldBefore, hoveredSudanCommodityCountry.goldAfter) ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{formatCommodityExport(hoveredSudanCommodityCountry.goldAfter)} · {formatSyriaOilChange(getSyriaOilChange(hoveredSudanCommodityCountry.goldBefore, hoveredSudanCommodityCountry.goldAfter))}</span>
                <span>Sesame seeds (HS 120740)</span><span style={{ color: "#c5ced8" }}>{formatCommodityExport(hoveredSudanCommodityCountry.sesameBefore)}</span><span style={{ color: (getSyriaOilChange(hoveredSudanCommodityCountry.sesameBefore, hoveredSudanCommodityCountry.sesameAfter) ?? 0) >= 0 ? "#70dc9d" : "#ed7777" }}>{formatCommodityExport(hoveredSudanCommodityCountry.sesameAfter)} · {formatSyriaOilChange(getSyriaOilChange(hoveredSudanCommodityCountry.sesameBefore, hoveredSudanCommodityCountry.sesameAfter))}</span>
              </div>
            </div>
          )}
        </div>

        {isUkraineGrainTrade && (
          <div style={{ marginTop: 12, color: "#7a8899", fontSize: 11, lineHeight: 1.7 }}>
            Countries are highlighted when the combined value of Ukrainian wheat and maize exports changes by at least 10% from 2021 to 2023. Map colors show the combined change; hover or focus a highlighted country for commodity-level values. Countries with no 2021 exports have no defined percentage and are not classified. Values are current US dollars. Hong Kong is present in the trade results but is not a separate polygon in the base map. Source: <a href="https://comtradeplus.un.org/en/trade-statistics?cmd=01#result" target="_blank" rel="noreferrer" style={{ color: "#aab6c5" }}>UN Comtrade Plus</a>, Ukraine exports, HS 1001 and 1005, annual partner trade.
          </div>
        )}
        {isSyriaOilTrade && (
          <div style={{ marginTop: 12, color: "#7a8899", fontSize: 11, lineHeight: 1.7 }}>
            Because Syria reports no exports for these years, values use each partner's mirror-reported imports from Syria. Countries are highlighted when the 2010-to-2012 change in either crude oil or petroleum products is at least 10%. Missing reports are not treated as zero; only countries with comparable reports for a product are tested. Bahrain meets the threshold but has no separate polygon in the base map. Values are current US dollars and can differ from Syria-reported FOB export values. Source: <a href="https://comtradeplus.un.org/en/trade-statistics?cmd=01#result" target="_blank" rel="noreferrer" style={{ color: "#aab6c5" }}>UN Comtrade Plus</a>, imports from Syria, HS 2709 and 2710.
          </div>
        )}
        {isVenezuelaOilTrade && (
          <div style={{ marginTop: 12, color: "#7a8899", fontSize: 11, lineHeight: 1.7 }}>
            Because Venezuela does not report comparable exports for all selected years, values use each partner's mirror-reported imports from Venezuela. The comparison is 2012 vs 2014; a country is highlighted when either HS 2709 crude oil or HS 2710 petroleum products changes by at least 10%. Missing reports are not treated as zero. Map color follows the larger absolute qualifying product change; hover for each product's values. Values are current US dollars, not Venezuela-reported FOB exports. Small territories without a separate base-map polygon cannot be highlighted. Source: <a href="https://comtradeplus.un.org/en/trade-statistics?cmd=01#result" target="_blank" rel="noreferrer" style={{ color: "#aab6c5" }}>UN Comtrade Plus</a>, mirror imports from Venezuela, HS 2709 and 2710.
          </div>
        )}
        {isSudanCommodityTrade && (
          <div style={{ marginTop: 12, color: "#7a8899", fontSize: 11, lineHeight: 1.7 }}>
            Because Sudan does not report comparable exports for these years, values use each partner's mirror-reported imports from Sudan. The comparison is 2022 vs 2024; a country is highlighted when HS 7108 gold or HS 120740 sesame seeds changes by at least 10%. Missing reports are not treated as zero. Map color follows the qualifying product with the largest absolute change; hover for each product's reported values. Values are current US dollars, not Sudan-reported FOB exports. Source: <a href="https://comtradeplus.un.org/en/trade-statistics?cmd=01#result" target="_blank" rel="noreferrer" style={{ color: "#aab6c5" }}>UN Comtrade Plus</a>, mirror imports from Sudan, HS 7108 and 120740.
          </div>
        )}

        <div style={{
          background: "#111922",
          border: "1px solid #1a2435",
          borderRadius: 10,
          padding: "24px 28px",
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: 24,
        }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontSize: 11, color: "#dfa92a", fontFamily: "JetBrains Mono, monospace", letterSpacing: 1, marginBottom: 8 }}>
              {ordinal(conflict.rank).toUpperCase()} LARGEST ECONOMIC LOSS
            </div>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 600, color: "#dde4ee" }}>
              {conflict.name}
              <span style={{ marginLeft: 12, fontSize: 14, color: "#7a8899", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {conflict.country}
              </span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#7a8899", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>GDP Drop</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, fontWeight: "bold", color: "#e04040" }}>
              {conflict.gdpDrop ?? "N/A"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#7a8899", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Total Loss</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, fontWeight: "bold", color: "#e07b42" }}>
              {conflict.economicLoss ?? "N/A"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#7a8899", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Period</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#b0b8c8" }}>{conflict.period}</div>
          </div>
          <div style={{ gridColumn: "1 / -1", borderTop: "1px solid #1a2435", paddingTop: 16 }}>
            <div style={{ fontSize: 11, color: "#7a8899", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Root Cause</div>
            <div style={{ fontSize: 14, color: "#b0b8c8", lineHeight: 1.6 }}>{conflict.cause}</div>
          </div>
        </div>

        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          {TRADE_SNAPSHOTS.map((snapshotKey: SnapshotKey) => {
            const snapshot = trade?.[snapshotKey];
            const total = snapshot?.exports !== null && snapshot?.imports !== null && snapshot
              ? snapshot.exports + snapshot.imports
              : null;
            const change = total !== null && previousTotal !== null && snapshotKey !== "before"
              ? ((total - previousTotal) / previousTotal) * 100
              : null;
            return (
              <div key={snapshotKey} style={{ background: "#111922", border: "1px solid #1a2435", borderRadius: 8, padding: "16px 18px" }}>
                <div style={{ fontSize: 11, color: "#dfa92a", fontFamily: "JetBrains Mono, monospace", letterSpacing: 1, marginBottom: 12 }}>
                  {SNAPSHOT_LABELS[snapshotKey]}
                </div>
                <div style={{ fontSize: 22, color: "#dde4ee", fontFamily: "JetBrains Mono, monospace", fontWeight: 600, marginBottom: 12 }}>
                  {snapshot?.year ?? "Year unavailable"}
                </div>
                <div style={{ display: "grid", gap: 7, fontSize: 12, color: "#7a8899" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>Exports</span><span style={{ color: "#b0b8c8" }}>{formatTradeValue(snapshot?.exports ?? null)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>Imports</span><span style={{ color: "#b0b8c8" }}>{formatTradeValue(snapshot?.imports ?? null)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, borderTop: "1px solid #1a2435", paddingTop: 7, marginTop: 2 }}><span>Total trade</span><span style={{ color: "#dde4ee", fontWeight: 600 }}>{formatTradeValue(total)}</span></div>
                  {change !== null && <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>Change vs. pre-conflict</span><span style={{ color: change < 0 ? "#ef7777" : "#6de5a8" }}>{change > 0 ? "+" : ""}{change.toFixed(1)}%</span></div>}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#7a8899", lineHeight: 1.7 }}>
          Source: World Bank merchandise exports and imports (current US$), indicators TX.VAL.MRCH.CD.WT and TM.VAL.MRCH.CD.WT. Route overlays show bilateral commodity trade from UN Comtrade annual HS records for the year before conflict onset and the first full year after it began. These are observed trade changes, not proof that the conflict caused them. “Latest available” uses the latest year with both World Bank series; missing values are shown as unavailable.
        </div>

        <div style={{ marginTop: 48, borderTop: "1px solid #263342", paddingTop: 32 }}>
          <div style={{ color: "#dfa92a", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>
            WORLD COMMODITY PRICE MOVEMENTS
          </div>
          <h3 style={{ margin: "0 0 8px", color: "#dde4ee", fontFamily: "Fraunces, serif", fontSize: 25, fontWeight: 600 }}>
            {isSyriaConflict ? "International crude oil prices and the Syria conflict" : hasReportBackedConflict ? "Price changes linked in the cited report" : "No report-linked commodity prices identified"}
          </h3>
          <p style={{ margin: "0 0 22px", color: "#9aa6b5", fontSize: 13, lineHeight: 1.7 }}>
            {isSyriaConflict
              ? "WESP 2014 identifies the Syrian conflict as part of the geopolitical tensions affecting oil markets. It reports significant international oil-price fluctuations in 2013 amid geopolitical issues; concern about supply disruptions in the region can put upward pressure on crude prices."
              : hasReportBackedConflict
              ? `${onsetYear - 1} to ${onsetYear}: ${commodityPriceMatches.length} source-supported commodity price series changed by at least 10% in absolute terms. The report links the Ukraine invasion to energy and food price spikes and names natural gas, coal, wheat, barley, seed oils, fertilizers, copper, and tin. Regional duplicates use an average series when available, otherwise one representative region; the ${onsetYear - 1}–${onsetYear} line segment is highlighted in green.`
              : `The cited report specifically links commodity price spikes to the 2022 Russian invasion of Ukraine. It does not identify product-level price changes linked to ${conflict.name}.`}
          </p>
          {commodityPriceMatches.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 12 }}>
              {commodityPriceMatches.map((series) => (
                <CommodityPriceChart key={series.name} {...series} highlightYear={onsetYear - 1} highlightNextYear={onsetYear} />
              ))}
            </div>
          ) : isSyriaConflict && crudeOilSince2010.length > 0 ? (
            <SyriaOilPriceContext prices={crudeOilSince2010} />
          ) : (
            <p style={{ color: "#7a8899", fontSize: 13 }}>{hasReportBackedConflict ? "No named commodity series with comparable data met the 10% threshold." : "No charts are shown because the cited resource does not support a specific commodity-price link for this conflict."}</p>
          )}
          <p style={{ margin: "18px 0 0", color: "#687789", fontSize: 11, lineHeight: 1.7 }}>
            Only products linked to the Ukraine invasion in the cited book are considered; no link is inferred for the other conflicts. Prices are nominal US dollars and are averaged by calendar year; 2026 is the January–October average (latest data available in the November 2026 release). Sources: <a href="https://thedocs.worldbank.org/en/doc/74e8be41ceb20fa0da750cda2f6b9e4e-0050012026/related/CMO-Historical-Data-Monthly.xlsx" target="_blank" rel="noreferrer" style={{ color: "#9aa6b5" }}>World Bank Pink Sheet</a>; <a href="https://thedocs.worldbank.org/en/doc/b4ff84b2d5dc4d0963a5074102460cc1-0350012022/original/Commodity-Markets.pdf" target="_blank" rel="noreferrer" style={{ color: "#9aa6b5" }}>Commodity Markets: Evolution, Challenges, and Policies (Chapter 4, p. 221)</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
