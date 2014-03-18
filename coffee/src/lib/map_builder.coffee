window.MacArthur ||= {}

class window.MacArthur.MapBuilder

  initBaseLayer: ->
    @map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 2)
    @queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?'
    L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
    }).addTo(@map)

  initQueryLayer: (geo, regionCode, regionBounds) ->
    @collection = topojson.feature(geo, geo.objects[regionCode])
    @interiors = topojson.mesh(geo, geo.objects[regionCode], (a, b) -> a != b )
    @queryLayer = L.geoJson(@collection, {style: @basePolyStyle}).addTo(@map)
    @queryLayerInteriors = L.geoJson(@interiors, {style: @baseLineStyle}).addTo(@map)
    @map.fitBounds regionBounds

  baseLineStyle: (feature) ->
    {
      weight: 0.6,
      opacity: 1,
      color: 'black',
      fillOpacity: 0
    }

  basePolyStyle: (feature) ->
    {
      weight: 0
      opacity: 0
      fillOpacity: 0.6
      color: 'white'
    }