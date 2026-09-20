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
import japanSlide01 from "../image/8BA7CE65-BF22-41C0-9B86-ECE4CB971152.jpeg";
import japanSlide02 from "../image/9F1CB192-29A4-4226-87C1-ED7EA20B16A2.jpeg";
import japanSlide03 from "../image/A2503E5D-A48B-4373-9354-A2A1D928CD8F.jpeg";
import japanSlide04 from "../image/AC5CE677-6597-4F62-9BE9-D0DE84B51DBB.jpeg";
import japanSlide05 from "../image/B71A24E7-D8B0-4425-9E97-A9F04BC67914.jpeg";
import japanSlide06 from "../image/C348DB11-F3DB-44E6-96DB-1D936F31CDC6.jpeg";
import chinaSlide01 from "../image/image/20216323-598E-4181-A1A3-ED8D30A5B28C.jpeg";
import chinaSlide02 from "../image/image/2D702288-BC25-4079-A36B-A35B2DC8EBD4.jpeg";
import chinaSlide03 from "../image/image/3B435241-ED76-4DD8-A8CB-673E1BB02BED.jpeg";
import chinaSlide04 from "../image/image/44429AE3-7FDA-44EC-B280-BAB4808E2B88.jpeg";
import chinaSlide05 from "../image/image/4A61952F-C6C2-4AEA-9E9B-766867FC88AB.jpeg";
import chinaSlide06 from "../image/image/FE1D20D7-9237-4F5D-970C-FC3476B80C8D.jpeg";
import ukSlide01 from "../image/image2/1224AF44-89BC-4302-858B-9DCA84D57E7F.jpeg";
import ukSlide02 from "../image/image2/7F71FAEE-8AB2-48AF-B5D2-303B97E0925F.jpeg";
import ukSlide03 from "../image/image2/9EA16626-1CC7-4DD1-8DDC-91B083CEB52C.jpeg";
import ukSlide04 from "../image/image2/B44B888A-E26B-45B1-9633-3818C5A16918.jpeg";
import ukSlide05 from "../image/image2/BEF4C4E8-5C04-4951-9CA6-0883948917BE.jpeg";
import ukSlide06 from "../image/image2/FA5B2888-DE85-4123-9A21-ECFD9F1046A5.jpeg";
import germanySlide01 from "../image/image3/1631D020-58CF-41BB-BF68-0EBE0EFAC21E.png";
import germanySlide02 from "../image/image3/17B47DC3-025F-4A5E-BF05-282EA1D23EB7.png";
import germanySlide03 from "../image/image3/4549407B-81E3-4C38-899A-3F7136EDF960.png";
import germanySlide04 from "../image/image3/60042F54-BEEF-41F3-A6DC-0C943C3B7DC8.png";
import germanySlide05 from "../image/image3/D110E113-48ED-43B9-BD81-AF06BEA7EE1B.png";
import germanySlide06 from "../image/image3/E5EC8CC3-A2CE-404E-B996-2550EC094A9A.png";
import canadaSlide01 from "../image/image４/4B6CC347-56C2-48DD-B32F-63032D3A0D19.png";
import canadaSlide02 from "../image/image４/9FBC2AC6-8203-41C9-8E49-A39208ACE07E.png";
import canadaSlide03 from "../image/image４/A4B9FC44-55D7-4822-9991-E6E1DF3771FF.png";
import canadaSlide04 from "../image/image４/A9D2BEB6-7E3F-4BE2-885C-F9D2C2F6A1F4.png";
import canadaSlide05 from "../image/image４/C0D15173-5449-4778-A619-D15F73B5580D.png";
import canadaSlide06 from "../image/image４/FDAE8AA6-BC09-41F0-A091-927EC8B50C0E.png";
import usSlide01 from "../image/image5/27BC8C09-1FB0-4EFC-AFDA-BB85A9074A10.png";
import usSlide02 from "../image/image5/2D59ADB5-6F29-41F8-B2D6-B716AA19C2A0.png";
import usSlide03 from "../image/image5/3F986D33-A20E-46A6-8B4A-3B17C9F28400.png";
import usSlide04 from "../image/image5/61387741-E653-4505-BF6F-9274235AC5B4.png";
import usSlide05 from "../image/image5/D3DB297B-C776-47CB-ADC4-C1A22584BB60.png";
import usSlide06 from "../image/image5/EBFE675E-2207-4E33-B2DD-60372FB1087C.png";
import italySlide01 from "../image/image6/2EC3B782-A021-413E-B395-60F243BEBB7A.png";
import italySlide02 from "../image/image6/8C30C31E-CB04-43BA-BA1A-397ED59FB4DD.png";
import italySlide03 from "../image/image6/9797A6F7-6FEC-47CA-A5B3-58361B7C40F4.png";
import italySlide04 from "../image/image6/C6E3B545-6B67-4437-86E8-A0509D5EA7A6.png";
import italySlide05 from "../image/image6/D3F1F86D-182B-42A5-89CB-2C8D0307B623.png";
import italySlide06 from "../image/image6/E23A4CD4-95BA-4559-B09E-6E1563A5513F.png";
import franceSlide01 from "../image/image7/3671A4C8-8273-4053-B952-749A1A4875F8.png";
import franceSlide02 from "../image/image7/55E139AD-9ABA-4C03-A2D3-5E3B18583B29.png";
import franceSlide03 from "../image/image7/60D64285-1B0E-40EC-AECA-3DC19159F26E.png";
import franceSlide04 from "../image/image7/66602436-9511-4480-9343-38CAC40135E0.png";
import franceSlide05 from "../image/image7/B71DFC7F-7727-436F-9BE2-D69E99071217.png";
import franceSlide06 from "../image/image7/D2C87E7A-481A-48FB-ABD5-AF127D803183.png";
import russiaSlide01 from "../image/image8/0A561F6E-7135-484E-9055-B8D103DC0D62.png";
import russiaSlide02 from "../image/image8/1E5BC3ED-4906-413A-A8CE-C69E6A805CAA.png";
import russiaSlide03 from "../image/image8/2BBEA143-2DAA-4275-A4FE-0DB1B2AB4F3E.png";
import russiaSlide04 from "../image/image8/30AEF693-0687-49ED-8420-BA41A7FFB70E.png";
import russiaSlide05 from "../image/image8/310EC587-9C91-4CCE-B59A-6833A083FE74.png";
import russiaSlide06 from "../image/image8/ABC67A6C-2488-461C-B7A9-2F4A977967F6.png";
import indiaSlide01 from "../image/image9/20440646-6F5E-4198-A8EB-1A0B2480B6B5.png";
import indiaSlide02 from "../image/image9/65169436-482D-4C52-A255-CC52AB228AEC.png";
import indiaSlide03 from "../image/image9/8814E41A-18E1-4209-98EA-19EE8EFFAA96.png";
import indiaSlide04 from "../image/image9/963FBDDB-E1BC-473E-ADEC-214FF8EB9255.png";
import indiaSlide05 from "../image/image9/9ADC038D-DC8D-4254-8E83-C71AC2EAC3AB.png";
import indiaSlide06 from "../image/image9/A398CA63-2D4A-49DF-B009-C685A91E0B47.png";

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

const COUNTRY_CAPITAL_POSITIONS = [
  { country: "United States", flag: "🇺🇸", x: 180, y: 215 },
  { country: "Canada", flag: "🇨🇦", x: 120, y: 140 },
  { country: "United Kingdom", flag: "🇬🇧", x: 290, y: 120 },
  { country: "France", flag: "🇫🇷", x: 366, y: 162 },
  { country: "Germany", flag: "🇩🇪", x: 420, y: 122 },
  { country: "Italy", flag: "🇮🇹", x: 455, y: 202 },
  { country: "Japan", flag: "🇯🇵", x: 770, y: 170 },
  { country: "Russia", flag: "🇷🇺", x: 610, y: 110 },
  { country: "China", flag: "🇨🇳", x: 690, y: 258 },
  { country: "India", flag: "🇮🇳", x: 605, y: 340 },
] as const;

const COUNTRY_ROTATION = [
  "Canada",
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "India",
  "Russia",
  "China",
  "Japan",
] as const;

const JAPAN_SLIDES = [
  japanSlide01,
  japanSlide02,
  japanSlide03,
  japanSlide04,
  japanSlide05,
  japanSlide06,
] as const;

const CHINA_SLIDES = [
  chinaSlide01,
  chinaSlide02,
  chinaSlide03,
  chinaSlide04,
  chinaSlide05,
  chinaSlide06,
] as const;

const UK_SLIDES = [
  ukSlide01,
  ukSlide02,
  ukSlide03,
  ukSlide04,
  ukSlide05,
  ukSlide06,
] as const;

const GERMANY_SLIDES = [
  germanySlide01,
  germanySlide02,
  germanySlide03,
  germanySlide04,
  germanySlide05,
  germanySlide06,
] as const;

const CANADA_SLIDES = [
  canadaSlide01,
  canadaSlide02,
  canadaSlide03,
  canadaSlide04,
  canadaSlide05,
  canadaSlide06,
] as const;

const US_SLIDES = [
  usSlide01,
  usSlide02,
  usSlide03,
  usSlide04,
  usSlide05,
  usSlide06,
] as const;

const ITALY_SLIDES = [
  italySlide01,
  italySlide02,
  italySlide03,
  italySlide04,
  italySlide05,
  italySlide06,
] as const;

const FRANCE_SLIDES = [
  franceSlide01,
  franceSlide02,
  franceSlide03,
  franceSlide04,
  franceSlide05,
  franceSlide06,
] as const;

const RUSSIA_SLIDES = [
  russiaSlide01,
  russiaSlide02,
  russiaSlide03,
  russiaSlide04,
  russiaSlide05,
  russiaSlide06,
] as const;

const INDIA_SLIDES = [
  indiaSlide01,
  indiaSlide02,
  indiaSlide03,
  indiaSlide04,
  indiaSlide05,
  indiaSlide06,
] as const;

const COUNTRY_BRIEF_DESCRIPTIONS: Record<string, string[]> = {
  Canada: [
    "Mostly Christian, with a strong secular public culture.",
    "GDP: about US$2.1T; population: about 40M.",
  ],
  "United States": [
    "Christianity remains the largest tradition, though the country is highly religiously diverse.",
    "GDP: about US$27T; population: about 335M.",
  ],
  "United Kingdom": [
    "Christianity remains influential, alongside an increasingly secular and multifaith society.",
    "GDP: about US$3.3T; population: about 68M.",
  ],
  France: [
    "France is majority Catholic, but secularism is central to national identity.",
    "GDP: about US$3.1T; population: about 68M.",
  ],
  Germany: [
    "Christianity remains important, though Germany is highly secular in daily life.",
    "GDP: about US$4.7T; population: about 84M.",
  ],
  Italy: [
    "Catholicism remains deeply rooted in Italian identity and culture.",
    "GDP: about US$2.4T; population: about 58M.",
  ],
  India: [
    "Hinduism is the dominant faith, with major Muslim, Christian, Sikh, and Buddhist communities.",
    "GDP: about US$3.9T; population: about 1.4B.",
  ],
  Russia: [
    "Orthodox Christianity is the dominant faith, alongside a broader pluralistic but secular society.",
    "GDP: about US$2.1T; population: about 144M.",
  ],
  China: [
    "Buddhism, Taoism, and Chinese folk religions remain significant, with secular state ideology dominant.",
    "GDP: about US$18T; population: about 1.4B.",
  ],
  Japan: [
    "Shinto and Buddhism remain central to cultural life, while Japan is also highly secular.",
    "GDP: about US$4.2T; population: about 124M.",
  ],
};

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

const QUIZ_QUESTIONS = [
  {
    question: "Is Finland a member of NATO?",
    options: ["Yes", "No", "Not yet decided", "It applied but was rejected"],
    correct: "Yes",
  },
  {
    question: "In the Gaza conflict, which side is the United States mainly aligned with?",
    options: ["Gaza", "Israel", "Neither side", "A neutral UN agency"],
    correct: "Israel",
  },
  {
    question: "What was the name of the agreement Britain made with both Jews and Palestinians during World War I?",
    options: ["Sykes-Picot Agreement", "Balfour Declaration", "Rose Report", "Kellogg Accord"],
    correct: "Balfour Declaration",
  },
  {
    question: "What is the official English name of NATO?",
    options: ["North Atlantic Treaty Organization", "North American Trade Organization", "Northern Alliance Treaty Organization", "New Atlantic Treaty Office"],
    correct: "North Atlantic Treaty Organization",
  },
  {
    question: "Which country did Russia fight in the war that began in 2022?",
    options: ["Poland", "Ukraine", "Belarus", "Moldova"],
    correct: "Ukraine",
  },
  {
    question: "Which region is at the center of the Israeli-Palestinian conflict?",
    options: ["The Strait of Hormuz", "Gaza Strip and West Bank", "The Suez Canal", "Southern Lebanon"],
    correct: "Gaza Strip and West Bank",
  },
  {
    question: "Which maritime route has the strongest Chinese strategic influence?",
    options: ["Malacca Strait", "Dover Strait", "Berlin Canal", "Asian Sea Route"],
    correct: "Malacca Strait",
  },
  {
    question: "Which treaty is widely known as the main security framework of the EU?",
    options: ["Schengen Agreement", "Maastricht Treaty", "Washington Agreement", "Paris Agreement"],
    correct: "Maastricht Treaty",
  },
  {
    question: "What kind of security alliance does Japan currently maintain with the United States?",
    options: ["Japan-US Alliance", "Japan-EU Alliance", "Japan-China Friendship Treaty", "East Asian Defense Pact"],
    correct: "Japan-US Alliance",
  },
  {
    question: "What is the most common geographical name used for the Middle East region?",
    options: ["North Africa", "West Asia and North Africa", "Eastern Europe", "South Asia"],
    correct: "West Asia and North Africa",
  },
] as const;

function QuizSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const handleSelect = (questionIndex: number, value: string) => {
    setSelectedAnswers((current) => ({
      ...current,
      [questionIndex]: value,
    }));
  };

  return (
    <section style={{ background: "#0c1118", padding: "80px 0", borderTop: "1px solid #1a2435" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          QUICK QUIZ
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 42, fontWeight: 700, color: "#dde4ee", lineHeight: 1.15, marginBottom: 18 }}>
          Test your geopolitical literacy
        </h2>

        <div style={{ display: "grid", gap: 18 }}>
          {QUIZ_QUESTIONS.map((quiz, index) => {
            const selectedAnswer = selectedAnswers[index];
            const isCorrect = selectedAnswer === quiz.correct;

            return (
              <div
                key={quiz.question}
                style={{
                  background: "#111922",
                  border: "1px solid #1a2435",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ color: "#dfa92a", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
                    Q{index + 1}
                  </div>
                  <div style={{ color: "#dde4ee", fontSize: 17, lineHeight: 1.6, fontWeight: 600 }}>
                    {quiz.question}
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {quiz.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const revealCorrect = selectedAnswer !== undefined && option === quiz.correct;
                    const revealWrong = selectedAnswer !== undefined && isSelected && !isCorrect;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(index, option)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          background: revealCorrect
                            ? "rgba(18, 149, 93, 0.18)"
                            : revealWrong
                              ? "rgba(232, 93, 93, 0.15)"
                              : isSelected
                                ? "rgba(223, 169, 42, 0.12)"
                                : "rgba(255,255,255,0.02)",
                          color: "#dde4ee",
                          border: `1px solid ${revealCorrect ? "#2fbf7f" : revealWrong ? "#e85d5d" : isSelected ? "#dfa92a" : "#243447"}`,
                          borderRadius: 10,
                          padding: "12px 14px",
                          cursor: "pointer",
                          fontSize: 14,
                          transition: "all 0.2s ease",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer && (
                  <div
                    style={{
                      marginTop: 14,
                      fontSize: 14,
                      fontWeight: 600,
                      color: isCorrect ? "#6de5a8" : "#f7b3b3",
                    }}
                  >
                    {isCorrect ? "⭕️ Correct" : `❌ The correct answer is: ${quiz.correct}`}
                  </div>
                )}
              </div>
            );
          })}
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
  const [autoIndex, setAutoIndex] = useState(0);
  const [japanSlideIndex, setJapanSlideIndex] = useState(0);
  const [chinaSlideIndex, setChinaSlideIndex] = useState(0);
  const [ukSlideIndex, setUkSlideIndex] = useState(0);
  const [germanySlideIndex, setGermanySlideIndex] = useState(0);
  const [canadaSlideIndex, setCanadaSlideIndex] = useState(0);
  const [usSlideIndex, setUsSlideIndex] = useState(0);
  const [italySlideIndex, setItalySlideIndex] = useState(0);
  const [franceSlideIndex, setFranceSlideIndex] = useState(0);
  const [russiaSlideIndex, setRussiaSlideIndex] = useState(0);
  const [indiaSlideIndex, setIndiaSlideIndex] = useState(0);

  useEffect(() => {
    if (selectedProfile) return;
    const timer = window.setInterval(() => {
      setAutoIndex((current) => (current + 1) % COUNTRY_ROTATION.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile]);

  useEffect(() => {
    const isJapanActive = selectedProfile ? selectedProfile.country === "Japan" : COUNTRY_ROTATION[autoIndex] === "Japan";
    if (!isJapanActive) return;
    const timer = window.setInterval(() => {
      setJapanSlideIndex((current) => (current + 1) % JAPAN_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isChinaActive = selectedProfile ? selectedProfile.country === "China" : COUNTRY_ROTATION[autoIndex] === "China";
    if (!isChinaActive) return;
    const timer = window.setInterval(() => {
      setChinaSlideIndex((current) => (current + 1) % CHINA_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isUkActive = selectedProfile ? selectedProfile.country === "United Kingdom" : COUNTRY_ROTATION[autoIndex] === "United Kingdom";
    if (!isUkActive) return;
    const timer = window.setInterval(() => {
      setUkSlideIndex((current) => (current + 1) % UK_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isGermanyActive = selectedProfile ? selectedProfile.country === "Germany" : COUNTRY_ROTATION[autoIndex] === "Germany";
    if (!isGermanyActive) return;
    const timer = window.setInterval(() => {
      setGermanySlideIndex((current) => (current + 1) % GERMANY_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isCanadaActive = selectedProfile ? selectedProfile.country === "Canada" : COUNTRY_ROTATION[autoIndex] === "Canada";
    if (!isCanadaActive) return;
    const timer = window.setInterval(() => {
      setCanadaSlideIndex((current) => (current + 1) % CANADA_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isUsActive = selectedProfile ? selectedProfile.country === "United States" : COUNTRY_ROTATION[autoIndex] === "United States";
    if (!isUsActive) return;
    const timer = window.setInterval(() => {
      setUsSlideIndex((current) => (current + 1) % US_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isItalyActive = selectedProfile ? selectedProfile.country === "Italy" : COUNTRY_ROTATION[autoIndex] === "Italy";
    if (!isItalyActive) return;
    const timer = window.setInterval(() => {
      setItalySlideIndex((current) => (current + 1) % ITALY_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isFranceActive = selectedProfile ? selectedProfile.country === "France" : COUNTRY_ROTATION[autoIndex] === "France";
    if (!isFranceActive) return;
    const timer = window.setInterval(() => {
      setFranceSlideIndex((current) => (current + 1) % FRANCE_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isRussiaActive = selectedProfile ? selectedProfile.country === "Russia" : COUNTRY_ROTATION[autoIndex] === "Russia";
    if (!isRussiaActive) return;
    const timer = window.setInterval(() => {
      setRussiaSlideIndex((current) => (current + 1) % RUSSIA_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  useEffect(() => {
    const isIndiaActive = selectedProfile ? selectedProfile.country === "India" : COUNTRY_ROTATION[autoIndex] === "India";
    if (!isIndiaActive) return;
    const timer = window.setInterval(() => {
      setIndiaSlideIndex((current) => (current + 1) % INDIA_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedProfile, autoIndex]);

  const activeCountry = selectedProfile ? selectedProfile.country : COUNTRY_ROTATION[autoIndex];
  const activeProfile = selectedProfile ?? RELATIONSHIP_INFOGRAPHICS.find((profile) => profile.country === activeCountry) ?? RELATIONSHIP_INFOGRAPHICS[0];
  const activeDescription = COUNTRY_BRIEF_DESCRIPTIONS[activeProfile.country] ?? ["", ""];
  const currentImage = activeCountry === "Japan"
    ? JAPAN_SLIDES[japanSlideIndex]
    : activeCountry === "China"
      ? CHINA_SLIDES[chinaSlideIndex]
      : activeCountry === "United Kingdom"
        ? UK_SLIDES[ukSlideIndex]
        : activeCountry === "Germany"
          ? GERMANY_SLIDES[germanySlideIndex]
          : activeCountry === "Canada"
            ? CANADA_SLIDES[canadaSlideIndex]
            : activeCountry === "United States"
              ? US_SLIDES[usSlideIndex]
              : activeCountry === "Italy"
                ? ITALY_SLIDES[italySlideIndex]
                : activeCountry === "France"
                  ? FRANCE_SLIDES[franceSlideIndex]
                  : activeCountry === "Russia"
                    ? RUSSIA_SLIDES[russiaSlideIndex]
                    : activeCountry === "India"
                      ? INDIA_SLIDES[indiaSlideIndex]
                      : activeProfile.image;
  const currentAltText = activeCountry === "Japan"
    ? `Japan relationship visual ${japanSlideIndex + 1}`
    : activeCountry === "China"
      ? `China relationship visual ${chinaSlideIndex + 1}`
      : activeCountry === "United Kingdom"
        ? `United Kingdom relationship visual ${ukSlideIndex + 1}`
        : activeCountry === "Germany"
          ? `Germany relationship visual ${germanySlideIndex + 1}`
          : activeCountry === "Canada"
            ? `Canada relationship visual ${canadaSlideIndex + 1}`
            : activeCountry === "United States"
              ? `United States relationship visual ${usSlideIndex + 1}`
              : activeCountry === "Italy"
                ? `Italy relationship visual ${italySlideIndex + 1}`
                : activeCountry === "France"
                  ? `France relationship visual ${franceSlideIndex + 1}`
                  : activeCountry === "Russia"
                    ? `Russia relationship visual ${russiaSlideIndex + 1}`
                    : activeCountry === "India"
                      ? `India relationship visual ${indiaSlideIndex + 1}`
                      : `${activeProfile.country} international relationships infographic`;

  return (
    <section id="country-relationships" style={{ background: "#070b10", padding: "80px 0", borderTop: "1px solid #1a2435" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2 }}>
          COUNTRY PROFILES
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 42, fontWeight: 700, color: "#dde4ee", lineHeight: 1.15, marginBottom: 12 }}>
          Countries and their relationships
        </h2>
        <p style={{ fontSize: 15, color: "#7a8899", maxWidth: 640, lineHeight: 1.7, marginBottom: 10 }}>
          A closer look at the alliances, partnerships, rivalries, and dependencies shaping each country&apos;s international position.
        </p>

        <div
          style={{
            marginBottom: 22,
            color: "#e85d5d",
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: 0.2,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Click a flag to see each country&apos;s international relationships.
        </div>

        <div
          style={{
            background: "#0c1118",
            border: "1px solid #1a2435",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <svg viewBox="0 0 900 430" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <radialGradient id="map-bg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#0f1a28" />
                <stop offset="100%" stopColor="#070b10" />
              </radialGradient>
            </defs>

            <rect x={0} y={0} width={900} height={430} fill="url(#map-bg)" rx={10} />

            <g opacity={0.2} fill="#253b52" stroke="#3b536e" strokeWidth={1}>
              <path d="M 70 190 Q 98 138 150 120 L 210 80 Q 238 68 252 98 L 256 150 L 226 210 L 192 234 L 150 260 L 112 252 L 90 218 Z" />
              <path d="M 292 112 L 324 92 L 352 96 L 372 88 L 394 96 L 423 111 L 447 122 L 437 160 L 392 176 L 354 170 L 316 152 Z" />
              <path d="M 348 186 L 390 188 L 432 212 L 448 258 L 432 332 L 392 360 L 360 330 L 346 276 L 338 228 Z" />
              <path d="M 456 114 L 505 90 L 560 78 L 620 104 L 670 126 L 718 104 L 794 118 L 810 154 L 776 206 L 718 224 L 668 246 L 620 206 L 584 181 L 536 206 L 500 210 L 472 166 Z" />
              <path d="M 568 332 L 620 326 L 648 352 L 634 400 L 592 394 L 570 360 Z" />
            </g>

            {COUNTRY_CAPITAL_POSITIONS.map(({ country, flag, x, y }) => {
              const profile = RELATIONSHIP_INFOGRAPHICS.find((item) => item.country === country);
              if (!profile) return null;

              const isSelected = activeCountry === country;

              return (
                <g
                  key={country}
                  onClick={() => setSelectedProfile((current) => current?.country === country ? null : profile)}
                  style={{ cursor: "pointer" }}
                >
                  <line x1={x} y1={y + 22} x2={x} y2={y + 44} stroke="#dde4ee" strokeOpacity={0.6} strokeWidth={1.2} />
                  <circle cx={x} cy={y} r={isSelected ? 18 : 14} fill={isSelected ? "rgba(232,93,93,0.18)" : "rgba(255,255,255,0.08)"} stroke={isSelected ? "#e85d5d" : "#dde4ee"} strokeWidth={2} />
                  <text x={x} y={y + 7} textAnchor="middle" fontSize={18} style={{ userSelect: "none" }}>{flag}</text>
                  <text x={x} y={y + 58} textAnchor="middle" fontSize={11} fill={isSelected ? "#e85d5d" : "#7a8899"} fontFamily="JetBrains Mono, monospace" letterSpacing={1}>{country}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div
          style={{
            background: "#0b1017",
            border: "1px solid #1a2435",
            borderRadius: 14,
            padding: 18,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#dfa92a", letterSpacing: 2, textTransform: "uppercase" }}>
              {activeProfile.country}
            </div>
          </div>
          <img
            src={currentImage}
            alt={currentAltText}
            style={{
              display: "block",
              width: "auto",
              maxWidth: "100%",
              height: "auto",
              maxHeight: "78vh",
              objectFit: "contain",
              margin: "0 auto",
              borderRadius: 8,
              background: "#fff",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
              imageRendering: "auto",
            }}
          />
          <div style={{ marginTop: 16, color: "#dde4ee", fontSize: 14, lineHeight: 1.7 }}>
            <div>{activeDescription[0]}</div>
            <div style={{ color: "#7a8899" }}>{activeDescription[1]}</div>
          </div>
        </div>
      </div>
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
      <QuizSection />
      <Footer />
    </div>
  );
}
