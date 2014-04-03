window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  colorRange:
    'change': ["#FF5C26", "#eee", "#A3D900"]
    'now': ["#FFDC73", "#FF5C26"]
    'future_threats': ["#FFDC73", "#FF5C26"]

  legendText:
    'change': ['Increase', 'Decrease']
    'now': ["Low", "High"]
    'future_threats': ["Low", "High"]    

  initialize: (options) ->
    @filter = options.filter
    @resultsNumber = options.resultsNumber
    @initBaseLayer()
    @listenTo(@filter, 'change:tab', @resetQueryLayerStyle)
    @listenTo(@filter, 'change:query', @updateQueryLayer)
    @listenTo(@filter, 'change:level', @updateQueryLayerStyle)
    @listenTo(@filter, 'change:protectionLevel', @updateQueryLayerStyle)
    @listenTo(@filter, 'change:pressureLevel', @updateQueryLayerStyle)
    @listenTo(@filter, 'change:agrCommDevLevel', @updateQueryLayerStyle)

  sortDataBy: (data, field) ->
    _.map(_.sortBy(data, field), (row, i) -> 
      row.rank = i
      row
    )

  setZeroValueIndex: () ->
    @zeroValueIndex = _.findIndex(@sortDataBy(@data, 'value'), (d) -> d.value >= 0)

  initBaseLayer: ->
    @mapHasData = no
    @lineWeight = d3.scale.linear().domain([0, 11]).range([.5, 2.6])
    @map = L.map('map', {scrollWheelZoom: true}).setView([0, 0], 3)
    @queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?'
    L.tileLayer('https://a.tiles.mapbox.com/v3/timwilki.himjd69g/{z}/{x}/{y}.png', {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
    }).addTo(@map)

  initQueryLayer: (geo, region) ->
    @region = region
    regionCode = region.get('code')
    regionBounds = region.get('bounds')
    @categories = 3
    @resetWatershedSelectionCount()
    @collection = topojson.feature(geo, geo.objects[regionCode])
    @interiors = topojson.mesh(geo, geo.objects[regionCode])
    @queryLayer = L.geoJson(@collection, {style: @basePolyStyle}).addTo(@map)
    @queryLayerInteriors = L.geoJson(@interiors, {style: @baseLineStyle}).addTo(@map)
    @queryLayer
    @map.fitBounds regionBounds
    @map.on( 'zoomend', => @queryLayerInteriors.setStyle @baseLineStyle )

  getLegendGradientElement: (tab) ->
    if Modernizr.cssgradients
      colours = @colorRange[tab].join(', ')
      style = "linear-gradient(to right, #{colours});"
      return "<div class='map-legend-gradient' style='background: #{style}'>" 
    else
      return "<div class='map-legend-gradient nogradient #{tab}'>"

  setLegend: () =>
    if @legend then @unsetLegend()
    @legend = L.control(position: "bottomleft")
    @legend.onAdd = (map) =>
      div = L.DomUtil.create("div", "info legend")
      tab = @filter.get('tab')
      div.innerHTML = """
        <div class='map-legend-text'>
          <p>Biodiversity importance</p>
        </div>
          #{@getLegendGradientElement(tab)}
          <span>#{@legendText[tab][0]}</span>
          <span>#{@legendText[tab][1]}</span>          
        </div>
      """
      div
    @legend.addTo @map

  unsetLegend: =>
    if @legend then @legend.removeFrom @map
    @legend = no
  
  bindPopup: (feature, layer) =>
    id = layer.feature.properties.cartodb_id
    w = _.find(@data, (row) -> row.watershed_id == id)
    popupOptions = {maxWidth: 200}
    layer.bindPopup(
      """
      Watershed id: #{w.name} <br>
      Value: #{@formatToFirst2NonZeroDecimals(w.value)} <br>
      Pressure Index: #{@formatToFirst2NonZeroDecimals(w.pressure_index)} <br>
      Protection Percentage: #{w.protection_percentage.toFixed(0)} <br>
      <a href='data/data_sheets/#{w.name}.pdf'>Watershed data sheet</a>
      """,
      popupOptions
    );

  # This re-styles the map with new data
  updateQueryLayer: =>
    @map.removeLayer @queryLayer
    @styleValueField = 'rank'  # or value
    q = @filter.get('query')
    unless q? then return
    $.getJSON("https://carbon-tool.cartodb.com/api/v2/sql?q=#{q}", (data) =>
      @data = @sortDataBy(data.rows, 'value')
      unless @data.length > 0
        throw new Error("Data should not be empty, check your query")
      @setMinMax()
      if @filter.get('tab') == 'change' then @setZeroValueIndex()
      @querydata = @buildQuerydata @data
      @resetWatershedSelectionCount @data.length
      @queryLayer = L.geoJson(@collection, {
        style: @queryPolyStyle
        onEachFeature: @bindPopup
      }).addTo(@map)
      unless @mapHasData
        @mapHasData = yes
        @queryLayerInteriors.setStyle @baseLineStyle
      @queryLayerInteriors.bringToFront()
      @setLegend()
    )

  setMinMax: (type) =>
    @max = {
      'value': @data[@data.length - 1].value
      'rank': @data.length
      'agrCommDev': _.max(@data, (o) -> o.comprov_value).comprov_value
    }
    @min = {
      'value': @data[0].value
      'rank': 0
      'agrCommDev': 0
    }
    @

  buildQuerydata: (data) =>
    _.object(_.map(data, (x) =>
      [x.watershed_id, {
        rank: x.rank
        value: x.value
        protectionPercentage: x.protection_percentage
        pressureIndex: x.pressure_index
        agrCommDevValue: x.comprov_value or ""
        watershed_name: x.name
        lake: x.lake or no
      }])
    )

  # This show-hides watersheds, but does not re-style the map
  updateQueryLayerStyle: =>
    if @querydata?
      @resetWatershedSelectionCount()
      @queryLayer.setStyle @queryPolyStyle
      @resultsNumber.set 'number', @currentSelectionCount
      if @currentSelectionCount == 0
        @unsetLegend()
      else
        unless @legend then @setLegend()
 
  resetQueryLayerStyle: =>
    @queryLayer.setStyle @basePolyStyle

  getColor: (feature) =>
    tab = @filter.get('tab')
    if tab == 'change'
      domain = [@min[@styleValueField], @zeroValueIndex, @max[@styleValueField]]
      range = @colorRange[tab]
    else
      domain = [@min[@styleValueField], @max[@styleValueField]]
      range = @colorRange[tab]
    color = d3.scale.linear().domain(domain).range(range)
    color(@querydata[feature][@styleValueField])

  filterFeatureLevel: (id) =>
    level = @filter.get('level')
    range = (@max[@styleValueField] - @min[@styleValueField]) / @categories
    d = @querydata[id]
    if level == 'all'
      return yes
    if level == 'high'
      if d[@styleValueField] >= @min[@styleValueField] + range * 2
        return yes
    if level == 'medium'
      if d[@styleValueField] >= @min[@styleValueField] + range and d[@styleValueField] < @min[@styleValueField] + range * 2
        return yes
    if level == 'low'
      if d[@styleValueField] >= @min[@styleValueField] and d[@styleValueField] < @min[@styleValueField] + range
        return yes
    no

  setProtectionFill: (op, d) =>
    protectionLevel = @filter.get('protectionLevel')
    if protectionLevel == 'all'
      unless d.protectionPercentage == 100
        op = 0 
    if protectionLevel == 'high'
      unless d.protectionPercentage >= 66 and d.protectionPercentage < 100
        op = 0 
    if protectionLevel == 'medium'
      unless d.protectionPercentage >= 33 and d.protectionPercentage < 66 
        op = 0  
    if protectionLevel == 'low'
      unless d.protectionPercentage < 33 
        op = 0
    op

  setAgrCommDevFill: (op, d) =>
    agrCommDevLevel = @filter.get('agrCommDevLevel')
    min = @min.agrCommDev
    d = d.agrCommDevValue
    range = (@max.agrCommDev - min) / @categories
    if agrCommDevLevel == 'high'
      unless d >= min + range * 2
        op = 0 
    if agrCommDevLevel == 'medium'
      unless d >= min + range and d < min + range * 2
        op = 0  
    if agrCommDevLevel == 'low'
      unless d >= min and d < min + range
        op = 0  
    if agrCommDevLevel == 'negative'
      unless d < 0
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
    if @filter.get('agrCommDevLevel')?
      op = @setAgrCommDevFill op, d 
    if op == .9 then @currentSelectionCount += 1 
    return op

  baseLineStyle: (feature) =>
    {
      weight: @lineWeight @map.getZoom()
      opacity: 0.5
      color: if @mapHasData then '#222' else '#C0A972'
      fillOpacity: 0
    }

  basePolyStyle: (feature) ->
    {
      weight: 0
      opacity: 0
      fillOpacity: 0.25
      color: '#C0A972'
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
      fillOpacity: if feature.properties.lake then 0 else fillOpacity
      fillColor: fillColor
    }

  resetWatershedSelectionCount: (number) ->
    number or= 0
    @currentSelectionCount = number
    @resultsNumber.set 'number', number

  formatToFirst2NonZeroDecimals: (number) ->
    number += ''
    number.match(/^-{0,1}[0-9]+\.*0*[1-9]{0,2}/)

  onClose: ->
    @remove()

