window.MacArthur = {}

MacArthur.CONFIG =
  regions: [
    { code: "WAN", name: "Andes" }
    { code: "MEK", name: "Mekong" }
    { code: "GLR", name: "African Great Lakes" }
  ]
  subjects: [
    { selector: "biodiversity", name: "Biodiversity"},
    { selector: "ecosystem", name: "Ecosystem"}
  ],
  lenses:
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