export interface SyriaOilTradeChange {
  countryId: string;
  countryName: string;
  crudeBefore: number | null;
  crudeAfter: number | null;
  petroleumBefore: number | null;
  petroleumAfter: number | null;
}

// UN Comtrade mirror imports from Syria, HS 2709 and HS 2710, 2010 vs 2012.
// Values are partner-reported import values in current US dollars, not Syria-reported exports.
export const SYRIA_OIL_TRADE_CHANGES: SyriaOilTradeChange[] = [
  { countryId: "12", countryName: "Algeria", crudeBefore: null, crudeAfter: null, petroleumBefore: 1035426, petroleumAfter: 687888 },
  { countryId: "48", countryName: "Bahrain", crudeBefore: null, crudeAfter: null, petroleumBefore: 1003, petroleumAfter: 431 },
  { countryId: "156", countryName: "China", crudeBefore: 1007, crudeAfter: 4339, petroleumBefore: null, petroleumAfter: null },
  { countryId: "384", countryName: "Cote d'Ivoire", crudeBefore: null, crudeAfter: null, petroleumBefore: 392683, petroleumAfter: 291076 },
  { countryId: "288", countryName: "Ghana", crudeBefore: null, crudeAfter: null, petroleumBefore: 82068, petroleumAfter: 280 },
  { countryId: "356", countryName: "India", crudeBefore: 58264296, crudeAfter: 137587281, petroleumBefore: null, petroleumAfter: 42049 },
  { countryId: "400", countryName: "Jordan", crudeBefore: null, crudeAfter: null, petroleumBefore: 111948, petroleumAfter: 23687 },
  { countryId: "422", countryName: "Lebanon", crudeBefore: null, crudeAfter: null, petroleumBefore: 1428368, petroleumAfter: 1369197 },
  { countryId: "642", countryName: "Romania", crudeBefore: null, crudeAfter: null, petroleumBefore: 50, petroleumAfter: 30 },
  { countryId: "729", countryName: "Sudan", crudeBefore: null, crudeAfter: null, petroleumBefore: 2526584, petroleumAfter: 64366 },
  { countryId: "784", countryName: "United Arab Emirates", crudeBefore: null, crudeAfter: null, petroleumBefore: 112260, petroleumAfter: 214449 },
  { countryId: "792", countryName: "Türkiye", crudeBefore: null, crudeAfter: null, petroleumBefore: 89961568, petroleumAfter: 38115 },
];
