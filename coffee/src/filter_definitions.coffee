window.MacArthur ||= {}

MacArthur.CONFIG =
  tabs: [
    { selector: "now", name: "Now"}
    { selector: "change", name: "Change"}
  ],
  # latLngBounds(southWest, northEast)
  regions: [
    { code: "WAN", name: "Andes", bounds: [ [-22,-57], [14,-83] ] }
    { code: "MEK", name: "Mekong", bounds: [ [6,110], [35,90] ] }
    { code: "GLR", name: "African Great Lakes", bounds: [ [-18,30], [10,40] ] }
  ]
  subjects: [
    { selector: "biodiversity", name: "Biodiversity"},
    { selector: "ecosystem", name: "Ecosystem"}
  ],
  lenses: {
    biodiversity: [
      { selector: "allsp", name: "All species", default: true },
      { selector: "crenvu", name: "All threatened" },
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
  scenarios: [
    { selector: "mf2050", name: "Markets first" },
    { selector: "susf2050", name: "Sustainability first" },
    { selector: "secf2050", name: "Security first" },
    { selector: "polf2050", name: "Policy first" }
  ],
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