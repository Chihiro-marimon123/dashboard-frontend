export interface ConflictRecord {
  rank: number;
  name: string;
  country: string;
  deaths: string;
  gdpDrop?: string;
  economicLoss?: string;
  side1: string;
  side2: string;
  cause: string;
  period: string;
  lat: number;
  lon: number;
}

export interface TradeFlow {
  id: string;
  fromLabel: string;
  toLabel: string;
  fromCoords: [number, number];
  toCoords: [number, number];
  commodity: string;
  volume2023: number;
  volume2024: number;
  unit: string;
  color: string;
  conflictRank: number;
}

export interface UnstableCountry {
  country: string;
  score: number;
  situation: string;
  flag: string;
  detail: string;
}

// WGI Political Stability Estimate 2023 (ISO numeric -> score, range ~-3 to +3)
// Source: World Bank Worldwide Governance Indicators 2023 release
export const politicalStabilityData: Record<string, number> = {
  "4": -2.82, "8": 0.18, "12": -0.61, "24": -0.78, "32": -0.22,
  "36": 1.12, "40": 1.48, "50": -0.91, "56": 0.71, "68": -0.28,
  "76": -0.14, "100": 0.19, "104": -2.08, "116": -0.31, "120": -0.98,
  "124": 1.05, "144": -0.18, "152": 0.55, "156": -0.32, "170": -1.18,
  "178": -0.95, "180": -2.28, "188": 0.68, "192": -0.51, "203": 0.98,
  "208": 1.68, "214": -0.35, "218": -0.41, "231": -1.22, "246": 1.79,
  "250": 0.22, "266": -0.82, "276": 0.81, "288": -0.18, "300": 0.15,
  "320": -0.88, "332": -2.48, "340": -0.91, "348": 0.48, "356": -0.92,
  "360": -0.31, "364": -0.98, "368": -1.28, "372": 1.28, "376": -1.28,
  "380": 0.31, "388": 0.38, "392": 0.98, "400": -0.42, "404": -0.52,
  "408": -1.65, "410": 0.48, "414": 0.35, "418": -0.31, "422": -1.88,
  "430": -0.51, "434": -1.92, "484": -0.88, "498": -0.22, "504": -0.18,
  "508": -0.88, "516": 0.58, "524": -0.35, "528": 1.22, "554": 1.68,
  "558": -0.41, "562": -1.65, "566": -1.55, "578": 1.88, "586": -2.38,
  "591": 0.65, "604": -0.28, "608": -0.18, "616": 0.68, "620": 0.95,
  "630": 0.48, "634": 0.15, "642": 0.32, "643": -1.05, "646": -0.32,
  "682": -0.22, "686": -0.35, "694": -0.65, "703": 0.82, "705": 1.08,
  "706": -2.62, "710": -0.18, "724": 0.45, "729": -2.52, "752": 1.65,
  "756": 1.75, "760": -2.68, "764": -0.22, "788": -0.32, "792": -1.32,
  "800": -1.08, "804": -1.62, "784": 0.48, "818": -0.55, "826": 0.48,
  "840": 0.25, "858": 0.68, "860": -0.31, "862": -1.88, "704": -0.25,
  "887": -2.55, "894": -0.72, "716": -1.18,
  // Palestine/Gaza
  "275": -2.85,
};

// Annual GDP Growth 2024 (%) — IMF World Economic Outlook April 2025 / World Bank
export const gdpGrowthData: Record<string, number> = {
  "4": -7.4, "8": 3.4, "12": 4.1, "24": 4.8, "32": -1.8,
  "36": 1.5, "40": 0.9, "50": 5.7, "56": 1.1, "68": 1.9,
  "76": 3.4, "100": 2.1, "104": 1.0, "116": 5.8, "120": 3.8,
  "124": 1.3, "144": 4.9, "152": 2.5, "156": 5.0, "170": 1.6,
  "178": 3.2, "180": 4.7, "188": 4.6, "192": 1.0, "203": 1.0,
  "208": 2.1, "214": 5.1, "218": 0.4, "231": 7.3, "246": 1.4,
  "250": 1.1, "266": 2.8, "276": -0.2, "288": 5.7, "300": 2.3,
  "320": 3.5, "332": -5.5, "340": 3.1, "348": 0.5, "356": 7.0,
  "360": 5.1, "364": 3.2, "368": 2.0, "372": 2.2, "376": 1.2,
  "380": 0.5, "388": 1.5, "392": -0.1, "400": 2.5, "404": 5.0,
  "408": -0.1, "410": 2.5, "414": 3.4, "418": 4.0, "422": 2.3,
  "430": 4.2, "434": 7.8, "484": 1.5, "498": 0.5, "504": 3.2,
  "508": 5.3, "516": 4.1, "524": 4.0, "528": 0.8, "554": 1.1,
  "558": 3.8, "562": 6.4, "566": 2.9, "578": 0.6, "586": 2.5,
  "591": 2.5, "604": 3.0, "608": 6.2, "616": 2.8, "620": 1.9,
  "634": 2.5, "642": -0.8, "643": 3.6, "646": 7.2, "682": 1.7,
  "686": 7.1, "694": 4.2, "703": 1.1, "705": 1.5, "706": 3.5,
  "710": 0.6, "724": 3.4, "729": -20.3, "752": 0.5, "756": 1.3,
  "760": -1.5, "764": 2.7, "788": 2.3, "792": 3.2, "800": 6.3,
  "804": 3.5, "784": 4.0, "818": 2.7, "826": 1.1, "840": 2.8,
  "858": 3.1, "860": 6.0, "862": 4.6, "704": 7.1, "887": 2.0,
  "894": 2.3, "716": 2.8,
  "275": -85.0,
};

export const countryNames: Record<string, string> = {
  "4": "Afghanistan", "8": "Albania", "12": "Algeria", "24": "Angola",
  "32": "Argentina", "36": "Australia", "40": "Austria", "50": "Bangladesh",
  "56": "Belgium", "68": "Bolivia", "76": "Brazil", "100": "Bulgaria",
  "104": "Myanmar", "116": "Cambodia", "120": "Cameroon", "124": "Canada",
  "144": "Sri Lanka", "152": "Chile", "156": "China", "170": "Colombia",
  "178": "Republic of Congo", "180": "DR Congo", "188": "Costa Rica",
  "192": "Cuba", "203": "Czech Republic", "208": "Denmark",
  "214": "Dominican Republic", "218": "Ecuador", "231": "Ethiopia",
  "246": "Finland", "250": "France", "266": "Gabon", "276": "Germany",
  "275": "Palestine (Gaza)", "288": "Ghana", "300": "Greece", "320": "Guatemala",
  "332": "Haiti", "340": "Honduras", "348": "Hungary", "356": "India",
  "360": "Indonesia", "364": "Iran", "368": "Iraq", "372": "Ireland",
  "376": "Israel", "380": "Italy", "388": "Jamaica", "392": "Japan",
  "400": "Jordan", "404": "Kenya", "408": "North Korea", "410": "South Korea",
  "414": "Kuwait", "418": "Laos", "422": "Lebanon", "430": "Liberia",
  "434": "Libya", "484": "Mexico", "498": "Moldova", "504": "Morocco",
  "508": "Mozambique", "516": "Namibia", "524": "Nepal", "528": "Netherlands",
  "554": "New Zealand", "558": "Nicaragua", "562": "Niger", "566": "Nigeria",
  "578": "Norway", "586": "Pakistan", "591": "Panama", "604": "Peru",
  "608": "Philippines", "616": "Poland", "620": "Portugal", "634": "Qatar",
  "642": "Romania", "643": "Russia", "646": "Rwanda", "682": "Saudi Arabia",
  "686": "Senegal", "694": "Sierra Leone", "703": "Slovakia", "705": "Slovenia",
  "706": "Somalia", "710": "South Africa", "724": "Spain", "729": "Sudan",
  "752": "Sweden", "756": "Switzerland", "760": "Syria", "764": "Thailand",
  "788": "Tunisia", "792": "Turkey", "800": "Uganda", "804": "Ukraine",
  "784": "UAE", "818": "Egypt", "826": "United Kingdom", "840": "United States",
  "858": "Uruguay", "860": "Uzbekistan", "862": "Venezuela", "704": "Vietnam",
  "887": "Yemen", "894": "Zambia", "716": "Zimbabwe",
};

export const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
};

export const conflictsByDeaths: ConflictRecord[] = [
  {
    rank: 1, name: "Syrian Civil War", country: "Syria", deaths: "310,000+",
    side1: "Syrian Government, Russia, Iran, Hezbollah",
    side2: "Syrian Opposition, HTS, ISIS, SDF",
    cause: "Political uprising, sectarian and ethnic tensions, regional proxy intervention",
    period: "Mar 2011 - present", lat: 34.8, lon: 38.9,
  },
  {
    rank: 2, name: "Tigray War", country: "Ethiopia", deaths: "300,000+",
    side1: "Ethiopian Federal Government, Eritrea",
    side2: "Tigray People's Liberation Front (TPLF)",
    cause: "Political marginalization, ethnic conflict, federal power struggle",
    period: "Nov 2020 - Nov 2022", lat: 13.5, lon: 39.5,
  },
  {
    rank: 3, name: "Russia-Ukraine War", country: "Ukraine", deaths: "250,000+",
    side1: "Russia",
    side2: "Ukraine, NATO-backed support",
    cause: "Full-scale invasion, territorial expansion, NATO enlargement dispute",
    period: "Feb 2022 - present", lat: 49.0, lon: 31.5,
  },
  {
    rank: 4, name: "Yemen Civil War", country: "Yemen", deaths: "150,000+",
    side1: "Houthi Movement (Ansar Allah), Iran",
    side2: "Saudi-led Coalition, Yemeni Government",
    cause: "Houthi insurgency, sectarian tensions, regional proxy war",
    period: "Mar 2015 - present", lat: 15.5, lon: 47.5,
  },
  {
    rank: 5, name: "Sudan Civil War", country: "Sudan", deaths: "150,000+",
    side1: "Sudanese Armed Forces (SAF)",
    side2: "Rapid Support Forces (RSF)",
    cause: "Military power struggle after 2021 coup; collapse of Khartoum",
    period: "Apr 2023 - present", lat: 15.6, lon: 32.5,
  },
  {
    rank: 6, name: "Afghanistan Conflict", country: "Afghanistan", deaths: "100,000+",
    side1: "Taliban, IS-K",
    side2: "Afghan National Forces, US-led Coalition (pre-2021), NRF",
    cause: "Islamist insurgency, Taliban reconquest after US withdrawal in Aug 2021",
    period: "2001 - present", lat: 33.9, lon: 67.7,
  },
  {
    rank: 7, name: "Israeli-Palestinian War (Gaza)", country: "Palestine / Israel", deaths: "55,000+",
    side1: "Israel Defense Forces (IDF)",
    side2: "Hamas, Palestinian Islamic Jihad, other armed factions",
    cause: "Hamas attack of Oct 7, 2023; Israeli military response in Gaza Strip",
    period: "Oct 2023 - present", lat: 31.4, lon: 34.4,
  },
  {
    rank: 8, name: "Iraqi Civil War (ISIS)", country: "Iraq", deaths: "67,000+",
    side1: "Iraqi Forces, Kurdish Peshmerga, US Coalition, Iran-backed PMF",
    side2: "Islamic State (ISIS/ISIL)",
    cause: "Power vacuum post-2003, sectarian tensions, Sunni marginalization",
    period: "2013 - 2017", lat: 33.2, lon: 43.7,
  },
  {
    rank: 9, name: "Myanmar Civil War", country: "Myanmar", deaths: "50,000+",
    side1: "Myanmar Military (Tatmadaw)",
    side2: "People's Defence Force (PDF), Three Brotherhood Alliance, EAOs",
    cause: "Military coup 2021, democratic resistance, ethnic autonomy",
    period: "Feb 2021 - present", lat: 19.7, lon: 96.1,
  },
  {
    rank: 10, name: "Nigerian Islamist Insurgency", country: "Nigeria", deaths: "50,000+",
    side1: "Nigerian Military, Multinational Joint Task Force",
    side2: "Boko Haram, ISWAP",
    cause: "Islamist insurgency, poverty, religious extremism in the northeast",
    period: "2009 - present", lat: 12.0, lon: 13.0,
  },
];

export const conflictsByEconomicLoss: ConflictRecord[] = [
  {
    rank: 1, name: "Russia-Ukraine War", country: "Ukraine",
    deaths: "250,000+", gdpDrop: "-29.1% (2022); +3.5% (2024)", economicLoss: "~$1T cumulative",
    side1: "Russia", side2: "Ukraine",
    cause: "Full-scale invasion, infrastructure destruction, sanctions on Russia",
    period: "Feb 2022 - present", lat: 49.0, lon: 31.5,
  },
  {
    rank: 2, name: "Syrian Civil War", country: "Syria",
    deaths: "310,000+", gdpDrop: "~-60% cumulative (2011-2023)", economicLoss: "~$500B cumulative",
    side1: "Syrian Government + allies", side2: "Rebel groups, ISIS",
    cause: "Infrastructure destruction, sanctions, capital flight, brain drain",
    period: "Mar 2011 - present", lat: 34.8, lon: 38.9,
  },
  {
    rank: 3, name: "Venezuelan Political Crisis", country: "Venezuela",
    deaths: "5,000+", gdpDrop: "-35% cumulative (2014-2021)", economicLoss: "~$350B cumulative",
    side1: "Maduro Government", side2: "Opposition, US sanctions coalition",
    cause: "Political instability, economic mismanagement, US sanctions, oil collapse",
    period: "2013 - present", lat: 6.4, lon: -66.6,
  },
  {
    rank: 4, name: "Israeli-Palestinian War (Gaza)", country: "Palestine",
    deaths: "55,000+", gdpDrop: "-85%+ (Gaza, 2024)", economicLoss: "~$50B+ (Gaza reconstruction est.)",
    side1: "Israel Defense Forces (IDF)", side2: "Hamas, armed factions",
    cause: "Hamas Oct 7 attack; Israeli military campaign; near-total destruction of Gaza",
    period: "Oct 2023 - present", lat: 31.4, lon: 34.4,
  },
  {
    rank: 5, name: "Sudan Civil War", country: "Sudan",
    deaths: "150,000+", gdpDrop: "-20.3% (2024)", economicLoss: "~$120B cumulative",
    side1: "Sudanese Armed Forces (SAF)", side2: "Rapid Support Forces (RSF)",
    cause: "Military power struggle; collapse of banking and agriculture; 10M+ displaced",
    period: "Apr 2023 - present", lat: 15.6, lon: 32.5,
  },
  {
    rank: 6, name: "Libyan Civil War", country: "Libya",
    deaths: "18,000+", gdpDrop: "-62.1% (2011), cyclical", economicLoss: "~$200B cumulative",
    side1: "Government of National Unity (GNU)", side2: "Libyan National Army (LNA)",
    cause: "Post-Gaddafi power vacuum, tribal conflict, oil field blockades",
    period: "2011 - present", lat: 26.3, lon: 17.2,
  },
  {
    rank: 7, name: "Yemen Civil War", country: "Yemen",
    deaths: "150,000+", gdpDrop: "~-50% cumulative (2015-2023)", economicLoss: "~$150B cumulative",
    side1: "Houthi Movement (Ansar Allah)", side2: "Saudi-led Coalition",
    cause: "Houthi blockade of ports; destruction of oil infrastructure; currency collapse",
    period: "Mar 2015 - present", lat: 15.5, lon: 47.5,
  },
  {
    rank: 8, name: "Afghanistan Conflict", country: "Afghanistan",
    deaths: "100,000+", gdpDrop: "-20.7% (2021)", economicLoss: "~$95B cumulative",
    side1: "Taliban, IS-K", side2: "US-led Coalition, Afghan national forces",
    cause: "Taliban reconquest; $7B frozen reserves; collapse of aid and banking",
    period: "2001 - present", lat: 33.9, lon: 67.7,
  },
  {
    rank: 9, name: "Lebanese Collapse", country: "Lebanon",
    deaths: "N/A", gdpDrop: "-25.9% (2020); partial recovery 2024", economicLoss: "~$80B cumulative",
    side1: "Political factions, Hezbollah", side2: "Lebanese civil society, IMF",
    cause: "Political dysfunction, Hezbollah-state nexus, Beirut explosion, 2024 Israel-Hezbollah war",
    period: "2019 - present", lat: 33.9, lon: 35.9,
  },
  {
    rank: 10, name: "Myanmar Civil War", country: "Myanmar",
    deaths: "50,000+", gdpDrop: "-18.0% (2021); stagnation since", economicLoss: "~$45B cumulative",
    side1: "Myanmar Military (Tatmadaw)", side2: "People's Defence Force, EAOs",
    cause: "Junta losing territory to ethnic alliances; investor flight; Western sanctions",
    period: "Feb 2021 - present", lat: 19.7, lon: 96.1,
  },
];

// Trade flows: 2023 vs 2024
export const tradeFlows: TradeFlow[] = [
  // Russia wheat exports (record highs despite war)
  {
    id: "rus-tur-wheat", fromLabel: "Russia", toLabel: "Turkey",
    fromCoords: [37.6, 55.8], toCoords: [32.9, 39.9],
    commodity: "Wheat", volume2023: 11.5, volume2024: 12.8, unit: "Mt", color: "#dfa92a", conflictRank: 1,
  },
  {
    id: "rus-egy-wheat", fromLabel: "Russia", toLabel: "Egypt",
    fromCoords: [37.6, 55.8], toCoords: [31.2, 30.1],
    commodity: "Wheat", volume2023: 8.2, volume2024: 9.1, unit: "Mt", color: "#dfa92a", conflictRank: 1,
  },
  {
    id: "rus-ind-wheat", fromLabel: "Russia", toLabel: "India",
    fromCoords: [37.6, 55.8], toCoords: [78.9, 20.6],
    commodity: "Wheat", volume2023: 1.6, volume2024: 2.2, unit: "Mt", color: "#dfa92a", conflictRank: 1,
  },
  // Russia natural gas to Europe (near zero)
  {
    id: "rus-deu-gas", fromLabel: "Russia", toLabel: "Germany",
    fromCoords: [37.6, 55.8], toCoords: [13.4, 52.5],
    commodity: "Natural Gas", volume2023: 8.0, volume2024: 4.2, unit: "bcm", color: "#4488ff", conflictRank: 1,
  },
  {
    id: "rus-ita-gas", fromLabel: "Russia", toLabel: "Italy",
    fromCoords: [37.6, 55.8], toCoords: [12.5, 41.9],
    commodity: "Natural Gas", volume2023: 5.2, volume2024: 3.8, unit: "bcm", color: "#4488ff", conflictRank: 1,
  },
  // Russia crude oil - redirected to Asia
  {
    id: "rus-chn-oil", fromLabel: "Russia", toLabel: "China",
    fromCoords: [37.6, 55.8], toCoords: [116.4, 39.9],
    commodity: "Crude Oil", volume2023: 107.0, volume2024: 113.0, unit: "Mt", color: "#e879f9", conflictRank: 1,
  },
  {
    id: "rus-ind-oil", fromLabel: "Russia", toLabel: "India",
    fromCoords: [37.6, 55.8], toCoords: [78.9, 20.6],
    commodity: "Crude Oil", volume2023: 86.0, volume2024: 100.0, unit: "Mt", color: "#e879f9", conflictRank: 1,
  },
  // Ukraine grain exports (recovering via alternative routes)
  {
    id: "ukr-egy-grain", fromLabel: "Ukraine", toLabel: "Egypt",
    fromCoords: [30.5, 50.5], toCoords: [31.2, 30.1],
    commodity: "Grain", volume2023: 4.8, volume2024: 6.2, unit: "Mt", color: "#22c55e", conflictRank: 1,
  },
  {
    id: "ukr-chn-grain", fromLabel: "Ukraine", toLabel: "China",
    fromCoords: [30.5, 50.5], toCoords: [116.4, 39.9],
    commodity: "Grain", volume2023: 5.2, volume2024: 7.0, unit: "Mt", color: "#22c55e", conflictRank: 1,
  },
  {
    id: "ukr-ind-grain", fromLabel: "Ukraine", toLabel: "India",
    fromCoords: [30.5, 50.5], toCoords: [78.9, 20.6],
    commodity: "Grain", volume2023: 1.4, volume2024: 2.1, unit: "Mt", color: "#22c55e", conflictRank: 1,
  },
  // Libya oil
  {
    id: "lby-ita-oil", fromLabel: "Libya", toLabel: "Italy",
    fromCoords: [17.2, 26.3], toCoords: [12.5, 41.9],
    commodity: "Crude Oil", volume2023: 9.2, volume2024: 11.4, unit: "Mt", color: "#fb923c", conflictRank: 6,
  },
  // Venezuela oil
  {
    id: "ven-usa-oil", fromLabel: "Venezuela", toLabel: "USA",
    fromCoords: [-66.6, 6.4], toCoords: [-95.7, 29.8],
    commodity: "Crude Oil", volume2023: 2.8, volume2024: 3.2, unit: "Mt", color: "#fb923c", conflictRank: 3,
  },
];

export const unstableCountriesIndex: UnstableCountry[] = [
  {
    country: "Afghanistan", flag: "🇦🇫", score: -2.82,
    situation: "Taliban rule since 2021; IS-K attacks ongoing; $7B reserves frozen; economy near-total collapse",
    detail: "Afghanistan is a landlocked country in Central Asia, shaped by the Hindu Kush and the ancient Silk Road routes. Under Taliban rule, women’s education and labor participation are heavily restricted, while groups such as IS-K continue to threaten security. The Bamiyan Buddhas and the birthplace of Rumi make it a country of major cultural and historical significance.",
  },
  {
    country: "Palestine (Gaza)", flag: "🇵🇸", score: -2.85,
    situation: "Gaza destroyed in Israeli military campaign (Oct 2023-present); 55,000+ killed; 85% displaced; famine",
    detail: "Gaza is a small coastal territory in Western Asia, under blockade by Israel and Egypt. The October 2023 Hamas attack triggered a sharp escalation between Israeli forces and Hamas, producing mass displacement and a severe humanitarian crisis. Gaza has long been a hub of trade and maritime exchange, with deep Islamic and historical urban heritage.",
  },
  {
    country: "Syria", flag: "🇸🇾", score: -2.68,
    situation: "Assad government fell Dec 2024; HTS and factions control territory; 13+ years of war, economy collapsed",
    detail: "Syria sits at the eastern edge of the Mediterranean and on the crossroads of ancient trade routes linking North Africa and the Middle East. A civil war that began with Assad’s repression of protests continues amid rivalries among HTS and other armed factions, leaving reconstruction highly uncertain. Damascus and Palmyra are among the country’s most important ancient cities, and its religious and ethnic diversity is exceptionally high.",
  },
  {
    country: "Somalia", flag: "🇸🇴", score: -2.62,
    situation: "Al-Shabaab controls large rural areas; federal government fragile; 34+ years without stable central governance",
    detail: "Somalia sits on the Horn of Africa, facing the Indian Ocean and Arabian Sea trade routes. Al-Shabaab fights the federal government and controls large areas of territory, weakening state authority and security. Mogadishu is an ancient maritime trading city, and Somali culture is rich in oral tradition and regional commerce.",
  },
  {
    country: "Sudan", flag: "🇸🇩", score: -2.52,
    situation: "Civil war since Apr 2023 between SAF and RSF; Khartoum destroyed; 10M+ displaced; famine declared 2024",
    detail: "Sudan is located in northeastern Africa on the boundary between the Nile and the Sahel. The SAF and RSF military conflict has split the country, destroying Khartoum and triggering mass displacement. It is also the site of ancient Nubian civilization and one of the world’s greatest concentrations of pyramids.",
  },
  {
    country: "Yemen", flag: "🇾🇪", score: -2.55,
    situation: "Houthi attacks on Red Sea shipping since 2023; Saudi ceasefire fragile; catastrophic humanitarian crisis ongoing",
    detail: "Yemen is located at the southern edge of the Arabian Peninsula, controlling strategic access to the Red Sea and Gulf of Aden. The Houthis and a Saudi-led coalition remain in conflict, with attacks on Red Sea shipping affecting global trade. Shibam’s towering mud-brick city and Socotra Island’s dragon blood trees make it geologically and culturally distinctive.",
  },
  {
    country: "Pakistan", flag: "🇵🇰", score: -2.38,
    situation: "TTP attacks at 10-year high; Imran Khan imprisoned; civil-military tensions; IMF dependency; economic fragility",
    detail: "Pakistan lies in South Asia and borders both India and Afghanistan. Ongoing conflict with the TTP and tensions between civilian government and the military have weakened political stability and economic resilience. Its geography includes the Karakoram Highway and the ancient Indus Valley site of Mohenjo-daro, alongside some of the world’s highest peaks.",
  },
  {
    country: "Haiti", flag: "🇭🇹", score: -2.48,
    situation: "Gang syndicates control 80% of Port-au-Prince; Kenyan MSS mission overwhelmed; GDP fell 5.5% in 2024",
    detail: "Haiti is on the island of Hispaniola in the Caribbean and has a distinctive history as a Black republic founded after a successful slave revolt. Gangs and security forces now contest control of Port-au-Prince, leaving the state severely weakened. The Citadelle Laferrière and Vodou traditions make it a country of major historical and cultural importance.",
  },
  {
    country: "DR Congo", flag: "🇨🇩", score: -2.28,
    situation: "M23 captured Goma (Jan 2025) with Rwandan backing; 7M+ displaced; 100+ armed groups in the east",
    detail: "The Democratic Republic of the Congo is in Central Africa and contains the vast Congo River basin. East of the country, M23 and other armed groups continue fighting the government and Rwanda-backed forces, displacing millions. It holds some of the world’s largest cobalt reserves, while the Congo River and Virunga National Park make it exceptionally important for biodiversity and geography.",
  },
  {
    country: "Libya", flag: "🇱🇾", score: -1.92,
    situation: "Split between GNU (Tripoli) and LNA (east); Russian Wagner/Turkish proxies active; oil blockades cyclical",
    detail: "Libya is in North Africa at the intersection of the Mediterranean and the Sahara. The Government of National Unity and the eastern Libyan National Army remain in conflict, while external actors such as Russia and Turkey deepen the proxy dynamics. Its Roman ruins at Leptis Magna and its oil wealth make it strategically important, but weak governance has left the country fragmented.",
  },
  {
    country: "Myanmar", flag: "🇲🇲", score: -2.08,
    situation: "Tatmadaw controls under 50% of territory; Three Brotherhood Alliance seized major towns in 2024; 3.4M displaced",
    detail: "Myanmar lies in Southeast Asia and is shaped by major rivers and mountain ranges. Democratic forces and ethnic armed groups continue to fight the military, leaving much of the country in conflict. Bagan’s temple complex and the country’s ethnic diversity make it one of the region’s most culturally significant states.",
  },
  {
    country: "Venezuela", flag: "🇻🇪", score: -1.88,
    situation: "Maduro stole July 2024 election; 7.7M refugees fled; GDP contracted 75% since 2013; opposition leaders arrested",
    detail: "Venezuela's collapse from the wealthiest country in South America (1970s oil boom) to a humanitarian catastrophe is one of modern history's most dramatic economic implosions: under Hugo Chavez (1999-2013) and Nicolas Maduro (2013-present), the government nationalized industries, imposed price controls, and when oil prices crashed in 2014, the economy entered a death spiral that shrunk GDP by 75% between 2013 and 2021 — a contraction deeper than the United States experienced during the Great Depression over the same timeframe, and achieved without any war or natural disaster. In the July 2024 presidential election, opposition candidate Edmundo Gonzalez won a documented majority according to voting tallies collected by opposition witnesses from across the country; Maduro nonetheless declared himself the winner, triggering international condemnation, mass protests, 25+ killed demonstrators, and over 2,000 arrests. Venezuela now hosts 7.7 million refugees and migrants — the largest displacement crisis in Latin American history, surpassing even the Syrian crisis in absolute numbers, with Venezuelans crossing the deadly Darien Gap jungle at rates comparable to wartime refugee flows just to reach the US. Venezuela sits atop the world's largest proven oil reserves (300 billion barrels), yet infrastructure has so deteriorated that the country regularly suffers blackouts, water shortages, and medical supply collapses; per-capita income has fallen below $3,000, compared to over $15,000 in neighboring Brazil. Venezuela is predominantly Catholic (71%), Spanish-speaking, and possesses extraordinary natural beauty: Angel Falls (world's highest uninterrupted waterfall), the tepui plateaus that inspired Arthur Conan Doyle's 'The Lost World,' and Los Roques coral archipelago. Venezuela produced liberator Simon Bolivar (who freed six South American nations), baseball legends Miguel Cabrera and Johan Santana, and holds the record for the most Miss Universe titles of any country.",
  },
  {
    country: "Lebanon", flag: "🇱🇧", score: -1.88,
    situation: "Israel-Hezbollah war Oct-Nov 2024 destroyed south Lebanon; new president elected Jan 2025; IMF deal pending",
    detail: "Lebanon is on the eastern Mediterranean coast in Western Asia and is often seen as a crossroads of Middle Eastern culture. Ongoing conflict between Hezbollah and Israel, combined with political fragmentation and financial collapse, has weakened the state. Beirut remains a historic trading city known for literature, cuisine, and regional cultural influence.",
  },
  {
    country: "Nigeria", flag: "🇳🇬", score: -1.55,
    situation: "Boko Haram/ISWAP insurgency in northeast; farmer-herder violence; Naira collapsed 70% in 2023-2024",
    detail: "Nigeria is in West Africa and is Africa’s most populous country with one of its largest economies. Boko Haram and ISWAP continue to fight the state in the northeast, while farmer-herder conflict remains a serious rural security problem. Lagos is the country’s economic and cultural center, driving major growth in film, music, and business.",
  },
  {
    country: "Niger", flag: "🇳🇪", score: -1.65,
    situation: "Military coup Jul 2023; Wagner Group arrived; French military expelled; uranium exports disrupted; coup belt",
    detail: "Niger is in the Sahel region of West Africa and is rich in uranium and other mineral resources. After a military coup in 2023, ties with France and the West weakened as Wagner-linked influence and regional jihadist groups expanded. It sits on historic trans-Saharan trade routes and is home to Tuareg culture and important desert heritage sites.",
  },
];
