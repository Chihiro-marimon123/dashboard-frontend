export interface VenezuelaOilTradeChange {
  countryId: string;
  countryName: string;
  crudeBefore: number | null;
  crudeAfter: number | null;
  petroleumBefore: number | null;
  petroleumAfter: number | null;
}

// UN Comtrade mirror imports from Venezuela, HS 2709 and HS 2710, 2012 vs 2014.
// Values are partner-reported import values in current US dollars, not Venezuela-reported exports.
export const VENEZUELA_OIL_TRADE_CHANGES: VenezuelaOilTradeChange[] = [
  { countryId: "533", countryName: "Aruba", crudeBefore: null, crudeAfter: null, petroleumBefore: 48832, petroleumAfter: 13235 },
  { countryId: "56", countryName: "Belgium", crudeBefore: 314596548, crudeAfter: 346315435, petroleumBefore: 50484590, petroleumAfter: 13369163 },
  { countryId: "204", countryName: "Benin", crudeBefore: null, crudeAfter: null, petroleumBefore: 19848279, petroleumAfter: 3152455 },
  { countryId: "60", countryName: "Bermuda", crudeBefore: null, crudeAfter: null, petroleumBefore: 29277834, petroleumAfter: 3240 },
  { countryId: "68", countryName: "Bolivia", crudeBefore: null, crudeAfter: null, petroleumBefore: 437507442, petroleumAfter: 699636 },
  { countryId: "76", countryName: "Brazil", crudeBefore: null, crudeAfter: null, petroleumBefore: 501468112, petroleumAfter: 712150670 },
  { countryId: "854", countryName: "Burkina Faso", crudeBefore: null, crudeAfter: null, petroleumBefore: 26801837, petroleumAfter: 49713 },
  { countryId: "124", countryName: "Canada", crudeBefore: 177301213, crudeAfter: null, petroleumBefore: 27775443, petroleumAfter: 2348933 },
  { countryId: "156", countryName: "China", crudeBefore: 10492472800, crudeAfter: 8345378147, petroleumBefore: 3192975554, petroleumAfter: 2617677853 },
  { countryId: "170", countryName: "Colombia", crudeBefore: null, crudeAfter: null, petroleumBefore: 83017358, petroleumAfter: 47152886 },
  { countryId: "214", countryName: "Dominican Republic", crudeBefore: 561031175, crudeAfter: 556397767, petroleumBefore: 577224528, petroleumAfter: 361802414 },
  { countryId: "218", countryName: "Ecuador", crudeBefore: null, crudeAfter: null, petroleumBefore: 130395216, petroleumAfter: 53441 },
  { countryId: "222", countryName: "El Salvador", crudeBefore: null, crudeAfter: null, petroleumBefore: 207423181, petroleumAfter: 172891352 },
  { countryId: "250", countryName: "France", crudeBefore: 72956807, crudeAfter: 401, petroleumBefore: 48219826, petroleumAfter: 37668071 },
  { countryId: "308", countryName: "Grenada", crudeBefore: null, crudeAfter: null, petroleumBefore: 36993940, petroleumAfter: 19083608 },
  { countryId: "320", countryName: "Guatemala", crudeBefore: null, crudeAfter: null, petroleumBefore: 35011962, petroleumAfter: 8111954 },
  { countryId: "328", countryName: "Guyana", crudeBefore: null, crudeAfter: null, petroleumBefore: 333833583, petroleumAfter: 207546853 },
  { countryId: "340", countryName: "Honduras", crudeBefore: null, crudeAfter: null, petroleumBefore: 1182864, petroleumAfter: 591680 },
  { countryId: "388", countryName: "Jamaica", crudeBefore: 761902032, crudeAfter: 549039042, petroleumBefore: 248275239, petroleumAfter: 133379416 },
  { countryId: "392", countryName: "Japan", crudeBefore: 240085485, crudeAfter: 292018461, petroleumBefore: null, petroleumAfter: null },
  { countryId: "458", countryName: "Malaysia", crudeBefore: 749698840, crudeAfter: 858132659, petroleumBefore: null, petroleumAfter: null },
  { countryId: "504", countryName: "Morocco", crudeBefore: null, crudeAfter: null, petroleumBefore: 28597002, petroleumAfter: 83148340 },
  { countryId: "528", countryName: "Netherlands", crudeBefore: 150738295, crudeAfter: null, petroleumBefore: 154650661, petroleumAfter: 1402 },
  { countryId: "558", countryName: "Nicaragua", crudeBefore: 321132463, crudeAfter: 410830908, petroleumBefore: 472063116, petroleumAfter: 43778913 },
  { countryId: "591", countryName: "Panama", crudeBefore: null, crudeAfter: null, petroleumBefore: 88488, petroleumAfter: 28485 },
  { countryId: "600", countryName: "Paraguay", crudeBefore: null, crudeAfter: null, petroleumBefore: 130551983, petroleumAfter: 69856 },
  { countryId: "604", countryName: "Peru", crudeBefore: 140881895, crudeAfter: null, petroleumBefore: 1008077, petroleumAfter: 190126 },
  { countryId: "410", countryName: "Republic of Korea", crudeBefore: null, crudeAfter: 1436, petroleumBefore: 71035137, petroleumAfter: 3726054 },
  { countryId: "670", countryName: "Saint Vincent and the Grenadines", crudeBefore: null, crudeAfter: null, petroleumBefore: 21789088, petroleumAfter: 25485145 },
  { countryId: "686", countryName: "Senegal", crudeBefore: null, crudeAfter: null, petroleumBefore: 59665847, petroleumAfter: 16242729 },
  { countryId: "702", countryName: "Singapore", crudeBefore: null, crudeAfter: null, petroleumBefore: 3778557676, petroleumAfter: 4204560329 },
  { countryId: "724", countryName: "Spain", crudeBefore: 1581299713, crudeAfter: 1673986633, petroleumBefore: 208, petroleumAfter: 16258406 },
  { countryId: "740", countryName: "Suriname", crudeBefore: null, crudeAfter: null, petroleumBefore: 7572295, petroleumAfter: 12595804 },
  { countryId: "752", countryName: "Sweden", crudeBefore: 525081390, crudeAfter: 664685759, petroleumBefore: null, petroleumAfter: 28921 },
  { countryId: "768", countryName: "Togo", crudeBefore: null, crudeAfter: null, petroleumBefore: 25919722, petroleumAfter: 3967454 },
  { countryId: "826", countryName: "United Kingdom", crudeBefore: 428590681, crudeAfter: 267617698, petroleumBefore: 269605625, petroleumAfter: 50008175 },
  { countryId: "840", countryName: "United States", crudeBefore: 34643062347, crudeAfter: 26415977806, petroleumBefore: 3199491715, petroleumAfter: 3013359660 },
  { countryId: "858", countryName: "Uruguay", crudeBefore: 813147922, crudeAfter: 423359750, petroleumBefore: 12428, petroleumAfter: 21708 },
];
