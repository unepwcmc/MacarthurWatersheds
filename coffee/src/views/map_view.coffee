window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  initialize: (options) ->
    @filter = options.filter
    @initBaseLayer()
    @filter.on('change:query', @updateQueryLayer)
    @filter.on('change:protectionLevel', @updateQueryLayerStyle)

  initBaseLayer: ->
    @map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 2)
    @queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?'
    L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
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
      @range = (@max - @min) / 4
      @queryLayer = L.geoJson(@collection, {style: @queryPolyStyle}).addTo(@map)
      @queryLayerInteriors.bringToFront()
    )

  buildQuerydata: (data) =>
    _.object(_.map(data, (x) =>
      if x.value > @max then @max = x.value
      if x.value < @min then @min = x.value
      [x.watershed_id, 
        {value: x.value, protection_percentage: x.protection_percentage} ])
    )

  updateQueryLayerStyle: =>
    @queryLayer.setStyle @queryPolyStyle

  updateCollection: (collection, data) ->
    #for c in collection
    #  c.value = 

  getColor: (feature) =>
    d = @querydata[feature]
    p = d.value - @min
    if p > @min + @range * 3  then return '#fdbe85'
    if p > @min + @range * 2  then return '#fd8d3c'
    if p > @min + @range      then return '#d94701'
    if p > @min               then return '#feedde'
    '#fff'

  getFillOpacity: (feature) =>
    if @filter.get('protection') == yes
      protectionLevel = @filter.get('protectionLevel')
      d = @querydata[feature]
      if protectionLevel == 'high'
        if d.protection_percentage >= 66
          return 0.9 
        else 
          return 0 
      if protectionLevel == 'medium'
        if d.protection_percentage >= 33 and d.protection_percentage < 66 
          return 0.9 
        else 
          return 0 
      if protectionLevel == 'low'
        if d.protection_percentage < 33 
          return 0.9 
        else 
          return 0 
    0.9

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
    {
      weight: 0
      opacity: 0
      fillOpacity: @getFillOpacity(id)
      fillColor: @getColor(id)
    }
