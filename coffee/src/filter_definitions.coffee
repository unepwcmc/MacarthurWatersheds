window.MacArthur = {}

MacArthur.CONFIG = 
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