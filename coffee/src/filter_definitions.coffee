window.MacArthur ||= {}

MacArthur.CONFIG =
  tabs: [
    { selector: "now", name: "Now"}
    { selector: "change", name: "Change"}
    { selector: "future_threats", name: "Future Threats"}
  ],
  regions: [
    # latLngBounds(southWest, northEast)
    { code: "WAN", name: "Andes", bounds: [ [-22,-57], [14,-83] ] }
    { code: "GLR", name: "African Great Lakes", bounds: [ [-18,30], [10,40] ] }
    { code: "MEK", name: "Mekong", bounds: [ [6,110], [35,90] ] }
  ]
  subjects: [
    { selector: "biodiversity", name: "Biodiversity importance"}
    { selector: "ecosystem", name: "Ecosystem function"}
  ],
  lenses: {
    biodiversity: [
      { selector: "allsp", name: "All species", default: true }
      { selector: "crenvu", name: "All threatened" }
      { selector: "amphibia", name: "Amphibians" }
      { selector: "mammalia", name: "Mammals" }
      { selector: "aves", name: "Birds" }
    ]
    ecosystem: [
      { selector: "totef", name: "Total EF provision", default: true }
      { selector: "comprov", name: "Commodity provision (cultivated products)" }
      { selector: "wildprov", name: "Wild provision" }
      { selector: "regprov", name: "Regulating functions provision" }
    ]
  },
  scenarios: [
    { selector: "mf2050", name: "Markets first" }
    { selector: "susf2050", name: "Sustainability first" }
    { selector: "secf2050", name: "Security first" }
    { selector: "polf2050", name: "Policy first" }
  ],
  levels: { 
    default: [
      { selector: "all", name: "All", default: true }
      { selector: "high", name: "High" }
      { selector: "medium", name: "Medium" }
      { selector: "low", name: "Low" }
    ],
    change: [
      { selector: "all", name: "All", default: true }
      { selector: "increase", name: "Increase" }
      { selector: "low", name: "Low" } 
      { selector: "medium", name: "Medium" }
      { selector: "high", name: "High" }
    ]
  },
  protectionLevels: [
    { selector: "all", name: "Completely covered by PA’s" , default: true }
    { selector: "high", name: "Up to three thirds covered" }
    { selector: "medium", name: "Up to two thirds covered" }
    { selector: "low", name: "Up to one third covered" }
  ],
  pressureLevels: [
    { selector: "high", name: "High" , default: true }
    { selector: "medium", name: "Medium" }
    { selector: "low", name: "Low" }
  ],
  agrCommDevLevels: [
    { selector: "all", name: "All", default: true }
    { selector: "high", name: "High" }
    { selector: "medium", name: "Medium" }
    { selector: "low", name: "Low" }
    { selector: "negative", name: "Decrease" }
  ]

MacArthur.getFilterOptionsWithSelectedSet = (filter, name, plural) ->
  collection_name = plural or "#{name}s"
  _.map(MacArthur.CONFIG[collection_name], (element) ->
    if filter.get(name) is element.selector
      element.active = true
    else
      element.active = false
    element
  )
