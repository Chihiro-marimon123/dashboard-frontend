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
    detail: "Afghanistan is a landlocked country in Central Asia known for its dramatic Hindu Kush mountains, ancient Silk Road cities like Herat and Balkh, and the historic Bamiyan Buddhas (destroyed by the Taliban in 2001). Since the Taliban's return to power in August 2021 following the US withdrawal, approximately 40 million Afghans live under a regime that has eliminated women's rights: girls are banned from education beyond 6th grade, women cannot work in most sectors, and women are prohibited from leaving home without a male guardian — policies with no parallel in any OECD country, where female university enrollment typically exceeds male enrollment. Afghanistan's GDP fell 20.7% in 2021 alone, over $7 billion in foreign reserves remain frozen by the US, and more than 90% of Afghans live below the poverty line — compared to roughly 11% in the United States. The root causes stretch back decades: the Soviet invasion of 1979, a decade of civil war, the US-led occupation from 2001, and the fundamental failure to build governing institutions beyond warlord and tribal networks. Afghanistan is predominantly Sunni Muslim (~85%) with significant Shia Hazara and Ismaili minorities; Dari and Pashto are the official languages. The country produced the 13th-century poet Rumi (born in Balkh), and Ahmad Shah Massoud, the resistance commander assassinated by Al-Qaeda one day before 9/11, remains a national hero.",
  },
  {
    country: "Palestine (Gaza)", flag: "🇵🇸", score: -2.85,
    situation: "Gaza destroyed in Israeli military campaign (Oct 2023-present); 55,000+ killed; 85% displaced; famine",
    detail: "The Gaza Strip, a 365 sq km territory (smaller than Detroit), has been under Israeli-Egyptian blockade since Hamas took control in 2007; its 2.3 million residents had already lived with 47% unemployment and restrictions on movement before the war began. Following Hamas's October 7, 2023 attack that killed approximately 1,200 Israelis in the deadliest attack on Jewish people since the Holocaust, Israel launched a military campaign that has killed over 55,000 Palestinians by 2024 (per Gaza Health Ministry), with over 85% of the population displaced at least once. Gaza's GDP contracted an estimated 85% in 2024 — a collapse so severe that economists struggle to find historical parallels; for reference, even the United States' Great Depression involved a 27% GDP contraction spread over four years. Before the war, Gaza had a literacy rate of 97% and universities; today, every university has been damaged or destroyed, and an estimated 625,000 students have had their education interrupted. Gaza is nearly 100% Muslim (Sunni) and Arabic-speaking, and was historically one of the world's oldest continuously inhabited coastal cities, with archaeological layers dating to 3300 BCE; the Philistine city of Gaza is mentioned in the Bible and the Quran. Notable Gazans include Yasser Arafat (born Gaza City) and the poet Mahmoud Darwish, whose verse became the anthem of Palestinian identity.",
  },
  {
    country: "Syria", flag: "🇸🇾", score: -2.68,
    situation: "Assad government fell Dec 2024; HTS and factions control territory; 13+ years of war, economy collapsed",
    detail: "Syria's civil war began in March 2011 when the Assad government violently suppressed peaceful protests inspired by the Arab Spring, transforming demonstrations for political reform into a 13-year conflict; after decades of Assad family dictatorship, the government collapsed in December 2024 when HTS-led forces captured Damascus in a rapid offensive, ending 54 years of Assad rule. Over 310,000 people have been killed in battle-related deaths, and roughly 13 million Syrians — more than half the pre-war population — have been displaced internally or abroad, creating one of the largest refugee crises since World War II. Syria's GDP has contracted approximately 60% since 2011, and the Syrian pound lost over 99% of its value; in comparison, even wartime Germany's economy contracted by roughly 20% annually during World War II — Syria's sustained multi-decade economic destruction is nearly unprecedented in modern history. Before the war, Syria was a middle-income country with near-universal primary education, 90%+ literacy for both genders, and a significant middle class in Damascus and Aleppo. Syria is predominantly Sunni Muslim (~65%), with Alawi, Christian, Druze, and Kurdish minorities; Arabic is the official language, and the country is home to Damascus (one of the world's oldest continuously inhabited cities) and Palmyra (UNESCO). Notable Syrians include Philip the Arab (Roman Emperor, 244-249 CE), the medieval philosopher Al-Farabi, and Apple founder Steve Jobs, whose biological father was Syrian.",
  },
  {
    country: "Somalia", flag: "🇸🇴", score: -2.62,
    situation: "Al-Shabaab controls large rural areas; federal government fragile; 34+ years without stable central governance",
    detail: "Somalia has not had a functioning central government since 1991, when the Siad Barre regime collapsed under clan-based militia warfare — making it one of the world's longest-running state failures, now entering its 34th consecutive year of fragmentation. Al-Shabaab, affiliated with Al-Qaeda, controls large swaths of rural southern Somalia and conducts regular bombings in Mogadishu; despite the AU Transition Mission, the group remains capable of complex attacks and governs territory through a brutal mix of taxation, courts, and executions. Somalia's Human Development Index of 0.285 ranks among the world's ten lowest: a Somali child born today has a 1-in-8 chance of dying before age 5, compared to 1-in-270 in Norway, and female literacy stands at roughly 25% compared to 99% in high-income countries. Remarkably, Somaliland in the northwest has maintained a functioning democratic government and peaceful elections since 1991, completely independently — a proof that stability is possible in the region but requires the right local conditions and institutions. Somalia is 99% Sunni Muslim and Somali-speaking (a Cushitic language with a rich oral poetry and literature tradition); Mogadishu was a thriving Indian Ocean trade city visited by the explorer Ibn Battuta in 1331, and the ancient city of Zeila was one of the first cities in sub-Saharan Africa to adopt Islam. Notable Somalis include Olympic champion Sir Mo Farah (born Mogadishu) and K'naan, the musician whose song 'Wavin' Flag' became the anthem of the 2010 FIFA World Cup.",
  },
  {
    country: "Sudan", flag: "🇸🇩", score: -2.52,
    situation: "Civil war since Apr 2023 between SAF and RSF; Khartoum destroyed; 10M+ displaced; famine declared 2024",
    detail: "Sudan's civil war erupted in April 2023 when two military factions that had jointly staged a coup in 2021 — the Sudanese Armed Forces (SAF) and the Rapid Support Forces (RSF) — turned their guns on each other in a brutal power struggle, transforming Khartoum, a capital of 6 million, into a war zone and triggering the world's largest displacement crisis. The RSF has been accused of systematic ethnic atrocities in Darfur, echoing the genocide of 2003-2010 that killed 300,000+; by mid-2024, the UN declared famine conditions affecting 25 million people — a hunger crisis not seen in the region since the 1984 Ethiopian famine that shocked the world. Sudan's GDP contracted 20.3% in 2024 — for comparison, the United States' worst modern recession (2008-09) saw GDP shrink by only 2.8%, and that was considered catastrophic; Sudan's collapse is roughly ten times deeper. Ancient Sudan (Nubia/Kush) was one of Africa's greatest civilizations, predating much of Egypt's history: Sudan has over 255 pyramids — more than Egypt — and the city of Meroe was a major iron-smelting center of the ancient world. Sudan is predominantly Sunni Muslim (~95%) with 500+ ethnic groups and languages; Arabic is official, but Nubian, Beja, Fur, and dozens of other languages reflect incredible linguistic diversity. Notable Sudanese include NBA legend Manute Bol (one of the tallest players in NBA history at 7'7 ft) and the artist El Anatsui, who was educated in Ghana but whose Pan-African roots include Sudanese heritage.",
  },
  {
    country: "Yemen", flag: "🇾🇪", score: -2.55,
    situation: "Houthi attacks on Red Sea shipping since 2023; Saudi ceasefire fragile; catastrophic humanitarian crisis ongoing",
    detail: "Yemen's civil war began in 2015 when the Iran-backed Houthi movement (Ansar Allah) seized the capital Sana'a and Saudi Arabia launched a military intervention; the conflict has killed over 150,000 people in battle and an estimated 380,000 in total when counting famine and disease — making it one of the deadliest wars of the 21st century. Since October 2023, the Houthis have attacked over 100 commercial ships in the Red Sea and Gulf of Aden, disrupting roughly 15% of global maritime trade and causing a 200-400% spike in shipping costs that has raised prices for consumers worldwide — a single regional conflict directly affecting grocery bills from Tokyo to London. In pre-war Yemen, the gender gap in primary school enrollment was 35 percentage points (85% for boys, 50% for girls); in OECD countries this gap is typically less than 2%, and today in Houthi-controlled areas schooling has largely collapsed with 2+ million children out of school entirely. Yemen's GDP per capita of roughly $600 means an average Yemeni earns in a year what an average American earns in about a week, illustrating the structural poverty that both causes and deepens conflict. Yemen is predominantly Muslim (Sunni ~65%, Zaydi Shia ~35%), Arabic-speaking, and was historically home to the legendary Queen of Sheba's Sabaean kingdom; Socotra Island — a UNESCO site with dragon blood trees and species found nowhere else on Earth — is one of the world's most unique ecosystems. Yemen's medieval architecture, particularly the towering earthen skyscrapers of Shibam (nicknamed the 'Manhattan of the desert'), represents one of humanity's most extraordinary urban traditions.",
  },
  {
    country: "Pakistan", flag: "🇵🇰", score: -2.38,
    situation: "TTP attacks at 10-year high; Imran Khan imprisoned; civil-military tensions; IMF dependency; economic fragility",
    detail: "Pakistan's political instability stems from a structural power imbalance between elected civilian governments and the military establishment, which has staged four direct coups (1958, 1969, 1977, 1999) and has covertly steered politics even during civilian periods — a dynamic that has prevented consistent economic policy and institutional development for 77 years since independence. Former Prime Minister Imran Khan, who won a landslide election in 2018, was arrested in May 2023 on charges widely seen as politically motivated, imprisoned as of 2025, and his PTI party won the most seats in the February 2024 election but was blocked from forming a government; simultaneously, the Tehrik-i-Taliban Pakistan (TTP) killed 1,500+ security personnel in 2023-24, making terrorism deaths higher than at any point since the 2014 Army Public School massacre. Female literacy in Pakistan stands at 49% nationally — but drops below 20% in tribal areas of Khyber Pakhtunkhwa — compared to 99% in neighboring India's most developed states and essentially 100% in South Korea, a country with similar per-capita income to Pakistan in 1960 that chose a different development path. Pakistan is 97% Muslim (77% Sunni, 20% Shia — one of the world's largest Shia populations) with six major languages; Urdu is official but Punjabi, Sindhi, Pashto, and Balochi are spoken by most Pakistanis at home, reflecting extraordinary cultural diversity. The country hosts K2 (second highest mountain), Mohenjo-daro (3,000-year-old Indus Valley civilization), Lahore's magnificent Mughal architecture, and the Karakoram Highway — one of the most spectacular roads on Earth. Pakistan produced Nobel laureate Abdus Salam (Physics, 1979), singer Nusrat Fateh Ali Khan whose qawwali music influenced global musicians, and cricket legend Imran Khan himself.",
  },
  {
    country: "Haiti", flag: "🇭🇹", score: -2.48,
    situation: "Gang syndicates control 80% of Port-au-Prince; Kenyan MSS mission overwhelmed; GDP fell 5.5% in 2024",
    detail: "Haiti became the world's first Black republic and first successful slave revolution when it declared independence from France in 1804 — an act so threatening to colonial powers that France imposed reparations equivalent to $21 billion in today's money, which Haiti continued paying until 1947, effectively transferring generations of wealth that could have built schools, hospitals, and infrastructure to the former colonial power. Today, gang syndicates led by figures like Jimmy 'Barbecue' Cherizier control over 80% of Port-au-Prince following the assassination of President Jovenel Moise in July 2021; the Kenyan-led Multinational Security Support Mission, deployed in 2024, has been overwhelmed and understaffed, and Haiti's GDP contracted 5.5% in 2024. Haiti's GDP per capita of roughly $1,700 is equivalent to what an average American spends on dining out per year; literacy in rural Haiti sits at approximately 60%, compared to 99% in France — the country that extracted billions in reparations while simultaneously imposing an economic and psychological burden that historians increasingly identify as a deliberate impoverishment. Haiti is predominantly Catholic and Protestant Christian (~80%), blended with Vodou spiritual traditions that have been deeply misunderstood and stigmatized by outsiders; French and Haitian Creole are official languages, and the country was home to the Taino indigenous people before European contact. The Citadelle Laferriere fortress — a UNESCO World Heritage Site built after independence — is a masterpiece of military engineering and a symbol of Black sovereignty that stands as one of the Caribbean's most extraordinary historical monuments. Notable Haitians include revolutionary hero Toussaint Louverture, the visionary artist Jean-Michel Basquiat, and musician Wyclef Jean.",
  },
  {
    country: "DR Congo", flag: "🇨🇩", score: -2.28,
    situation: "M23 captured Goma (Jan 2025) with Rwandan backing; 7M+ displaced; 100+ armed groups in the east",
    detail: "The Democratic Republic of Congo's eastern instability traces directly to the 1994 Rwandan genocide, whose aftermath sent 1.2 million refugees — including Hutu perpetrators — into eastern Congo, triggering cycles of regional war that killed an estimated 6 million people between 1996 and 2003 alone, the deadliest conflict since World War II, though it received only a fraction of the media attention. The M23 rebel group, extensively documented as receiving direct military support from Rwanda, captured Goma in January 2025 — a strategic city of 2 million people — while the UN peacekeeping mission (MONUSCO) simultaneously began withdrawing; the DRC now accounts for 7 million of the world's 117 million displaced people, tied with Sudan for the world's largest displacement crisis. Despite possessing over $24 trillion in untapped mineral wealth — including 70% of global cobalt reserves essential for electric vehicle batteries and smartphones — the average Congolese earns $600 per year, a resource curse meaning the devices in consumers' pockets globally depend on minerals extracted under conditions of extreme poverty and conflict; for comparison, Belgium (the DRC's former colonial ruler) has a per-capita income 50x higher. The DRC is 95%+ Christian, with over 200 ethnic groups and languages; Lingala, Swahili, Tshiluba, and Kikongo are major tongues alongside French (official), and Kinshasa is one of Africa's most creative cities, home to Congolese rumba (soukous) that influenced global music. Virunga National Park — home to endangered mountain gorillas — and the Congo River (the world's deepest river and second largest by discharge) are among Africa's most spectacular natural treasures. Notable Congolese include independence hero Patrice Lumumba (assassinated 1961) and NBA Hall of Famer Dikembe Mutombo.",
  },
  {
    country: "Libya", flag: "🇱🇾", score: -1.92,
    situation: "Split between GNU (Tripoli) and LNA (east); Russian Wagner/Turkish proxies active; oil blockades cyclical",
    detail: "Libya's collapse began in 2011 when NATO-backed rebel forces overthrew Muammar Gaddafi after 42 years of rule; without any functioning state institutions to inherit, the country splintered into competing armed militias and has never recovered, becoming a textbook case of how military intervention without a post-war nation-building plan can produce worse outcomes than the dictatorship it replaced. Today Libya is divided between the UN-recognized Government of National Unity in Tripoli and the Libyan National Army led by General Haftar in the east, with Russian Wagner Group, Turkish, Emirati, and Egyptian forces all supporting different factions — a proxy war that has transformed a domestic conflict into a regional chessboard. Libya generates $20-30 billion in oil revenues annually — a per-capita equivalent that approaches Norway's oil wealth — yet 1.3 million Libyans require humanitarian assistance and infrastructure has collapsed, illustrating how resource wealth without governance produces extraction without development. Libya is 97% Sunni Muslim and predominantly Arabic-speaking, with a significant Berber (Amazigh) minority whose indigenous culture and language were suppressed under Gaddafi; the country sits atop some of the finest Roman ruins in the world. Leptis Magna, the birthplace of Roman Emperor Septimius Severus, is a UNESCO World Heritage Site rivaling Pompeii in scale but visited by a tiny fraction of tourists due to insecurity — Libya's instability is costing the world irreplaceable access to ancient history. Libya had the highest Human Development Index in Africa as recently as 2010; today it ranks 104th globally, a fall almost entirely attributable to conflict rather than any natural poverty.",
  },
  {
    country: "Myanmar", flag: "🇲🇲", score: -2.08,
    situation: "Tatmadaw controls under 50% of territory; Three Brotherhood Alliance seized major towns in 2024; 3.4M displaced",
    detail: "Myanmar's civil war escalated after the military (Tatmadaw) staged a coup in February 2021, overthrowing the democratically elected government of Aung San Suu Kyi, who had won a landslide 83% of parliamentary seats in November 2020; the subsequent crackdown killed 3,000+ protesters in the first year and galvanized an armed resistance that allied with longtime ethnic armed organizations across the country. In late 2023, the Three Brotherhood Alliance launched 'Operation 1027,' capturing over 200 military outposts in a single month — the Tatmadaw's worst territorial loss in decades — and by mid-2024, credible estimates suggest the military controls less than 50% of Myanmar's territory, an extraordinary reversal. Before the coup, Myanmar had one of Southeast Asia's fastest-growing economies (6-8% annual growth 2014-2019); today the economy has shrunk 18-20% from peak levels and 3.4 million people are internally displaced — a number larger than the entire population of New Zealand, all displaced within a single country the size of France. Myanmar is predominantly Theravada Buddhist (~88%) with Muslim (4%, including the persecuted Rohingya expelled in 2017), Christian, and Hindu minorities; Burmese is official but 135 recognized ethnic groups each have distinct languages, cultures, and political identities. Bagan — with 2,000+ Buddhist temples and pagodas built between the 9th and 13th centuries — is one of Southeast Asia's most extraordinary archaeological landscapes, rivaling Angkor Wat in its ambition and scale. Notable Myanmar nationals include Aung San Suu Kyi (Nobel Peace Prize 1991, currently imprisoned by the junta she once controversially collaborated with), and the country's jade and ruby mines historically produced the world's finest gemstones.",
  },
  {
    country: "Venezuela", flag: "🇻🇪", score: -1.88,
    situation: "Maduro stole July 2024 election; 7.7M refugees fled; GDP contracted 75% since 2013; opposition leaders arrested",
    detail: "Venezuela's collapse from the wealthiest country in South America (1970s oil boom) to a humanitarian catastrophe is one of modern history's most dramatic economic implosions: under Hugo Chavez (1999-2013) and Nicolas Maduro (2013-present), the government nationalized industries, imposed price controls, and when oil prices crashed in 2014, the economy entered a death spiral that shrunk GDP by 75% between 2013 and 2021 — a contraction deeper than the United States experienced during the Great Depression over the same timeframe, and achieved without any war or natural disaster. In the July 2024 presidential election, opposition candidate Edmundo Gonzalez won a documented majority according to voting tallies collected by opposition witnesses from across the country; Maduro nonetheless declared himself the winner, triggering international condemnation, mass protests, 25+ killed demonstrators, and over 2,000 arrests. Venezuela now hosts 7.7 million refugees and migrants — the largest displacement crisis in Latin American history, surpassing even the Syrian crisis in absolute numbers, with Venezuelans crossing the deadly Darien Gap jungle at rates comparable to wartime refugee flows just to reach the US. Venezuela sits atop the world's largest proven oil reserves (300 billion barrels), yet infrastructure has so deteriorated that the country regularly suffers blackouts, water shortages, and medical supply collapses; per-capita income has fallen below $3,000, compared to over $15,000 in neighboring Brazil. Venezuela is predominantly Catholic (71%), Spanish-speaking, and possesses extraordinary natural beauty: Angel Falls (world's highest uninterrupted waterfall), the tepui plateaus that inspired Arthur Conan Doyle's 'The Lost World,' and Los Roques coral archipelago. Venezuela produced liberator Simon Bolivar (who freed six South American nations), baseball legends Miguel Cabrera and Johan Santana, and holds the record for the most Miss Universe titles of any country.",
  },
  {
    country: "Lebanon", flag: "🇱🇧", score: -1.88,
    situation: "Israel-Hezbollah war Oct-Nov 2024 destroyed south Lebanon; new president elected Jan 2025; IMF deal pending",
    detail: "Lebanon's instability stems from its confessional political system — established in the 1943 National Pact — which allocates all government posts by religious sect, enabling Hezbollah (a Shia militant organization backed by Iran) to operate as a state-within-a-state with 150,000+ missiles, its own intelligence services, and parallel social programs that compete with the Lebanese state for public loyalty. The economy collapsed in 2019 when the banking system's Ponzi-scheme structure was exposed: deposits were frozen, the Lebanese pound lost 98% of its value (from 1,500 to 90,000 per dollar), and over 80% of the population fell below the poverty line — a banking collapse comparable in relative scale to all major US banks failing simultaneously, with no government able to implement reforms due to Hezbollah's veto power. In October-November 2024, Israel and Hezbollah fought their most intense open conflict since 2006, killing 3,500+ Lebanese, destroying entire villages in the south, and displacing 1.2 million people before a ceasefire in November; Lebanon then elected its first president in 26 months in January 2025, ending the world's longest presidential vacancy in a functioning state. Lebanon is one of the most religiously diverse Arab countries, with Maronite, Orthodox, and Catholic Christians (~40%) alongside Sunni, Shia, and Druze Muslims (~60%); Arabic is official but French and English are widely spoken, a legacy of French Mandate rule. Beirut was once called the 'Paris of the Middle East' — a cosmopolitan cultural capital with world-class universities, media, and cuisine — and still punches above its weight in Arab literature, fashion, and gastronomy despite the crisis. Notable Lebanese include poet Khalil Gibran ('The Prophet,' one of the best-selling books of the 20th century), philosopher Nassim Nicholas Taleb, and Carlos Slim (of Lebanese descent), who was the world's wealthiest person in 2010-2013.",
  },
  {
    country: "Nigeria", flag: "🇳🇬", score: -1.55,
    situation: "Boko Haram/ISWAP insurgency in northeast; farmer-herder violence; Naira collapsed 70% in 2023-2024",
    detail: "Nigeria's Boko Haram insurgency began in 2009 in the northeastern state of Borno, rooted in extreme poverty (unemployment exceeding 60% in the northeast), resentment against corrupt local governments, and the charismatic preaching of Mohammed Yusuf, who was extrajudicially killed by police in 2009 — an act that radicalized thousands and turned a fringe movement into a deadly insurgency that has since killed 50,000+ people and displaced 2.5 million. Boko Haram kidnapped 276 Chibok schoolgirls in April 2014, globally publicized with the #BringBackOurGirls campaign; kidnapping of students for ransom has continued across the northwest through 2024-2025, with thousands of children taken, representing a deliberate strategy of attacking education as a symbol of 'Western corruption.' Female school enrollment in Nigeria's conflict-affected northeast averages below 30%, compared to above 90% in southwestern Nigeria and essentially 99% in South Korea — illustrating how within the same national borders, security determines educational access, and how conflict concentrates disadvantage on the most vulnerable. Nigeria is Africa's most populous country (230 million people) and largest economy, with a roughly 50/50 Christian-Muslim split (Christian-dominated south, Muslim-dominated north), 500+ ethnic groups, and English as the official language; Lagos is Africa's largest city and a global hub of Afrobeats music, Nollywood (the world's second-largest film industry by output), and technology startups. Nigeria's Niger Delta contains some of Africa's richest oil reserves, yet decades of corruption and community neglect have made oil wealth a source of grievance rather than development — a parallel to Venezuela's resource curse. Notable Nigerians include Nobel laureate Wole Soyinka, novelist Chinua Achebe ('Things Fall Apart'), Fela Kuti (Afrobeats pioneer), and Burna Boy (Grammy Award winner).",
  },
  {
    country: "Niger", flag: "🇳🇪", score: -1.65,
    situation: "Military coup Jul 2023; Wagner Group arrived; French military expelled; uranium exports disrupted; coup belt",
    detail: "Niger's coup in July 2023, when General Tchiani overthrew President Bazoum (democratically elected just two years prior), shocked Western governments that had considered Niger a key partner in the Sahel's counter-terrorism fight, hosting both US and French military bases critical to monitoring jihadist networks across West Africa. The coup accelerated a regional pattern: Niger, Mali, and Burkina Faso — all formerly French-aligned democracies — now operate under military juntas aligned with Russia's Wagner Group within a span of three years, creating an arc of instability that has expelled French troops, terminated Western security partnerships, and left a security vacuum that Sahel jihadists (JNIM, ISGS) are rapidly filling. Niger is simultaneously uranium-rich (supplying approximately 5% of global uranium, much of it to French nuclear plants that power 70% of France's electricity) and the 10th poorest country on Earth with per-capita GDP of $600 — meaning Nigerien citizens earn in a year what a French nuclear engineer earns in a single week, from uranium extracted beneath their feet. Niger is 99% Sunni Muslim, predominantly Hausa and Zarma-Songhai speaking (French is the official administrative language, a colonial legacy), and is home to the ancient Agadez mosque (UNESCO), the 'W' National Park spanning three countries (UNESCO), and sits along historic trans-Saharan trade routes linking sub-Saharan Africa to the Mediterranean. The Tuareg people — nomadic Berber-descended inhabitants of the Sahara with a distinct Tifinagh script and rich musical tradition — have fought multiple rebellions against governments they view as denying them the benefits of resource extraction from their ancestral lands. Niger's instability is a microcosm of the global competition between Western democratic governance models and Russian military influence, playing out in one of the world's poorest and most strategically significant corridors.",
  },
];
