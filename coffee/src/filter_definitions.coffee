window.MacArthur ||= {}

MacArthur.CONFIG =
  regions: [
    { code: "WAN", name: "Andes", bounds: [ [-22,-57], [14,-83] ] }
    { code: "MEK", name: "Mekong", bounds: [ [6,110], [35,90] ] }
    { code: "GLR", name: "African Great Lakes", bounds: [ [-18,15], [26,12] ] }
  ]
  subjects: [
    { selector: "biodiversity", name: "Biodiversity"},
    { selector: "ecosystem", name: "Ecosystem"}
  ],
  lenses: {
    biodiversity: [
      { selector: "allsp", name: "All species", default: true },
      { selector: "amphibia", name: "Amphibians" },
      { selector: "mammalia", name: "Mammals" },
      { selector: "aves", name: "Birds" },
    ]
    ecosystem: [
      { selector: "totef", name: "Total EF provision", default: true },
      { selector: "comprov", name: "Commodity provision (cultivated products)" },
      { selector: "wildprov", name: "Wild provision" },
      { selector: "regprov", name: "Regulating functions provision" },
    ]
  },
  levels: [
    { selector: "all", name: "All", default: true },
    { selector: "high", name: "High" },
    { selector: "medium", name: "Medium" },
    { selector: "low", name: "Low" }
  ],
  protectionLevels: [
    { selector: "high", name: "Completely covered by PA’s" , default: true },
    { selector: "medium", name: "Up to two thirds covered" },
    { selector: "low", name: "Up to one third covered" }
  ],
  pressureLevels: [
    { selector: "high", name: "High" , default: true },
    { selector: "medium", name: "Medium" },
    { selector: "low", name: "Low" }
  ]