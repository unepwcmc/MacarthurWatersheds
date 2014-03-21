window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  initialize: (options) ->
    @filter = options.filter
    @initBaseLayer()
    @filter.on('change:query', @updateQueryLayer)
    @filter.on('change:level', @updateQueryLayerStyle)
    @filter.on('change:protectionLevel', @updateQueryLayerStyle)
    @filter.on('change:pressureLevel', @updateQueryLayerStyle)

  initBaseLayer: ->
    @map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 2)
    @queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?'
    L.tileLayer('https://a.tiles.mapbox.com/v3/timwilki.himjd69g/{z}/{x}/{y}.png', {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
    }).addTo(@map)

  initQueryLayer: (geo, region) ->
    @region = region
    regionCode = region.get('code')
    regionBounds = region.get('bounds')
    @collection = topojson.feature(geo, geo.objects[regionCode])
    @interiors = topojson.mesh(geo, geo.objects[regionCode])
    @queryLayer = L.geoJson(@collection, {style: @basePolyStyle}).addTo(@map)
    @queryLayerInteriors = L.geoJson(@interiors, {style: @baseLineStyle}).addTo(@map)
    @queryLayer
    @map.fitBounds regionBounds

  updateQueryLayer: =>
    @map.removeLayer @queryLayer
    q = @filter.get('query')
    $.getJSON("https://carbon-tool.cartodb.com/api/v2/sql?q=#{q}", (data) =>
      @max = 0
      @min = Infinity
      @querydata = @buildQuerydata data.rows
      @range = (@max - @min) / 3
      @queryLayer = L.geoJson(@collection, {style: @queryPolyStyle}).addTo(@map)
      @queryLayerInteriors.bringToFront()
    )

  buildQuerydata: (data) =>
    _.object(_.map(data, (x) =>
      if x.value > @max then @max = x.value
      if x.value < @min then @min = x.value
      [x.watershed_id, {
        value: x.value,
        protectionPercentage: x.protection_percentage,
        pressureIndex: x.pressure_index
      }])
    )

  passesLevelCheck: =>
    if @filter.get('query')? and
    (@filter.get('level') != 'all' or
    (@filter.previous('level')? and
    @filter.get('level') == 'all' and @filter.previous('level') != 'all') )
      return yes
    no

  updateQueryLayerStyle: =>
    if @querydata?
      @queryLayer.setStyle @queryPolyStyle

  updateCollection: (collection, data) ->
    #for c in collection
    #  c.value =

  getColor: (feature) =>
    d = @querydata[feature]
    p = d.value - @min
    if p >= @min + @range * 2  then return '#e6550d'
    if p >= @min + @range      then return '#fdae6b'
    if p >= @min               then return '#fee6ce'
    '#fff'

  filterFeatureLevel: (id) =>
    level = @filter.get('level')
    d = @querydata[id]
    if level == 'all'
      return yes
    if level == 'high'
      if d.value >= @min + @range * 2
        return yes
    if level == 'medium'
      if d.value >= @min + @range and d.value < @min + @range * 2
        return yes
    if level == 'low'
      if d.value >= @min and d.value < @min + @range
        return yes
    no

  setProtectionFill: (op, d) =>
    protectionLevel = @filter.get('protectionLevel')
    if protectionLevel == 'high'
      unless d.protectionPercentage >= 66
        op = 0
    if protectionLevel == 'medium'
      unless d.protectionPercentage >= 33 and d.protectionPercentage < 66
        op = 0
    if protectionLevel == 'low'
      unless d.protectionPercentage < 33
        op = 0
    op

  setPressureFill: (op, d) =>
    pressureLevel = @filter.get('pressureLevel')
    if pressureLevel == 'high'
      unless d.pressureIndex >= .66
        op = 0
    if pressureLevel == 'medium'
      unless d.pressureIndex >= .33 and d.pressureIndex < .66
        op = 0
    if pressureLevel == 'low'
      unless d.pressureIndex < .33
        op = 0
    op

  getFillOpacity: (feature) =>
    op = .9
    d = @querydata[feature]
    if @filter.get('protection') == yes
      op = @setProtectionFill op, d
    if @filter.get('pressure') == yes
      op = @setPressureFill op, d
    return op

  baseLineStyle: (feature) ->
    {
      weight: 1.2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0
    }

  basePolyStyle: (feature) ->
    {
      weight: 0
      opacity: 0
      fillOpacity: 0
    }

  queryPolyStyle: (feature) =>
    id = feature.properties.cartodb_id
    if @filterFeatureLevel(id)
      fillOpacity = @getFillOpacity(id)
      fillColor = @getColor(id)
    else
      fillOpacity = 0
      fillColor = 0
    {
      weight: 0
      opacity: 0
      fillOpacity: fillOpacity
      fillColor: fillColor
    }
