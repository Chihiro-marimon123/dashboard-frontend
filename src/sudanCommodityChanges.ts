export interface SudanCommodityChange {
  countryId: string;
  countryName: string;
  goldBefore: number | null;
  goldAfter: number | null;
  sesameBefore: number | null;
  sesameAfter: number | null;
}

// UN Comtrade mirror imports from Sudan, HS 7108 gold and HS 120740 sesame seeds.
// Source years: 2022 and 2024. Values are partner-reported current US dollars.
export const SUDAN_COMMODITY_CHANGES: SudanCommodityChange[] = [
  { countryId: "818", countryName: "Egypt", goldBefore: 12480055, goldAfter: 74247162, sesameBefore: 17389621, sesameAfter: 72034590 },
  { countryId: "512", countryName: "Oman", goldBefore: null, goldAfter: null, sesameBefore: 26763430, sesameAfter: 5217508 },
  { countryId: "634", countryName: "Qatar", goldBefore: null, goldAfter: null, sesameBefore: 4196065, sesameAfter: 85166 },
  { countryId: "784", countryName: "United Arab Emirates", goldBefore: 2288234816, goldAfter: 19882717, sesameBefore: null, sesameAfter: null },
  { countryId: "792", countryName: "Türkiye", goldBefore: 2197690, goldAfter: 68456407, sesameBefore: null, sesameAfter: null },
];
