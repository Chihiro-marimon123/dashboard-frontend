import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

export const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 400;

export interface MapMarker {
  coordinates: [number, number];
  label: string;
  rank: number;
}

interface TooltipContent {
  name: string;
  value: string;
}

interface WorldChoroplethProps {
  colorFn: (id: string) => string;
  tooltipFn: (id: string) => TooltipContent | null;
  markers?: MapMarker[];
  children?: React.ReactNode;
}

export default function WorldChoropleth({ colorFn, tooltipFn, markers, children }: WorldChoroplethProps) {
  const [tooltip, setTooltip] = useState<{ content: TooltipContent; x: number; y: number } | null>(null);

  return (
    <div className="relative" style={{ background: "#070b10", borderRadius: 8, overflow: "hidden" }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155 }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const id = String(geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorFn(id)}
                  stroke="#0c1420"
                  strokeWidth={0.4}
                  onMouseEnter={(evt: React.MouseEvent) => {
                    const info = tooltipFn(id);
                    if (info) setTooltip({ content: info, x: evt.clientX, y: evt.clientY });
                  }}
                  onMouseMove={(evt: React.MouseEvent) => {
                    setTooltip((prev) => prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null);
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", opacity: 0.75 },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
        {markers?.map((m) => (
          <Marker key={`${m.rank}-${m.label}`} coordinates={m.coordinates}>
            <circle r={6} fill="#dfa92a" stroke="#070b10" strokeWidth={1.5} />
            <circle r={10} fill="transparent" stroke="#dfa92a" strokeWidth={1} strokeOpacity={0.4} />
            <text
              textAnchor="middle"
              y={-14}
              style={{ fontSize: 7, fill: "#dfa92a", fontFamily: "JetBrains Mono, monospace", fontWeight: "bold" }}
            >
              #{m.rank}
            </text>
          </Marker>
        ))}
        {children}
      </ComposableMap>

      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x + 16,
            top: tooltip.y - 12,
            background: "#111922",
            border: "1px solid #1a2435",
            borderRadius: 6,
            padding: "8px 14px",
            maxWidth: 260,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 13, color: "#dde4ee", marginBottom: 3 }}>
            {tooltip.content.name}
          </div>
          <div style={{ fontSize: 12, color: "#dfa92a", fontFamily: "JetBrains Mono, monospace" }}>
            {tooltip.content.value}
          </div>
        </div>
      )}
    </div>
  );
}

// Color helpers
export function stabilityColor(v: number | undefined): string {
  if (v === undefined) return "#1a2435";
  if (v < -2) return "#7b1a1a";
  if (v < -1.5) return "#a82020";
  if (v < -1) return "#c0392b";
  if (v < -0.5) return "#c96033";
  if (v < 0) return "#b07a3a";
  if (v < 0.5) return "#4a5568";
  if (v < 1) return "#1a6b5e";
  if (v < 1.5) return "#147a5a";
  return "#0e6647";
}

export function gdpColor(v: number | undefined): string {
  if (v === undefined) return "#1a2435";
  if (v < -15) return "#7b1a1a";
  if (v < -5) return "#c0392b";
  if (v < 0) return "#b06030";
  if (v < 2) return "#3a4a5e";
  if (v < 5) return "#1a4a8a";
  if (v < 8) return "#1562a6";
  return "#0f7ac8";
}

export const QUADRANT_COLORS: Record<string, string> = {
  "stable-thriving": "#0e6647",
  "volatile-growing": "#8a6010",
  "stable-stagnant": "#1a4a8a",
  "crisis": "#8a1a1a",
};

export function getQuadrant(stability: number | undefined, gdp: number | undefined): keyof typeof QUADRANT_COLORS {
  const highS = stability !== undefined ? stability >= 0 : false;
  const highG = gdp !== undefined ? gdp >= 2 : false;
  if (highS && highG) return "stable-thriving";
  if (!highS && highG) return "volatile-growing";
  if (highS && !highG) return "stable-stagnant";
  return "crisis";
}
