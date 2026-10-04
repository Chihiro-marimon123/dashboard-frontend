import { useState } from "react";
import WorldChoropleth, {
  stabilityColor, gdpColor, QUADRANT_COLORS, getQuadrant,
} from "./WorldChoropleth";
import { conflictsByDeaths, conflictTradeRoutes, politicalStabilityData, gdpGrowthData, countryNames, unstableCountriesIndex } from "../data";

function summarizeDetail(detail: string) {
  const sentences = detail
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .join(" ")
    .trim();

  return sentences || detail.trim();
}

interface MapLegendItem {
  key: string;
  color: string;
  label: string;
  matches: (countryId: string) => boolean;
}

function MapLegend({ items, selectedKey, onSelect }: {
  items: MapLegendItem[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
      {items.map((item) => {
        const selected = selectedKey === item.key;
        return (
          <button
            key={item.key}
            className="map-legend-option"
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(item.key)}
            style={{ display: "flex", alignItems: "center", gap: 8, border: "none", padding: 0, background: "transparent", cursor: "pointer", opacity: selectedKey && !selected ? 0.45 : 1 }}
          >
            <span style={{ width: 18, height: 10, background: item.color, borderRadius: 3, flexShrink: 0 }} />
            <span className="map-legend-label" style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", textAlign: "left" }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const STABILITY_LEGEND = [
  { key: "very-unstable", color: "#7b1a1a", label: "< −2.0 — Very unstable", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] < -2 },
  { key: "unstable", color: "#d94d2b", label: "−2.0 to −1.5 — Unstable", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] >= -2 && politicalStabilityData[id] < -1.5 },
  { key: "low", color: "#e9a13b", label: "−1.5 to −1.0 — Low", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] >= -1.5 && politicalStabilityData[id] < -1 },
  { key: "moderate", color: "#e8d76d", label: "−1.0 to −0.5 — Moderate", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] >= -1 && politicalStabilityData[id] < -0.5 },
  { key: "borderline", color: "#a8d76b", label: "−0.5 to 0.0 — Borderline", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] >= -0.5 && politicalStabilityData[id] < 0 },
  { key: "stable", color: "#5ebd7a", label: "0.0 to 0.5 — Stable", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] >= 0 && politicalStabilityData[id] < 0.5 },
  { key: "strong", color: "#2b9b5d", label: "0.5 to 1.5 — Strong", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] >= 0.5 && politicalStabilityData[id] < 1.5 },
  { key: "very-strong", color: "#0e6647", label: "> 1.5 — Very strong", matches: (id: string) => politicalStabilityData[id] !== undefined && politicalStabilityData[id] >= 1.5 },
  { key: "no-data", color: "#1a2435", label: "No data", matches: (id: string) => politicalStabilityData[id] === undefined },
];

const GDP_LEGEND = [
  { key: "very-low", color: "#7b1a1a", label: "< −15% — Very low", matches: (id: string) => gdpGrowthData[id] !== undefined && gdpGrowthData[id] < -15 },
  { key: "low", color: "#d94d2b", label: "−15% to −5% — Low", matches: (id: string) => gdpGrowthData[id] !== undefined && gdpGrowthData[id] >= -15 && gdpGrowthData[id] < -5 },
  { key: "weak", color: "#f0a34a", label: "−5% to 0% — Weak", matches: (id: string) => gdpGrowthData[id] !== undefined && gdpGrowthData[id] >= -5 && gdpGrowthData[id] < 0 },
  { key: "moderate", color: "#e9d66a", label: "0% to 2% — Moderate", matches: (id: string) => gdpGrowthData[id] !== undefined && gdpGrowthData[id] >= 0 && gdpGrowthData[id] < 2 },
  { key: "healthy", color: "#a9d9b2", label: "2% to 5% — Healthy", matches: (id: string) => gdpGrowthData[id] !== undefined && gdpGrowthData[id] >= 2 && gdpGrowthData[id] < 5 },
  { key: "strong", color: "#7ec8d8", label: "5% to 8% — Strong", matches: (id: string) => gdpGrowthData[id] !== undefined && gdpGrowthData[id] >= 5 && gdpGrowthData[id] < 8 },
  { key: "very-strong", color: "#1d4f9b", label: "> 8% — Very strong", matches: (id: string) => gdpGrowthData[id] !== undefined && gdpGrowthData[id] >= 8 },
  { key: "no-data", color: "#1a2435", label: "No data", matches: (id: string) => gdpGrowthData[id] === undefined },
];

const QUADRANT_LEGEND = [
  { key: "stable-thriving", color: "#0e6647", label: "Stable & thriving — strong stability, strong growth", matches: (id: string) => (politicalStabilityData[id] !== undefined || gdpGrowthData[id] !== undefined) && getQuadrant(politicalStabilityData[id], gdpGrowthData[id]) === "stable-thriving" },
  { key: "volatile-growing", color: "#8a6010", label: "Volatile & growing — low stability, strong growth", matches: (id: string) => (politicalStabilityData[id] !== undefined || gdpGrowthData[id] !== undefined) && getQuadrant(politicalStabilityData[id], gdpGrowthData[id]) === "volatile-growing" },
  { key: "stable-stagnant", color: "#1a4a8a", label: "Stable & stagnant — strong stability, low growth", matches: (id: string) => (politicalStabilityData[id] !== undefined || gdpGrowthData[id] !== undefined) && getQuadrant(politicalStabilityData[id], gdpGrowthData[id]) === "stable-stagnant" },
  { key: "crisis", color: "#8a1a1a", label: "Crisis zone — low stability, low growth", matches: (id: string) => (politicalStabilityData[id] !== undefined || gdpGrowthData[id] !== undefined) && getQuadrant(politicalStabilityData[id], gdpGrowthData[id]) === "crisis" },
  { key: "no-data", color: "#1a2435", label: "No data", matches: (id: string) => politicalStabilityData[id] === undefined && gdpGrowthData[id] === undefined },
];

const deathMarkers = conflictsByDeaths.map((c) => ({
  coordinates: [c.lon, c.lat] as [number, number],
  label: c.name,
  rank: c.rank,
}));

const nonUkraineTradeRoutes = conflictTradeRoutes.filter((route) => route.rank !== 1);

function formatRouteTradeValue(value: number) {
  return value >= 1_000_000_000 ? `$${(value / 1_000_000_000).toFixed(2)}B` : `$${(value / 1_000_000).toFixed(1)}M`;
}

function getCountryIdByName(countryName: string) {
  return Object.entries(countryNames).find(([, name]) => name === countryName)?.[0] ?? null;
}

function InstabilityIndex({ highlightedCountryId, onSelectCountry }: {
  highlightedCountryId: string | null;
  onSelectCountry: (countryId: string | null) => void;
}) {
  return (
    <div style={{ marginTop: 48, borderTop: "1px solid #1a2435", paddingTop: 36 }}>
      <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 600, color: "#dde4ee", marginBottom: 8 }}>
        Instability Index
      </h3>
      <p style={{ fontSize: 13, color: "#7a8899", marginBottom: 28, maxWidth: 640, lineHeight: 1.7 }}>
        Countries with the lowest WGI Political Stability scores. Each entry below includes a concise summary of the conflict, governance crisis, and broader context behind the rating.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {unstableCountriesIndex.map((entry, i) => {
          const accent = stabilityColor(entry.score);
          const summary = summarizeDetail(entry.detail);

          return (
            <div
              key={entry.country}
              style={{
                borderTop: i === 0 ? "1px solid #1a2435" : "none",
                borderBottom: "1px solid #1a2435",
                borderLeft: `3px solid ${accent}`,
                background: "transparent",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 20px",
                gap: 16,
              }}>
                <div style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#4a5568",
                  minWidth: 24,
                  textAlign: "right",
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 22, lineHeight: 1, minWidth: 30 }}>{entry.flag}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <button
                    type="button"
                    onClick={() => onSelectCountry(getCountryIdByName(entry.country) ?? null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      font: "inherit",
                      textAlign: "left",
                      color: highlightedCountryId === getCountryIdByName(entry.country) ? "#f6d365" : "#dde4ee",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {entry.country}
                  </button>
                  <span style={{
                    display: "inline-block",
                    marginLeft: 10,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    color: accent,
                    background: `${accent}18`,
                    padding: "1px 7px",
                    borderRadius: 4,
                  }}>
                    {entry.score.toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{
                padding: "0 20px 20px 73px",
              }}>
                <div style={{
                  fontSize: 13,
                  color: "#b0b8c8",
                  lineHeight: 1.85,
                  borderTop: "1px solid #1a2435",
                  paddingTop: 18,
                }}>
                  {summary}
                </div>
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    fontSize: 11,
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#4a5568",
                  }}>
                    WGI Political Stability 2023: {entry.score.toFixed(2)} (global range: -2.85 to +2.0)
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: "#4a5568" }}>
        Source: World Bank WGI 2023 release. Scores represent governance estimates; lower scores indicate higher perceived risk of political violence, terrorism, or unconstitutional regime change.
      </div>
    </div>
  );
}

export default function StabilitySection() {
  const [activeTab, setActiveTab] = useState<"A" | "B" | "C">("A");
  const [highlightedCountryId, setHighlightedCountryId] = useState<string | null>(null);
  const [selectedLegendByMap, setSelectedLegendByMap] = useState<Record<"A" | "B" | "C", string | null>>({ A: null, B: null, C: null });

  const handleCountrySelect = (countryId: string | null) => {
    setHighlightedCountryId((prev) => (prev === countryId ? null : countryId));
  };

  const handleLegendSelect = (map: "A" | "B" | "C", key: string) => {
    setSelectedLegendByMap((prev) => ({ ...prev, [map]: prev[map] === key ? null : key }));
  };

  const tabs = [
    { key: "A" as const, label: "Map A · Political Stability" },
    { key: "B" as const, label: "Map B · GDP Growth" },
    { key: "C" as const, label: "Map C · Country Classification" },
  ];

  return (
    <section id="stability" style={{ background: "rgb(28, 48, 73)", padding: "80px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          SECTION 03
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 42, fontWeight: 700, color: "#dde4ee", lineHeight: 1.15, marginBottom: 12 }}>
          Is the country
          <span style={{ color: "#dfa92a" }}> stable?</span>
        </h2>
        <p style={{ fontSize: 15, color: "#7a8899", maxWidth: 640, lineHeight: 1.7, marginBottom: 36 }}>
          Three lenses on global stability: political governance, economic growth, and a combined classification showing which states are thriving, struggling, or in crisis.
          Hover over any country to view its data.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1a2435", marginBottom: 24 }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "10px 22px",
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                background: "transparent",
                color: activeTab === t.key ? "#dfa92a" : "#7a8899",
                borderBottom: activeTab === t.key ? "2px solid #dfa92a" : "2px solid transparent",
                marginBottom: -1,
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Map A: Political Stability */}
        {activeTab === "A" && (
          <div>
            <div style={{ fontSize: 14, color: "#b0b8c8", marginBottom: 16, lineHeight: 1.7, maxWidth: 700 }}>
              <strong style={{ color: "#dde4ee" }}>WGI Political Stability Estimate (2023)</strong> measures the likelihood that a government will be destabilized by unconstitutional or violent means. Positive scores indicate greater stability; negative scores indicate elevated risk of political violence, terrorism, or government overthrow.
            </div>
            <WorldChoropleth
              colorFn={(id) => stabilityColor(politicalStabilityData[id])}
              countryFilter={STABILITY_LEGEND.find((item) => item.key === selectedLegendByMap.A)?.matches}
              tooltipFn={(id) => {
                const name = countryNames[id];
                const v = politicalStabilityData[id];
                if (!name) return null;
                return {
                  name,
                  value: v !== undefined ? `WGI Score: ${v > 0 ? "+" : ""}${v.toFixed(2)}` : "No data",
                };
              }}
              highlightedCountryId={highlightedCountryId}
            />
            <MapLegend items={STABILITY_LEGEND} selectedKey={selectedLegendByMap.A} onSelect={(key) => handleLegendSelect("A", key)} />
          </div>
        )}

        {/* Map B: GDP Growth + Conflict Markers */}
        {activeTab === "B" && (
          <div>
            <div style={{ fontSize: 14, color: "#b0b8c8", marginBottom: 16, lineHeight: 1.7, maxWidth: 700 }}>
              <strong style={{ color: "#dde4ee" }}>Annual GDP Growth Rate 2024 (World Bank)</strong> illustrates economic performance against the backdrop of active conflicts. Gold markers indicate the top 10 highest-death conflicts. Note the severe contraction in Ukraine (-29.1% in 2022) and Sudan (-20.3% in 2024) and persistent stagnation in conflict-affected states.
            </div>
            <WorldChoropleth
              colorFn={(id) => gdpColor(gdpGrowthData[id])}
              countryFilter={GDP_LEGEND.find((item) => item.key === selectedLegendByMap.B)?.matches}
              tooltipFn={(id) => {
                const name = countryNames[id];
                const v = gdpGrowthData[id];
                if (!name) return null;
                return {
                  name,
                  value: v !== undefined ? `GDP Growth 2024: ${v > 0 ? "+" : ""}${v.toFixed(1)}%` : "No data",
                };
              }}
              markers={deathMarkers}
              tradeRoutes={nonUkraineTradeRoutes}
              highlightedCountryId={highlightedCountryId}
            />
            <MapLegend items={GDP_LEGEND} selectedKey={selectedLegendByMap.B} onSelect={(key) => handleLegendSelect("B", key)} />
            <div style={{ marginTop: 20, borderTop: "1px solid #1a2435", paddingTop: 16 }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dde4ee", letterSpacing: 1, marginBottom: 10 }}>
                VERIFIED BILATERAL TRADE CHANGES · NON-UKRAINE CONFLICTS
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {nonUkraineTradeRoutes.map((route) => {
                  const change = ((route.afterValueUsd - route.beforeValueUsd) / route.beforeValueUsd) * 100;
                  const color = change >= 0 ? "#22c55e" : "#ef4444";
                  return (
                    <div key={`${route.rank}-${route.hsCode}-${route.origin}-${route.destination}`} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) auto", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #1a2435", fontSize: 12 }}>
                      <span style={{ color: "#dde4ee" }}>{route.origin} → {route.destination}</span>
                      <span style={{ color: "#7a8899" }}>{route.commodity} (HS {route.hsCode})</span>
                      <span style={{ color, fontFamily: "JetBrains Mono, monospace", textAlign: "right" }}>{change > 0 ? "+" : ""}{change.toFixed(1)}%</span>
                      <span style={{ gridColumn: "1 / -1", color: "#4a5568" }}>
                        {route.beforeYear} {formatRouteTradeValue(route.beforeValueUsd)} → {route.afterYear} {formatRouteTradeValue(route.afterValueUsd)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: "#4a5568" }}>
                Green routes increased; red routes decreased. Values are reported bilateral trade values, not proof that conflict caused the change.
              </div>
            </div>
            <div style={{ marginTop: 20, padding: "18px 20px", background: "#111922", border: "1px solid #1a2435", borderLeft: "3px solid #dfa92a", borderRadius: 8 }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 1, marginBottom: 8 }}>
                UKRAINE · GDP GROWTH CONTEXT
              </div>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: "#b0b8c8", lineHeight: 1.7 }}>
                Russia launched its full-scale invasion of Ukraine in February 2022. The sharp contraction that year was followed by a partial rebound, but positive growth does not mean the war has ended.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10 }}>
                {[
                  { label: "Pre-war avg. (2019–21)", value: "+0.9%" },
                  { label: "2022", value: "−28.8%" },
                  { label: "2023", value: "+5.5%" },
                  { label: "2024", value: "+2.9%" },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "10px 12px", background: "rgba(255,255,255,0.025)", borderRadius: 6 }}>
                    <div style={{ fontSize: 11, color: "#7a8899", marginBottom: 5 }}>{item.label}</div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 16, fontWeight: 600, color: item.value.startsWith("−") ? "#ef7777" : "#dde4ee" }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: "#4a5568" }}>
                Source: World Bank GDP growth (annual %), indicator NY.GDP.MKTP.KD.ZG. Pre-war figure is the 2019–2021 arithmetic mean.
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#4a5568", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, background: "#dfa92a", borderRadius: "50%" }} />
              Gold markers = top-10 conflict locations by battle deaths (hover over the map countries for GDP data)
            </div>
          </div>
        )}

        {/* Map C: Quadrant Classification */}
        {activeTab === "C" && (
          <div>
            <div style={{ fontSize: 14, color: "#b0b8c8", marginBottom: 16, lineHeight: 1.7, maxWidth: 700 }}>
              <strong style={{ color: "#dde4ee" }}>Country Classification Matrix</strong> groups countries by stability and growth. High stability is defined as WGI ≥ 0, and high growth as GDP growth ≥ 2%. This makes it easier to see which countries are strong, fragile, or under pressure.
            </div>
            <WorldChoropleth
              colorFn={(id) => {
                const s = politicalStabilityData[id];
                const g = gdpGrowthData[id];
                if (s === undefined && g === undefined) return "#1a2435";
                const q = getQuadrant(s, g);
                return QUADRANT_COLORS[q];
              }}
              countryFilter={QUADRANT_LEGEND.find((item) => item.key === selectedLegendByMap.C)?.matches}
              tooltipFn={(id) => {
                const name = countryNames[id];
                if (!name) return null;
                const s = politicalStabilityData[id];
                const g = gdpGrowthData[id];
                const q = getQuadrant(s, g);
                const labels: Record<string, string> = {
                  "stable-thriving": "Stable & Thriving",
                  "volatile-growing": "Volatile & Growing",
                  "stable-stagnant": "Stable & Stagnant",
                  "crisis": "Crisis Zone",
                };
                return { name, value: labels[q] ?? "Unknown" };
              }}
              highlightedCountryId={highlightedCountryId}
            />
            <MapLegend items={QUADRANT_LEGEND} selectedKey={selectedLegendByMap.C} onSelect={(key) => handleLegendSelect("C", key)} />
            <div style={{ marginTop: 14, fontSize: 12, color: "#4a5568" }}>
              Thresholds: Stability ≥ 0 = High (WGI 2023); GDP Growth ≥ 2% = High (approx. global mean 2024).
              Data: World Bank WGI 2023; World Bank National Accounts 2024.
            </div>
          </div>
        )}

        {/* Unstable countries index */}
        <InstabilityIndex highlightedCountryId={highlightedCountryId} onSelectCountry={handleCountrySelect} />
      </div>
    </section>
  );
}
