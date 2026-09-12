import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoNaturalEarth1 } from "d3-geo";
import { conflictsByEconomicLoss, tradeFlows, ordinal, type TradeFlow } from "../data";
import { GEO_URL, MAP_WIDTH, MAP_HEIGHT, gdpColor } from "./WorldChoropleth";

const projection = geoNaturalEarth1()
  .scale(155)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

function project([lon, lat]: [number, number]): [number, number] {
  const p = projection([lon, lat]);
  return p ? [p[0], p[1]] : [0, 0];
}

function curvedPath(from: [number, number], to: [number, number]): string {
  const [x1, y1] = project(from);
  const [x2, y2] = project(to);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ox = -dy / dist;
  const oy = dx / dist;
  const bend = Math.min(dist * 0.18, 50);
  const mx = (x1 + x2) / 2 + ox * bend;
  const my = (y1 + y2) / 2 + oy * bend;
  return `M ${x1.toFixed(1)},${y1.toFixed(1)} Q ${mx.toFixed(1)},${my.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

function FlowArrow({ flow, year, maxVol }: { flow: TradeFlow; year: 2023 | 2024; maxVol: number }) {
  const vol = year === 2023 ? flow.volume2023 : flow.volume2024;
  const width = (vol / maxVol) * 7 + 1;
  const changed = flow.volume2024 < flow.volume2023;
  const increased = flow.volume2024 > flow.volume2023;
  const actualColor = year === 2024 && changed ? "#ef4444" : year === 2024 && increased ? "#22c55e" : flow.color;
  const d = curvedPath(flow.fromCoords, flow.toCoords);
  const [x2, y2] = project(flow.toCoords);
  const [xm, ym] = project([
    (flow.fromCoords[0] + flow.toCoords[0]) / 2,
    (flow.fromCoords[1] + flow.toCoords[1]) / 2,
  ]);
  const angle = Math.atan2(y2 - ym, x2 - xm) * (180 / Math.PI);

  return (
    <g>
      <path d={d} fill="none" stroke={actualColor} strokeWidth={width} strokeOpacity={0.7} strokeLinecap="round" />
      <polygon
        points={`0,${-width * 0.7} ${width * 1.2},0 0,${width * 0.7}`}
        fill={actualColor}
        fillOpacity={0.9}
        transform={`translate(${x2.toFixed(1)},${y2.toFixed(1)}) rotate(${angle.toFixed(1)})`}
      />
    </g>
  );
}

const COMMODITY_COLORS: Record<string, string> = {
  Wheat: "#dfa92a",
  Grain: "#22c55e",
  "Natural Gas": "#4488ff",
  "Crude Oil": "#e879f9",
};

export default function TradeSection() {
  const [year, setYear] = useState<2023 | 2024>(2023);
  const [selectedConflict, setSelectedConflict] = useState(0);
  const [tooltip, setTooltip] = useState<{ flow: TradeFlow; x: number; y: number } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setYear((y) => (y === 2023 ? 2024 : 2023));
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const activeFlows = tradeFlows.filter((f) => f.conflictRank <= 4);
  const maxVol = Math.max(...activeFlows.map((f) => Math.max(f.volume2023, f.volume2024)));

  const conflict = conflictsByEconomicLoss[selectedConflict];

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

        {/* Conflict selector */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          {conflictsByEconomicLoss.map((c, i) => (
            <button
              key={c.rank}
              onClick={() => setSelectedConflict(i)}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: `1px solid ${i === selectedConflict ? "#dfa92a" : "#1a2435"}`,
                background: i === selectedConflict ? "#1a160a" : "transparent",
                cursor: "pointer",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                color: i === selectedConflict ? "#dfa92a" : "#7a8899",
                transition: "all 0.2s",
              }}
            >
              <span style={{ opacity: 0.6 }}>{ordinal(c.rank)} · </span>
              {c.country}
            </button>
          ))}
        </div>

        {/* Conflict spotlight */}
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

        {/* Map header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dde4ee" }}>
              Global Trade Flow: Russia-Ukraine War Impact (2023 vs 2024)
            </div>
            <div style={{ fontSize: 12, color: "#7a8899", marginTop: 4 }}>
              Showing top-4 conflict trade disruptions · auto-switching every 5 seconds · data: 2023 vs 2024
            </div>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{ fontSize: 12, color: "#7a8899" }}>Viewing year:</span>
            {[2023, 2024].map((y) => (
              <button
                key={y}
                onClick={() => {
                  setYear(y as 2023 | 2024);
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => setYear((prev) => (prev === 2023 ? 2024 : 2023)), 5000);
                }}
                style={{
                  padding: "6px 18px",
                  borderRadius: 6,
                  border: `1px solid ${year === y ? "#dfa92a" : "#1a2435"}`,
                  background: year === y ? "#1a160a" : "transparent",
                  color: year === y ? "#dfa92a" : "#7a8899",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 14,
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Trade flow map */}
        <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid #1a2435" }}>
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 155 }}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            style={{ width: "100%", height: "auto", display: "block", background: "#070b10" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#141e2e"
                    stroke="#0c1420"
                    strokeWidth={0.4}
                    style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                  />
                ))
              }
            </Geographies>

            {activeFlows.map((flow) => (
              <FlowArrow key={flow.id} flow={flow} year={year} maxVol={maxVol} />
            ))}

            {/* Source markers */}
            {[
              { coords: [37.6, 55.8] as [number, number], label: "Russia", color: "#e04040" },
              { coords: [30.5, 50.5] as [number, number], label: "Ukraine", color: "#4488ff" },
              { coords: [17.2, 26.3] as [number, number], label: "Libya", color: "#fb923c" },
              { coords: [-66.6, 6.4] as [number, number], label: "Venezuela", color: "#fb923c" },
            ].map((s) => (
              <Marker key={s.label} coordinates={s.coords}>
                <circle r={5} fill={s.color} stroke="#070b10" strokeWidth={1.5} />
                <text y={-10} textAnchor="middle" style={{ fontSize: 7, fill: s.color, fontFamily: "JetBrains Mono, monospace", fontWeight: "bold" }}>
                  {s.label}
                </text>
              </Marker>
            ))}
          </ComposableMap>

          {/* Year label overlay */}
          <div style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: "bold",
            fontSize: 42,
            color: "#dfa92a",
            opacity: 0.15,
            pointerEvents: "none",
            userSelect: "none",
          }}>
            {year}
          </div>

          {/* Legend */}
          <div style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            background: "rgba(7,11,16,0.85)",
            border: "1px solid #1a2435",
            borderRadius: 6,
            padding: "10px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            {Object.entries(COMMODITY_COLORS).map(([c, col]) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 3, background: col, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#b0b8c8", fontFamily: "JetBrains Mono, monospace" }}>{c}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #1a2435", paddingTop: 6, marginTop: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 3, background: "#ef4444", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#7a8899", fontFamily: "JetBrains Mono, monospace" }}>Decreased 2024</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <div style={{ width: 24, height: 3, background: "#22c55e", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#7a8899", fontFamily: "JetBrains Mono, monospace" }}>Increased 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flow table */}
        <div style={{ marginTop: 24, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1a2435" }}>
                {["Flow", "Commodity", "2023", "2024", "Change"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#7a8899", fontWeight: 500, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 1 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeFlows.map((f) => {
                const pct = ((f.volume2024 - f.volume2023) / f.volume2023 * 100).toFixed(1);
                const up = f.volume2024 > f.volume2023;
                return (
                  <tr key={f.id} style={{ borderBottom: "1px solid #0f1824" }}>
                    <td style={{ padding: "10px 12px", color: "#dde4ee" }}>
                      {f.fromLabel} → {f.toLabel}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ color: COMMODITY_COLORS[f.commodity] ?? "#7a8899", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
                        {f.commodity}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", fontFamily: "JetBrains Mono, monospace", color: "#b0b8c8" }}>
                      {f.volume2023} {f.unit}
                    </td>
                    <td style={{ padding: "10px 12px", fontFamily: "JetBrains Mono, monospace", color: up ? "#22c55e" : "#ef4444" }}>
                      {f.volume2024} {f.unit}
                    </td>
                    <td style={{ padding: "10px 12px", fontFamily: "JetBrains Mono, monospace", color: up ? "#22c55e" : "#ef4444", fontWeight: "bold" }}>
                      {up ? "+" : ""}{pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#4a5568" }}>
          Sources: UCDP Dyadic Conflict Dataset v26.1; UN Comtrade; IEA Energy Statistics; USDA WASDE Report 2023.
          Line thickness proportional to trade volume.
        </div>
      </div>
    </section>
  );
}
