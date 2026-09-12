import { useState } from "react";
import { conflictsByDeaths, conflictsByEconomicLoss, ordinal, type ConflictRecord } from "../data";

function RankBadge({ rank }: { rank: number }) {
  const colors = ["#dfa92a", "#b0b8c8", "#c07840"];
  const color = colors[rank - 1] ?? "#4a5568";
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: "bold",
        fontSize: 11,
        color,
        border: `1px solid ${color}40`,
        borderRadius: 4,
        padding: "2px 8px",
        minWidth: 36,
        textAlign: "center",
        letterSpacing: 1,
      }}
    >
      {ordinal(rank).toUpperCase()}
    </div>
  );
}

function ConflictRow({ record, type }: { record: ConflictRecord; type: "deaths" | "economic" }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        borderBottom: "1px solid #1a2435",
        padding: "16px 0",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 16, alignItems: "start" }}>
        <RankBadge rank={record.rank} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 17, fontWeight: 600, color: "#dde4ee" }}>
              {record.name}
            </span>
            <span style={{ fontSize: 11, color: "#7a8899", background: "#1a2435", borderRadius: 4, padding: "2px 8px" }}>
              {record.country}
            </span>
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: "#7a8899", fontFamily: "JetBrains Mono, monospace" }}>
            {record.period}
          </div>
        </div>
        <div style={{ textAlign: "right", minWidth: 120 }}>
          {type === "deaths" ? (
            <div>
              <div style={{ fontSize: 11, color: "#7a8899", marginBottom: 2 }}>Battle Deaths</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: "bold", fontSize: 16, color: "#e04040" }}>
                {record.deaths}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11, color: "#7a8899", marginBottom: 2 }}>GDP Impact</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: "bold", fontSize: 14, color: "#e07b42" }}>
                {record.gdpDrop}
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#7a8899", marginTop: 2 }}>
                {record.economicLoss}
              </div>
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <div
          style={{
            marginTop: 14,
            marginLeft: 76,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: "#7a8899", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
              Side A
            </div>
            <div style={{ fontSize: 13, color: "#b0b8c8" }}>{record.side1}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#7a8899", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
              Side B
            </div>
            <div style={{ fontSize: 13, color: "#b0b8c8" }}>{record.side2}</div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontSize: 10, color: "#7a8899", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
              Root Cause
            </div>
            <div style={{ fontSize: 13, color: "#b0b8c8" }}>{record.cause}</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 8, marginLeft: 76 }}>
        <span style={{ fontSize: 11, color: "#4a5568" }}>
          {expanded ? "▲ collapse" : "▼ expand details"}
        </span>
      </div>
    </div>
  );
}

export default function ConflictSection() {
  const [activeTab, setActiveTab] = useState<"deaths" | "economic">("deaths");

  const tabs = [
    { key: "deaths" as const, label: "By Deaths" },
    { key: "economic" as const, label: "By Economic Loss" },
  ];

  const data = activeTab === "deaths" ? conflictsByDeaths : conflictsByEconomicLoss;

  return (
    <section id="conflicts" style={{ background: "#070b10", padding: "80px 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          SECTION 01
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 42, fontWeight: 700, color: "#dde4ee", lineHeight: 1.15, marginBottom: 12 }}>
          Which conflict is the
          <br />
          <span style={{ color: "#dfa92a" }}>most harmful?</span>
        </h2>
        <p style={{ fontSize: 15, color: "#7a8899", maxWidth: 580, lineHeight: 1.7, marginBottom: 40 }}>
          We ranked conflicts in the world depending on two measures: how many people have been killed in battle-related deaths (UCDP database), and how much economic loss the conflict caused relative to pre-conflict GDP baselines (World Bank).
        </p>

        <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid #1a2435" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "10px 28px",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                background: "transparent",
                color: activeTab === t.key ? "#dfa92a" : "#7a8899",
                borderBottom: activeTab === t.key ? "2px solid #dfa92a" : "2px solid transparent",
                marginBottom: -1,
                transition: "color 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: "#4a5568", marginBottom: 16, fontFamily: "JetBrains Mono, monospace" }}>
          Click any row to expand conflict details
        </div>

        {data.map((record) => (
          <ConflictRow key={record.rank} record={record} type={activeTab} />
        ))}

        <div style={{ marginTop: 24, fontSize: 12, color: "#4a5568", lineHeight: 1.6 }}>
          Sources: UCDP/PRIO Armed Conflict Dataset v26.1 (updated 2024); World Bank National Accounts 2024 (NY.GDP.MKTP.KD.ZG).
          Battle-related deaths include combatant fatalities; civilian deaths may significantly exceed these figures.
        </div>
      </div>
    </section>
  );
}
