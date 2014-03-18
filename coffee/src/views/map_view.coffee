window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  initialize: (options) ->
    @filter = options.filter
    @initBaseLayer()
    @filter.on('change:query', @updateQueryLayer)

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
    @interiors = topojson.mesh(geo, geo.objects[regionCode], (a, b) -> a != b )
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
      @querydata = _.object(_.map(data.rows, (x) =>
        if x.value > @max then @max = x.value
        if x.value < @min then @min = x.value
        [x.watershed_id, x.value])
      )
      @range = (@max - @min) / 4
      @queryLayer = L.geoJson(@collection, {style: @queryPolyStyle}).addTo(@map)
      @queryLayerInteriors.bringToFront()
    )

  updateCollection: (collection, data) ->
    #for c in collection
    #  c.value = 

  getColor: (feature) =>
    d = @querydata[feature]
    p = d - @min
    if p > @min + @range * 3  then return '#800026'
    if p > @min + @range * 2  then return '#E31A1C'
    if p > @min + @range      then return '#FD8D3C'
    if p > @min               then return '#FED976'
    '#fff'

  baseLineStyle: (feature) ->
    {
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0
    }

  basePolyStyle: (feature) ->
    {
      weight: 0
      opacity: 0
      fillOpacity: 0.6
      color: 'white'
    }

  queryPolyStyle: (feature) =>
    {
      weight: 0
      opacity: 0
      fillOpacity: 0.8
      fillColor: @getColor(feature.properties.cartodb_id)
    }
