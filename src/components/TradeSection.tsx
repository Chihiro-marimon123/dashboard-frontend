import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoNaturalEarth1 } from "d3-geo";
import { conflictsByEconomicLoss, conflictTradeData, conflictTradeRoutes, ordinal, type ConflictTradeRoute } from "../data";
import { GEO_URL, MAP_WIDTH, MAP_HEIGHT } from "./WorldChoropleth";

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

function getRouteGeometry(route: ConflictTradeRoute) {
  const start = routeProjection(route.originCoords);
  const end = routeProjection(route.destinationCoords);
  if (!start || !end) return null;

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const distance = Math.hypot(dx, dy);
  const bend = Math.min(distance * 0.18, 34);
  const controlX = (start[0] + end[0]) / 2 - (dy / distance) * bend;
  const controlY = (start[1] + end[1]) / 2 + (dx / distance) * bend;
  const angle = Math.atan2(end[1] - controlY, end[0] - controlX);
  const arrowSize = 7;
  const arrow = [
    `${end[0]},${end[1]}`,
    `${end[0] - arrowSize * Math.cos(angle - Math.PI / 6)},${end[1] - arrowSize * Math.sin(angle - Math.PI / 6)}`,
    `${end[0] - arrowSize * Math.cos(angle + Math.PI / 6)},${end[1] - arrowSize * Math.sin(angle + Math.PI / 6)}`,
  ].join(" ");

  return {
    path: `M ${start[0]},${start[1]} Q ${controlX},${controlY} ${end[0]},${end[1]}`,
    arrow,
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

export default function TradeSection() {
  const [selectedConflict, setSelectedConflict] = useState(0);
  const conflict = conflictsByEconomicLoss[selectedConflict];
  const trade = conflictTradeData.find((entry) => entry.rank === conflict.rank);
  const tradeRoute = conflictTradeRoutes.find((route) => route.rank === conflict.rank);
  const routeGeometry = tradeRoute ? getRouteGeometry(tradeRoute) : null;
  const previousTotal = trade?.before.exports !== null && trade?.before.imports !== null
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
              onClick={() => setSelectedConflict(index)}
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

        <div style={{
          background: "#111922",
          border: "1px solid #1a2435",
          borderRadius: 10,
          padding: "24px 28px",
          marginBottom: 32,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
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
                const isSelected = String(geo.id) === trade?.countryId;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isSelected ? "#dfa92a" : "#141e2e"}
                    stroke={isSelected ? "#fff0b3" : "#0c1420"}
                    strokeWidth={isSelected ? 1 : 0.4}
                    style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                  />
                );
              })}
            </Geographies>
            {routeGeometry && tradeRoute && (
              <g>
                <path d={routeGeometry.path} fill="none" stroke="#f0c75e" strokeWidth={3} strokeOpacity={0.95} strokeLinecap="round" />
                <polygon points={routeGeometry.arrow} fill="#f0c75e" />
              </g>
            )}
            <Marker coordinates={[conflict.lon, conflict.lat]}>
              <circle r={6} fill="#fff0b3" stroke="#070b10" strokeWidth={1.5} />
            </Marker>
            {tradeRoute && (
              <>
                <Marker coordinates={tradeRoute.originCoords}>
                  <circle r={5} fill="#f0c75e" stroke="#070b10" strokeWidth={1.5} />
                  <text y={-9} textAnchor="middle" style={{ fontSize: 8, fill: "#fff0b3", fontFamily: "JetBrains Mono, monospace", fontWeight: "bold" }}>{tradeRoute.origin}</text>
                </Marker>
                <Marker coordinates={tradeRoute.destinationCoords}>
                  <circle r={5} fill="#f0c75e" stroke="#070b10" strokeWidth={1.5} />
                  <text y={-9} textAnchor="middle" style={{ fontSize: 8, fill: "#fff0b3", fontFamily: "JetBrains Mono, monospace", fontWeight: "bold" }}>{tradeRoute.destination}</text>
                </Marker>
              </>
            )}
          </ComposableMap>
          <div style={{ position: "absolute", left: 16, top: 16, display: "flex", alignItems: "center", gap: 8, background: "rgba(7,11,16,0.88)", border: "1px solid #1a2435", borderRadius: 6, padding: "8px 12px" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#dfa92a" }} />
            <span style={{ fontSize: 12, color: "#dde4ee" }}>{conflict.country}</span>
          </div>
          {tradeRoute && (
            <div style={{ position: "absolute", right: 16, top: 16, maxWidth: "min(360px, 58%)", background: "rgba(7,11,16,0.9)", border: "1px solid #76612e", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ color: "#f0c75e", fontSize: 11, fontFamily: "JetBrains Mono, monospace", marginBottom: 5 }}>{tradeRoute.commodity}</div>
              <div style={{ color: "#dde4ee", fontSize: 12 }}>{tradeRoute.origin} → {tradeRoute.destination}</div>
              <div style={{ color: "#b0b8c8", fontSize: 11, marginTop: 5 }}>
                {tradeRoute.beforeYear} {formatRouteValue(tradeRoute.beforeValueUsd)} → {tradeRoute.afterYear} {formatRouteValue(tradeRoute.afterValueUsd)}
              </div>
            </div>
          )}
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
      </div>
    </section>
  );
}
