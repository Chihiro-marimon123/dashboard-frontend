import { useState, useEffect } from "react";
import ConflictSection from "./components/ConflictSection";
import TradeSection from "./components/TradeSection";
import StabilitySection from "./components/StabilitySection";
import RelationshipSection from "./components/RelationshipSection";
import japanInfographic from "./attachments/ChatGPT Image Sep 11, 2026 at 11_41_38 PM.png";
import unitedStatesInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_10_54 AM (1).png";
import canadaInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_47 AM (2).png";
import unitedKingdomInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_48 AM (3).png";
import franceInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_49 AM (4).png";
import germanyInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_50 AM (5).png";
import italyInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_51 AM (6).png";
import russiaInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_52 AM (7).png";
import chinaInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_54 AM (8).png";
import indiaInfographic from "./attachments/ChatGPT Image Sep 5, 2026 at 12_12_56 AM (9).png";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#index", label: "Index" },
  { href: "#conflicts", label: "Conflicts" },
  { href: "#trade", label: "Trade Impact" },
  { href: "#stability", label: "Stability" },
  { href: "#relationships", label: "Relationships" },
];

const SECTIONS = [
  {
    href: "#conflicts",
    num: "01",
    title: "Which conflict is the most harmful?",
    desc: "Ranked by battle deaths and economic loss. Sourced from UCDP and World Bank data.",
  },
  {
    href: "#trade",
    num: "02",
    title: "How does conflict affect global trade?",
    desc: "Animated flowline maps showing trade volume changes before and after the Russia-Ukraine war.",
  },
  {
    href: "#stability",
    num: "03",
    title: "Is the country stable?",
    desc: "Three choropleth maps: WGI Political Stability, GDP Growth (2024), and a four-quadrant country classification.",
  },
  {
    href: "#relationships",
    num: "04",
    title: "How do major countries build relationships?",
    desc: "Interactive geopolitical network for G7 nations, Russia, China, and India.",
  },
];

const RELATIONSHIP_INFOGRAPHICS = [
  { country: "Japan", image: japanInfographic },
  { country: "United States", image: unitedStatesInfographic },
  { country: "Canada", image: canadaInfographic },
  { country: "United Kingdom", image: unitedKingdomInfographic },
  { country: "France", image: franceInfographic },
  { country: "Germany", image: germanyInfographic },
  { country: "Italy", image: italyInfographic },
  { country: "Russia", image: russiaInfographic },
  { country: "China", image: chinaInfographic },
  { country: "India", image: indiaInfographic },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(7,11,16,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid #1a2435" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", height: 60, gap: 32 }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: "#dfa92a",
            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: "bold", color: "#070b10",
            fontFamily: "JetBrains Mono, monospace",
          }}>W</div>
          <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 16, color: "#dde4ee" }}>
            Our World in Numbers
          </span>
        </a>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                color: "#7a8899",
                textDecoration: "none",
                borderRadius: 6,
                transition: "color 0.2s, background 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#dde4ee";
                (e.target as HTMLElement).style.background = "#1a2435";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#7a8899";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 24px",
      position: "relative",
      overflow: "hidden",
      background: "#070b10",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(26,36,53,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,36,53,0.4) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />
      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        height: 700,
        background: "radial-gradient(ellipse, rgba(223,169,42,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", position: "relative" }}>
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
          color: "#dfa92a",
          letterSpacing: 3,
          marginBottom: 24,
          textTransform: "uppercase",
        }}>
          Data Journalism Platform · 2024-2025
        </div>

        <h1 style={{
          fontFamily: "Fraunces, serif",
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "#dde4ee",
          marginBottom: 32,
          letterSpacing: -1,
        }}>
          Our World
          <br />
          <span style={{ color: "#dfa92a" }}>in Numbers</span>
        </h1>

        <p style={{
          fontSize: 18,
          color: "#7a8899",
          maxWidth: 560,
          lineHeight: 1.8,
          marginBottom: 48,
          fontWeight: 300,
        }}>
          A data-driven examination of global conflict, economic fragility, and geopolitical power. Through maps, rankings, and relationships that reveal what the headlines don't.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a
            href="#index"
            style={{
              padding: "14px 32px",
              background: "#dfa92a",
              color: "#070b10",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 8,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
          >
            Explore the data →
          </a>
          <a
            href="#about"
            style={{
              padding: "14px 32px",
              border: "1px solid #1a2435",
              color: "#7a8899",
              fontSize: 14,
              borderRadius: 8,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#4a5568";
              (e.target as HTMLElement).style.color = "#dde4ee";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "#1a2435";
              (e.target as HTMLElement).style.color = "#7a8899";
            }}
          >
            About this project
          </a>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          marginTop: 80,
          border: "1px solid #1a2435",
          borderRadius: 10,
          overflow: "hidden",
          maxWidth: 760,
        }}>
          {[
            { value: "1M+", label: "Deaths tracked", color: "#e04040" },
            { value: "$2.2T", label: "Economic losses", color: "#e07b42" },
            { value: "100+", label: "Countries mapped", color: "#4488ff" },
            { value: "23", label: "Active conflicts", color: "#dfa92a" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#0c1118", padding: "20px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 30, fontWeight: 700, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#7a8899", marginTop: 4, fontFamily: "JetBrains Mono, monospace" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: 0.4,
      }}>
        <div style={{ fontSize: 11, color: "#7a8899", fontFamily: "JetBrains Mono, monospace", letterSpacing: 2 }}>SCROLL</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #7a8899, transparent)" }} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: "#0c1118", padding: "80px 0", borderTop: "1px solid #1a2435" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          ABOUT
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 36, fontWeight: 700, color: "#dde4ee", marginBottom: 28 }}>
          What is this platform?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <p style={{ fontSize: 15, color: "#b0b8c8", lineHeight: 1.8, marginBottom: 20 }}>
              <em>Our World in Numbers</em> synthesizes data from three authoritative international sources: the Uppsala Conflict Data Program (UCDP), the World Bank Governance Indicators (WGI), and World Bank National Accounts, to provide a structured, visual assessment of global conflict and its downstream effects.
            </p>
            <p style={{ fontSize: 15, color: "#b0b8c8", lineHeight: 1.8 }}>
              This platform does not advocate a political position. All data is drawn directly from peer-reviewed and institutional sources. Rankings reflect documented battle-related deaths and measured GDP contractions, not assessments of legitimacy or moral culpability.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { source: "UCDP v26.1", label: "Battle-Related Deaths", url: "ucdp.uu.se" },
              { source: "World Bank WGI 2022", label: "Political Stability Estimates", url: "worldbank.org" },
              { source: "World Bank NY.GDP.MKTP.KD.ZG", label: "Annual GDP Growth", url: "worldbank.org" },
              { source: "UN Comtrade + IEA", label: "Trade Flow Data", url: "comtradeplus.un.org" },
            ].map((s) => (
              <div key={s.source} style={{
                background: "#111922",
                border: "1px solid #1a2435",
                borderRadius: 8,
                padding: "14px 16px",
              }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#dfa92a", marginBottom: 4 }}>
                  {s.source}
                </div>
                <div style={{ fontSize: 13, color: "#7a8899" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section id="index" style={{ background: "rgb(19, 34, 54)", padding: "80px 0", borderTop: "1px solid #1a2435" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          INDEX
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 36, fontWeight: 700, color: "#dde4ee", marginBottom: 40 }}>
          What's inside
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {SECTIONS.map((s, i) => (
            <a
              key={s.href}
              href={s.href}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr auto",
                alignItems: "center",
                gap: 24,
                padding: "24px 0",
                borderBottom: "1px solid #1a2435",
                textDecoration: "none",
                transition: "background 0.15s",
                borderRadius: i === SECTIONS.length - 1 ? "0 0 8px 8px" : 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#0c1118";
                (e.currentTarget as HTMLElement).style.paddingLeft = "12px";
                (e.currentTarget as HTMLElement).style.paddingRight = "12px";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                (e.currentTarget as HTMLElement).style.paddingRight = "0";
              }}
            >
              <div style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                color: "#dfa92a",
                fontWeight: "bold",
                letterSpacing: 1,
              }}>
                {s.num}
              </div>
              <div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 600, color: "#dde4ee", marginBottom: 6 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: "#7a8899", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
              <div style={{ color: "#4a5568", fontSize: 20 }}>→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#070b10",
      borderTop: "1px solid #1a2435",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 18, color: "#dde4ee", marginBottom: 4 }}>
            Our World in Numbers
          </div>
          <div style={{ fontSize: 12, color: "#4a5568", fontFamily: "JetBrains Mono, monospace" }}>
            Data current as of 2024-2025. Academic use only.
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["UCDP", "World Bank", "UN Comtrade", "IEA"].map((src) => (
            <span key={src} style={{ fontSize: 12, color: "#4a5568", fontFamily: "JetBrains Mono, monospace" }}>
              {src}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function CountryRelationships() {
  const [selectedProfile, setSelectedProfile] = useState<(typeof RELATIONSHIP_INFOGRAPHICS)[number] | null>(null);

  useEffect(() => {
    if (!selectedProfile) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProfile(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProfile]);

  return (
    <section id="country-relationships" style={{ background: "#070b10", padding: "80px 0", borderTop: "1px solid #1a2435" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          COUNTRY PROFILES
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 42, fontWeight: 700, color: "#dde4ee", lineHeight: 1.15, marginBottom: 12 }}>
          Countries and their relationships
        </h2>
        <p style={{ fontSize: 15, color: "#7a8899", maxWidth: 640, lineHeight: 1.7, marginBottom: 36 }}>
          A closer look at the alliances, partnerships, rivalries, and dependencies shaping each country&apos;s international position.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            padding: "4px 2px 16px",
            scrollSnapType: "x mandatory",
            scrollbarColor: "#4a5568 #0c1118",
          }}
        >
          {RELATIONSHIP_INFOGRAPHICS.map((profile) => (
            <figure
              key={profile.country}
              onClick={() => setSelectedProfile(profile)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") setSelectedProfile(profile);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Enlarge ${profile.country} relationship infographic`}
              style={{
                flex: "0 0 clamp(180px, 18vw, 210px)",
                margin: 0,
                background: "#0c1118",
                border: "1px solid #1a2435",
                borderRadius: 8,
                padding: 10,
                cursor: "zoom-in",
                scrollSnapAlign: "start",
                transition: "border-color 0.2s, transform 0.2s",
              }}
            >
              <img
                src={profile.image}
                alt={`${profile.country} international relationships infographic`}
                style={{ display: "block", width: "100%", height: "auto", aspectRatio: "226 / 320", objectFit: "cover", borderRadius: 4, background: "#fff" }}
              />
              <figcaption style={{ padding: "12px 4px 2px", color: "#dde4ee", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
                {profile.country}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {selectedProfile && (
        <div
          role="presentation"
          onClick={() => setSelectedProfile(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "rgba(3, 6, 10, 0.88)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProfile.country} relationship infographic`}
            onClick={(event) => event.stopPropagation()}
            style={{ position: "relative", maxWidth: "min(90vw, 520px)", maxHeight: "92vh" }}
          >
            <img
              src={selectedProfile.image}
              alt={`${selectedProfile.country} international relationships infographic enlarged`}
              style={{ display: "block", maxWidth: "100%", maxHeight: "92vh", width: "auto", height: "auto", borderRadius: 6, background: "#fff", boxShadow: "0 20px 80px rgba(0,0,0,0.65)" }}
            />
            <button
              type="button"
              onClick={() => setSelectedProfile(null)}
              aria-label="Close enlarged infographic"
              style={{ position: "absolute", top: 10, right: 10, width: 34, height: 34, border: "1px solid #1a2435", borderRadius: "50%", background: "#070b10", color: "#dde4ee", fontSize: 24, lineHeight: 1, cursor: "pointer" }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#070b10" }}>
      <Navbar />
      <Hero />
      <About />
      <Index />
      <ConflictSection />
      <TradeSection />
      <StabilitySection />
      <RelationshipSection />
      <CountryRelationships />
      <Footer />
    </div>
  );
}
