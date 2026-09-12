import { useState } from "react"

const W = 900
const H = 500

interface Country {
  id: string
  name: string
  x: number
  y: number
  color: string
  bloc: string
  flag: string
}

interface Relationship {
  from: string
  to: string
  type: "alliance" | "partnership" | "cooperation" | "competitive" | "hostile" | "energy"
  label: string
  detail: string
}

const countries: Country[] = [
  {
    id: "USA",
    name: "United States",
    x: 155,
    y: 255,
    color: "#4488ff",
    bloc: "G7",
    flag: "🇺🇸",
  },
  {
    id: "CAN",
    name: "Canada",
    x: 118,
    y: 158,
    color: "#4488ff",
    bloc: "G7",
    flag: "🇨🇦",
  },
  {
    id: "UK",
    name: "United Kingdom",
    x: 285,
    y: 125,
    color: "#4488ff",
    bloc: "G7",
    flag: "🇬🇧",
  },
  {
    id: "FRA",
    name: "France",
    x: 358,
    y: 165,
    color: "#4488ff",
    bloc: "G7",
    flag: "🇫🇷",
  },
  {
    id: "DEU",
    name: "Germany",
    x: 418,
    y: 110,
    color: "#4488ff",
    bloc: "G7",
    flag: "🇩🇪",
  },
  {
    id: "ITA",
    name: "Italy",
    x: 450,
    y: 215,
    color: "#4488ff",
    bloc: "G7",
    flag: "🇮🇹",
  },
  {
    id: "JPN",
    name: "Japan",
    x: 730,
    y: 155,
    color: "#4488ff",
    bloc: "G7",
    flag: "🇯🇵",
  },
  {
    id: "RUS",
    name: "Russia",
    x: 600,
    y: 105,
    color: "#ef4444",
    bloc: "Other",
    flag: "🇷🇺",
  },
  {
    id: "CHN",
    name: "China",
    x: 695,
    y: 290,
    color: "#f97316",
    bloc: "Other",
    flag: "🇨🇳",
  },
  {
    id: "IND",
    name: "India",
    x: 600,
    y: 390,
    color: "#22c55e",
    bloc: "Other",
    flag: "🇮🇳",
  },
]

const relationships: Relationship[] = [
  {
    from: "USA",
    to: "UK",
    type: "alliance",
    label: "Special Relationship + NATO + Five Eyes",
    detail:
      "Deepest bilateral intelligence/military bond; AUKUS; unconditional mutual defence",
  },
  {
    from: "USA",
    to: "CAN",
    type: "alliance",
    label: "USMCA + NATO + NORAD",
    detail:
      "Integrated defence (NORAD); largest bilateral trade relationship; shared border",
  },
  {
    from: "USA",
    to: "FRA",
    type: "alliance",
    label: "NATO + Historical ally",
    detail:
      "NATO founding members; periodic tensions (AUKUS, Iraq 2003); strong baseline",
  },
  {
    from: "USA",
    to: "DEU",
    type: "alliance",
    label: "NATO + Major trade partner",
    detail:
      "Core NATO pillar; Germany's defence spending increase driven by US pressure",
  },
  {
    from: "USA",
    to: "ITA",
    type: "alliance",
    label: "NATO",
    detail:
      "NATO ally; US military bases (Aviano, Sigonella); occasional political friction",
  },
  {
    from: "USA",
    to: "JPN",
    type: "alliance",
    label: "US-Japan Security Treaty",
    detail:
      "50,000 US troops in Japan; Article 5 guarantees; tech & defence deepening",
  },
  {
    from: "USA",
    to: "IND",
    type: "partnership",
    label: "Quad + iCET + Growing ties",
    detail:
      "Quad member; Initiative on Critical & Emerging Technology; India hedges with Russia",
  },
  {
    from: "USA",
    to: "CHN",
    type: "competitive",
    label: "Strategic competition",
    detail:
      "Technology decoupling; Taiwan flashpoint; chip export controls; South China Sea",
  },
  {
    from: "USA",
    to: "RUS",
    type: "hostile",
    label: "Sanctions + Ukraine war proxy",
    detail:
      "$75B+ in Ukraine aid; SWIFT expulsion; G7 price cap on Russian oil; ICC indictment",
  },
  {
    from: "UK",
    to: "FRA",
    type: "alliance",
    label: "NATO + Lancaster House",
    detail:
      "Joint nuclear/defence cooperation; post-Brexit trade friction; AUKUS excluded France",
  },
  {
    from: "UK",
    to: "DEU",
    type: "alliance",
    label: "NATO",
    detail:
      "Post-Brexit EU tensions; NATO alignment strong; joint Ukraine support",
  },
  {
    from: "UK",
    to: "CAN",
    type: "alliance",
    label: "Commonwealth + Five Eyes",
    detail:
      "CANZUK alignment; Five Eyes intelligence; King Charles as head of state",
  },
  {
    from: "FRA",
    to: "DEU",
    type: "alliance",
    label: "Élysée Treaty + EU core",
    detail:
      "Engine of European integration; differences on Ukraine speed/depth of response",
  },
  {
    from: "DEU",
    to: "RUS",
    type: "hostile",
    label: "Nord Stream + Sanctions",
    detail:
      "Nord Stream 1&2 destroyed 2022; Germany's gas import from Russia fell 90%+ in 2023",
  },
  {
    from: "FRA",
    to: "RUS",
    type: "hostile",
    label: "Sanctions + Ukraine support",
    detail:
      "€3B+ in military aid to Ukraine; Macron initially sought dialogue, now hardened",
  },
  {
    from: "ITA",
    to: "RUS",
    type: "hostile",
    label: "NATO alignment vs. past ties",
    detail:
      "Italy historically close to Russia (ENI gas deals); now fully aligned with NATO sanctions",
  },
  {
    from: "JPN",
    to: "CHN",
    type: "competitive",
    label: "Senkaku/Diaoyu dispute",
    detail:
      "Contested islands; China Coast Guard incursions; Japan's security legislation response",
  },
  {
    from: "JPN",
    to: "RUS",
    type: "hostile",
    label: "Sanctions + Kuril dispute",
    detail:
      "Japan joined G7 sanctions; Northern Territories/Kuril Islands dispute remains unresolved",
  },
  {
    from: "RUS",
    to: "CHN",
    type: "partnership",
    label: "No-Limits Partnership",
    detail:
      "Feb 2022 joint statement; China buys Russian oil/gas at discount; no weapons (for now)",
  },
  {
    from: "RUS",
    to: "IND",
    type: "cooperation",
    label: "Arms + Discounted oil",
    detail:
      "60%+ of India's military hardware is Russian-origin; India buys 40Mt+ Russian oil/yr",
  },
  {
    from: "CHN",
    to: "IND",
    type: "competitive",
    label: "LAC border clashes",
    detail:
      "2020 Galwan clash killed 20 Indian soldiers; still no full border resolution; tech decoupling",
  },
  {
    from: "IND",
    to: "JPN",
    type: "partnership",
    label: "Quad + Free & Open Indo-Pacific",
    detail:
      "Joint Quad member; defence agreements; counterweight to Chinese influence",
  },
  {
    from: "IND",
    to: "FRA",
    type: "cooperation",
    label: "Strategic partner + Rafale",
    detail:
      "36 Rafale jets; ONSP (one-stop defence partner); growing trade; non-NATO pillar",
  },
]

const REL_STYLES: Record<string, {
  color: string
  dash?: string
  width: number
  label: string
}> = {
  alliance: { color: "#4488ff", width: 3, label: "Alliance (NATO/Treaty)" },
  partnership: { color: "#22c55e", width: 2.5, label: "Strategic Partnership" },
  cooperation: { color: "#dfa92a", width: 2, label: "Cooperation" },
  competitive: {
    color: "#f97316",
    dash: "6 4",
    width: 2,
    label: "Competitive/Tense",
  },
  hostile: {
    color: "#ef4444",
    dash: "6 3",
    width: 2.5,
    label: "Hostile/Adversarial",
  },
  energy: {
    color: "#a855f7",
    dash: "4 3",
    width: 2,
    label: "Energy Dependency",
  },
}

function getCountry(id: string) {
  return countries.find((c) => c.id === id)!
}

function midpoint(
  a: Country,
  b: Country,
  bend: number = 0,
): [number, number, number, number] {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const ox = -dy / len
  const oy = dx / len
  return [mx + ox * bend, my + oy * bend, mx, my]
}

export default function RelationshipSection() {
  const [hovered, setHovered] = useState<Relationship | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const activeRels = relationships.filter(
    (r) =>
      !hoveredCountry || r.from === hoveredCountry || r.to === hoveredCountry,
  )

  return (
    <section
      id="relationships"
      style={{ background: "#0c1118", padding: "80px 0" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            marginBottom: 8,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            color: "#dfa92a",
            letterSpacing: 2,
          }}
        >
          SECTION 04
        </div>
        <h2
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 42,
            fontWeight: 700,
            color: "#dde4ee",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          How do major countries
          <br />
          <span style={{ color: "#dfa92a" }}>build relationships?</span>
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#7a8899",
            maxWidth: 640,
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          Geopolitical relationships between the G7 nations, Russia, China, and
          India, covering alliances, strategic partnerships, trade dependencies,
          and active rivalries. Hover a country or edge to explore.
        </p>

        {/* Network diagram */}
        <div
          style={{
            background: "#0a0e16",
            border: "1px solid #1a2435",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#0f1520" />
                <stop offset="100%" stopColor="#070b10" />
              </radialGradient>
              {countries.map((c) => (
                <radialGradient
                  key={`grd-${c.id}`}
                  id={`grd-${c.id}`}
                  cx="50%"
                  cy="50%"
                >
                  <stop offset="0%" stopColor={c.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={c.color} stopOpacity={0} />
                </radialGradient>
              ))}
            </defs>

            <rect width={W} height={H} fill="url(#bgGrad)" />

            {/* Subtle country glow */}
            {countries.map((c) => (
              <circle
                key={`glow-${c.id}`}
                cx={c.x}
                cy={c.y}
                r={hoveredCountry === c.id ? 60 : 30}
                fill={`url(#grd-${c.id})`}
                style={{ transition: "r 0.3s" }}
              />
            ))}

            {/* Relationship edges */}
            {relationships.map((rel) => {
              const a = getCountry(rel.from)
              const b = getCountry(rel.to)
              const style = REL_STYLES[rel.type]
              const isActive =
                !hoveredCountry ||
                rel.from === hoveredCountry ||
                rel.to === hoveredCountry
              const [cx, cy] = midpoint(a, b, 18)
              const d = `M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`
              return (
                <path
                  key={`${rel.from}-${rel.to}`}
                  d={d}
                  fill="none"
                  stroke={style.color}
                  strokeWidth={style.width}
                  strokeDasharray={style.dash}
                  strokeOpacity={isActive ? (hovered === rel ? 1 : 0.5) : 0.08}
                  strokeLinecap="round"
                  style={{
                    cursor: "pointer",
                    transition: "stroke-opacity 0.2s",
                  }}
                  onMouseEnter={() => setHovered(rel)}
                  onMouseLeave={() => setHovered(null)}
                />
              )
            })}

            {/* Country nodes */}
            {countries.map((c) => {
              const isActive =
                !hoveredCountry ||
                hoveredCountry === c.id ||
                relationships.some(
                  (r) =>
                    (r.from === c.id || r.to === c.id) &&
                    (r.from === hoveredCountry || r.to === hoveredCountry),
                )
              return (
                <g
                  key={c.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredCountry(c.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={24}
                    fill="#111922"
                    stroke={c.color}
                    strokeWidth={hoveredCountry === c.id ? 3 : 1.5}
                    strokeOpacity={isActive ? 1 : 0.25}
                    style={{ transition: "all 0.2s" }}
                  />
                  <text
                    x={c.x}
                    y={c.y + 1.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 17, userSelect: "none" }}
                  >
                    {c.flag}
                  </text>
                  <text
                    x={c.x}
                    y={c.y + (c.y < H / 2 ? -32 : 34)}
                    textAnchor="middle"
                    style={{
                      fontSize: 10,
                      fill: isActive ? c.color : "#2a3a4a",
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: "bold",
                      letterSpacing: 1,
                      transition: "fill 0.2s",
                    }}
                  >
                    {c.id}
                  </text>
                  <text
                    x={c.x}
                    y={c.y + (c.y < H / 2 ? -22 : 44)}
                    textAnchor="middle"
                    style={{
                      fontSize: 8.5,
                      fill: isActive ? "#7a8899" : "#1a2435",
                      fontFamily: "Inter, sans-serif",
                      transition: "fill 0.2s",
                    }}
                  >
                    {c.bloc === "G7" ? "G7" : c.bloc}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Tooltip overlay */}
          {hovered && (
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#111922",
                border: `1px solid ${REL_STYLES[hovered.type].color}60`,
                borderRadius: 8,
                padding: "14px 20px",
                maxWidth: 480,
                width: "90%",
                boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: REL_STYLES[hovered.type].color,
                  }}
                >
                  {hovered.from} ↔ {hovered.to}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    background: `${REL_STYLES[hovered.type].color}20`,
                    color: REL_STYLES[hovered.type].color,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {hovered.type.toUpperCase()}
                </span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#dde4ee",
                  marginBottom: 6,
                }}
              >
                {hovered.label}
              </div>
              <div style={{ fontSize: 13, color: "#7a8899", lineHeight: 1.6 }}>
                {hovered.detail}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 20 }}
        >
          {Object.entries(REL_STYLES).map(([key, s]) => (
            <div
              key={key}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <svg width={36} height={10} style={{ overflow: "visible" }}>
                <line
                  x1={0}
                  y1={5}
                  x2={36}
                  y2={5}
                  stroke={s.color}
                  strokeWidth={2.5}
                  strokeDasharray={s.dash}
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontSize: 12, color: "#7a8899" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Country bloc legend */}
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}
        >
          {[
            { color: "#4488ff", label: "G7 Member" },
            { color: "#ef4444", label: "Russia" },
            { color: "#f97316", label: "China" },
            { color: "#22c55e", label: "India" },
          ].map((b) => (
            <div
              key={b.label}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: `2px solid ${b.color}`,
                  background: "#111922",
                }}
              />
              <span style={{ fontSize: 12, color: "#7a8899" }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Relationship table */}
        <div style={{ marginTop: 40 }}>
          <h3
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: 22,
              fontWeight: 600,
              color: "#dde4ee",
              marginBottom: 20,
            }}
          >
            All Bilateral Relationships
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #1a2435" }}>
                  {["Pair", "Type", "Key Dimension"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 14px",
                        textAlign: "left",
                        color: "#7a8899",
                        fontWeight: 500,
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 11,
                        letterSpacing: 1,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {relationships.map((r) => {
                  const s = REL_STYLES[r.type]
                  return (
                    <tr
                      key={`${r.from}-${r.to}`}
                      style={{ borderBottom: "1px solid #0f1824" }}
                    >
                      <td style={{ padding: "10px 14px" }}>
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontWeight: "bold",
                            fontSize: 13,
                            color: "#dde4ee",
                          }}
                        >
                          {r.from} ↔ {r.to}
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span
                          style={{
                            fontSize: 11,
                            background: `${s.color}15`,
                            color: s.color,
                            padding: "3px 10px",
                            borderRadius: 4,
                            fontFamily: "JetBrains Mono, monospace",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.type}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          color: "#7a8899",
                          lineHeight: 1.5,
                        }}
                      >
                        {r.label}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
