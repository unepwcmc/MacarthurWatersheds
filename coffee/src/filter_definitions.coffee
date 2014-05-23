window.MacArthur ||= {}

MacArthur.CONFIG =
  tabs: [
    {
      selector: "now"
      name: "Now"
      strapline: "Current status"
    },{
      selector: "change"
      name: "Change"
      strapline: "Change up to 2050"
    },{ 
      selector: "future_threats"
      name: "Future Threats"
      strapline: "Future threats from agricultural development"
    }
  ],
  regions: [
    # latLngBounds(southWest, northEast)
    { code: "WAN", name: "Andes", bounds: [ [-22,-57], [14,-83] ] }
    { code: "GLR", name: "African Great Lakes", bounds: [ [-18,30], [10,40] ] }
    { code: "MEK", name: "Mekong", bounds: [ [6,110], [35,90] ] }
  ]
  scales: [
    { code: "broadscale", name: "Global"}
    { code: "regional", name: "Regional"}
  ]
  subjects: [
    { selector: "biodiversity", name: "Biodiversity importance"}
    { selector: "ecosystem", name: "Ecosystem function importance"}
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
  scenarios: 
    broadscale: [
      { selector: "mf2050", name: "Markets first" }
      { selector: "susf2050", name: "Sustainability first" }
      { selector: "secf2050", name: "Security first" }
      { selector: "polf2050", name: "Policy first" }
    ]
    regional: [
      { selector: "sl2050", name: "Sleeping Lions" }
      { selector: "ll2050", name: "Lone Leopards" }
      { selector: "hz2050", name: "Herd of Zebra" }
      { selector: "ia2050", name: "Industrious Ants" }
    ]
  ,
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
    { selector: "high", name: "66% -100% covered" , default: true }
    { selector: "medium", name: "33% - 66% covered" }
    { selector: "low", name: "0 -  33% covered" }
  ],
  pressureLevels: [
    { selector: "high", name: "High" , default: true }
    { selector: "medium", name: "Medium" }
    { selector: "low", name: "Low" }
  ],
  agrCommDevLevels: [
    { selector: "high", name: "High" }
    { selector: "medium", name: "Medium" }
    { selector: "low", name: "Low" }
    { selector: "negative", name: "Decrease" }
  ]

MacArthur.getFilterOptionsWithSelectedSet = (filter, name, plural, scale) ->
  collection_name = plural or "#{name}s"
  option = MacArthur.CONFIG[collection_name][scale] or MacArthur.CONFIG[collection_name]
  _.map(option, (element) ->
    if filter.get(name) is element.selector
      element.active = true
    else
      element.active = false
    element
  )
