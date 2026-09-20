import { useState } from "react";
import WorldChoropleth, {
  stabilityColor, gdpColor, QUADRANT_COLORS, getQuadrant,
} from "./WorldChoropleth";
import { conflictsByDeaths, politicalStabilityData, gdpGrowthData, countryNames, unstableCountriesIndex } from "../data";

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

function MapLegend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 18, height: 10, background: item.color, borderRadius: 3 }} />
          <span style={{ fontSize: 12, color: "#7a8899", fontFamily: "JetBrains Mono, monospace" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

const STABILITY_LEGEND = [
  { color: "#7b1a1a", label: "< −2.0 (Very Unstable)" },
  { color: "#c0392b", label: "−2.0 to −1.5" },
  { color: "#c96033", label: "−1.0 to −0.5" },
  { color: "#4a5568", label: "~0 (Average)" },
  { color: "#1a6b5e", label: "0.5 to 1.0" },
  { color: "#0e6647", label: "> 1.5 (Very Stable)" },
  { color: "#1a2435", label: "No data" },
];

const GDP_LEGEND = [
  { color: "#7b1a1a", label: "< −15%" },
  { color: "#c0392b", label: "−15% to −5%" },
  { color: "#3a4a5e", label: "0% to 2%" },
  { color: "#1a4a8a", label: "2% to 5%" },
  { color: "#0f7ac8", label: "> 8%" },
];

const QUADRANT_LEGEND = [
  { color: "#0e6647", label: "Stable & Thriving (High Stability + High Growth)" },
  { color: "#8a6010", label: "Volatile & Growing (Low Stability + High Growth)" },
  { color: "#1a4a8a", label: "Stable & Stagnant (High Stability + Low Growth)" },
  { color: "#8a1a1a", label: "Crisis Zone (Low Stability + Low Growth)" },
];

const deathMarkers = conflictsByDeaths.map((c) => ({
  coordinates: [c.lon, c.lat] as [number, number],
  label: c.name,
  rank: c.rank,
}));

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

  const handleCountrySelect = (countryId: string | null) => {
    setHighlightedCountryId((prev) => (prev === countryId ? null : countryId));
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
          Hover any country to see its data.
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
            <MapLegend items={STABILITY_LEGEND} />
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
              highlightedCountryId={highlightedCountryId}
            />
            <MapLegend items={GDP_LEGEND} />
            <div style={{ marginTop: 10, fontSize: 12, color: "#4a5568", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, background: "#dfa92a", borderRadius: "50%" }} />
              Gold markers = top-10 conflict locations by battle deaths (hover the map countries for GDP data)
            </div>
          </div>
        )}

        {/* Map C: Quadrant Classification */}
        {activeTab === "C" && (
          <div>
            <div style={{ fontSize: 14, color: "#b0b8c8", marginBottom: 16, lineHeight: 1.7, maxWidth: 700 }}>
              <strong style={{ color: "#dde4ee" }}>Country Classification Matrix</strong> assigns every country to one of four quadrants based on political stability (WGI ≥ 0 = High) and GDP growth (≥ 2% = High). This reveals structural patterns: can a country be economically dynamic despite instability, and does stability guarantee growth?
            </div>
            <WorldChoropleth
              colorFn={(id) => {
                const s = politicalStabilityData[id];
                const g = gdpGrowthData[id];
                if (s === undefined && g === undefined) return "#1a2435";
                const q = getQuadrant(s, g);
                return QUADRANT_COLORS[q];
              }}
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
            <MapLegend items={QUADRANT_LEGEND} />
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
