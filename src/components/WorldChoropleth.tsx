import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoNaturalEarth1 } from "d3-geo";
import type { ConflictTradeRoute } from "../data";

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
  tradeRoutes?: ConflictTradeRoute[];
  children?: React.ReactNode;
  highlightedCountryId?: string | null;
  countryFilter?: (id: string) => boolean;
  enableFullscreen?: boolean;
}

const routeProjection = geoNaturalEarth1().scale(155).translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

function routePath(route: ConflictTradeRoute) {
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
  return { d: `M ${start[0]},${start[1]} Q ${controlX},${controlY} ${end[0]},${end[1]}`, arrow };
}

export default function WorldChoropleth({ colorFn, tooltipFn, markers, tradeRoutes, children, highlightedCountryId, countryFilter, enableFullscreen = false }: WorldChoroplethProps) {
  const [tooltip, setTooltip] = useState<{ content: TooltipContent; x: number; y: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isFullscreen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isFullscreen]);

  return (
    <div
      className={`relative world-choropleth${isFullscreen ? " world-choropleth-fullscreen" : ""}`}
      onClick={enableFullscreen && !isFullscreen ? () => setIsFullscreen(true) : undefined}
      style={{
        background: "#070b10",
        borderRadius: isFullscreen ? 0 : 8,
        overflow: "hidden",
        cursor: enableFullscreen && !isFullscreen ? "zoom-in" : "default",
        ...(isFullscreen ? {
          position: "fixed" as const,
          inset: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px 24px",
        } : {}),
      }}
    >
      {enableFullscreen && !isFullscreen && (
        <button
          type="button"
          className="world-choropleth-expand"
          aria-label="Open map in fullscreen"
          title="Open map in fullscreen"
          onClick={(event) => {
            event.stopPropagation();
            setIsFullscreen(true);
          }}
        >
          ⛶
        </button>
      )}
      {isFullscreen && (
        <button
          type="button"
          className="world-choropleth-close"
          onClick={() => setIsFullscreen(false)}
        >
          Close map
        </button>
      )}
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155 }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: "100%", height: "auto", display: "block", cursor: enableFullscreen && !isFullscreen ? "zoom-in" : "default" }}
      >
        <defs>
          <filter id="country-highlight-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="expanded" />
            <feComposite in="expanded" in2="SourceAlpha" operator="out" result="outline" />
            <feGaussianBlur in="outline" stdDeviation="2.5" result="blurred-outline" />
            <feFlood floodColor="#f6d365" floodOpacity="0.9" result="glow-color" />
            <feComposite in="glow-color" in2="blurred-outline" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const id = String(geo.id);
              const isHighlighted = highlightedCountryId !== null && highlightedCountryId !== undefined && id === highlightedCountryId;
              const isFilteredOut = countryFilter !== undefined && !countryFilter(id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isFilteredOut ? "#101721" : colorFn(id)}
                  stroke={isHighlighted ? "#f6d365" : "#0c1420"}
                  strokeWidth={isHighlighted ? 1.2 : 0.4}
                  onMouseEnter={(evt: React.MouseEvent) => {
                    const info = tooltipFn(id);
                    if (info) setTooltip({ content: info, x: evt.clientX, y: evt.clientY });
                  }}
                  onMouseMove={(evt: React.MouseEvent) => {
                    setTooltip((prev) => prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null);
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: { outline: "none", filter: isHighlighted ? "url(#country-highlight-glow)" : undefined },
                    hover: { outline: "none", opacity: isHighlighted ? 1 : 0.75 },
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
        {tradeRoutes?.map((route) => {
          const geometry = routePath(route);
          if (!geometry) return null;
          const color = route.afterValueUsd >= route.beforeValueUsd ? "#22c55e" : "#ef4444";
          return (
            <g key={`${route.rank}-${route.hsCode}-${route.origin}-${route.destination}`}>
              <path d={geometry.d} fill="none" stroke="#070b10" strokeWidth={5} strokeLinecap="round" />
              <path d={geometry.d} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
              <polygon points={geometry.arrow} fill={color} stroke="#070b10" strokeWidth={1} strokeLinejoin="round" />
              <Marker coordinates={route.originCoords}>
                <circle r={3.5} fill={color} stroke="#070b10" strokeWidth={1} />
              </Marker>
              <Marker coordinates={route.destinationCoords}>
                <circle r={3.5} fill={color} stroke="#070b10" strokeWidth={1} />
              </Marker>
            </g>
          );
        })}
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
  if (v < -1.5) return "#d94d2b";
  if (v < -1) return "#e9a13b";
  if (v < -0.5) return "#e8d76d";
  if (v < 0) return "#a8d76b";
  if (v < 0.5) return "#5ebd7a";
  if (v < 1.5) return "#2b9b5d";
  return "#0e6647";
}

export function gdpColor(v: number | undefined): string {
  if (v === undefined) return "#1a2435";
  if (v < -15) return "#7b1a1a";
  if (v < -5) return "#d94d2b";
  if (v < 0) return "#f0a34a";
  if (v < 2) return "#e9d66a";
  if (v < 5) return "#a9d9b2";
  if (v < 8) return "#7ec8d8";
  return "#1d4f9b";
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
