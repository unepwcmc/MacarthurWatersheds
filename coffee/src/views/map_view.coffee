window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  initialize: (options) ->
    
    #@map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 2)
    #@queryUrlRoot = 'https://carbon-tool.cartodb.com/cartodb.com/api/v2/?'
    #L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
    #  attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
    #}).addTo(@map)

    @filter = options.filter
    @listenTo(@filter, 'change', @updateQueryLayer)
    ##@filter.on('change:query', )
    @initMap()


  updateQueryLayer: (model, event) ->
    query = model.get('query')


    
    #omnivore.topojson('../../../../lib/cartodb/macarthur_watershed.topojson').addTo(@map);


    #debugger
    #geojson = L.TopoJSON().addData(@topoJSON).addTo(@map);



    #L.TopoJSON.addData(@topoJSON).addTo(@map);
    #L.tileLayer("#{@queryUrlRoot}sql=#{query}").addTo(@map)

  initMap: ->
    map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 2)
    L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
    }).addTo(map)

    svg = d3.select(map.getPanes().overlayPane).append("svg")
    g = svg.append("g").attr("class", "leaflet-zoom-hide")
    d3.json "../../../../lib/cartodb/macarthur_watershed.topojson", (data) ->
      collection = topojson.feature(data, data.objects.macarthur_watershed)

      console.log collection
      
      # Reposition the SVG to cover the features.
      reset = ->
        bounds = path.bounds(collection)
        topLeft = bounds[0]
        bottomRight = bounds[1]
        svg.attr("width", bottomRight[0] - topLeft[0]).attr("height", bottomRight[1] - topLeft[1])
         .style("left", topLeft[0] + "px")
         .style "top", topLeft[1] + "px"
        g.attr "transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")"
        feature.attr "d", path
      
      # Use Leaflet to implement a D3 geometric transformation.
      projectPoint = (x, y) ->
        point = map.latLngToLayerPoint(new L.LatLng(y, x))
        @stream.point point.x, point.y
        return

      transform = d3.geo.transform(point: projectPoint)
      path = d3.geo.path().projection(transform)
      feature = g.selectAll("path").data([collection]).enter().append("path")
      map.on "viewreset", reset
      reset()

    
