window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  colorRange:
    'change': ["#FF5C26", "#fff", "#A3D900"]
    'now': ["#fcbba1", "#67000d"]
    'futureThreatsColorpleth': [
                                ['#E64C00', '#7a5259', '#730000'],
                                ['#FF9f6b', '#B87461', '#a82a00'],
                                ['#FFF7E6', '#bed5ed', '#7ab6f5']
                               ]

  futureThreatsColorRange:
    'high_agricultural_colour': ["#deebf7", "#3182bd"]
    'medium_agricultural_colour': ["#efedf5", "#756bb1"]
    'low_agricultural_colour': ["#fee0d2", "#de2d26"]
    'negative_agricultural_colour': ["#ffffff", "#000000"]

  legendText:
    'change': ['Decrease', 'Increase']
    'now': ["Low", "High"]
    'future_threats': ["Low", "High"]

  subjectText:
    'biodiversity': 'Biodiversity'
    'ecosystem': 'EF'

  initialize: (options) ->
    @filter = options.filter
    @resultsNumber = options.resultsNumber
    @parsedResults = 0
    @initBaseLayer()
    @listenTo(@filter, 'change:tab', @fireTabChangeCallbacks)
    @listenTo(@filter, 'change:query', @updateQueryLayer)
    @listenTo(@filter, 'change:level', @updateQueryLayerStyle)
    @listenTo(@filter, 'change:protectionLevel', @updateQueryLayerStyle)
    @listenTo(@filter, 'change:pressureLevel', @updateQueryLayerStyle)

  sortDataBy: (data, field) ->
    _.map(_.sortBy(data, field), (row, i) -> 
      row.rank = i
      row
    )

  initBaseLayer: ->
    @mapHasData = no
    @lineWeight = d3.scale.linear().domain([0, 11]).range([.5, 2.6])
    @map = L.map('map', {scrollWheelZoom: true}).setView([0, 0], 3)
    @queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?'
    L.tileLayer('https://a.tiles.mapbox.com/v3/timwilki.himjd69g/{z}/{x}/{y}.png', {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
    }).addTo(@map)

  initQueryLayer: (geo, region, scale) ->
    @querydata = null
    if @queryLayer then @map.removeLayer(@queryLayer)
    if @queryLayerInteriors then @map.removeLayer(@queryLayerInteriors)
    @region = region
    @scale = scale
    regionCode = region.get('code')
    scaleCode = scale.get('code')
    regionBounds = region.get('bounds')
    regionCentre = region.get('centre')
    @categories = 3
    @unsetWatershedSelectionCount()
    @collection = topojson.feature(geo, geo.objects["#{regionCode}_#{scaleCode}"])
    @interiors = topojson.mesh(geo, geo.objects["#{regionCode}_#{scaleCode}"])
    @queryLayer = L.geoJson(@collection, {style: @basePolyStyle}).addTo(@map)
    @queryLayerInteriors = L.geoJson(@interiors, {style: @baseLineStyle}).addTo(@map)
    #@map.fitBounds regionBounds {animate: false}
    @map.setView(regionCentre, 5, {animate: false})
    @map.on( 'zoomend', => @queryLayerInteriors.setStyle @baseLineStyle )

  htmlGradientElement: (colorRange) ->
    colorRange = _.cloneDeep(colorRange)
    colours = colorRange.join(', ')
    style = "linear-gradient(to right, #{colours});"
    return "<div class='map-legend-gradient' style='background: #{style}'>"

  getLegendGradientElement: (tab) ->
    if Modernizr.cssgradients
      if tab == 'future_threats'
        html_element = ''
        for k,v of @futureThreatsColorRange
          html_element = html_element.concat("#{@htmlGradientElement(v)}</div>")
        return html_element
      else
        @htmlGradientElement(@colorRange[tab])
    else
      return "<div class='map-legend-gradient nogradient #{tab}'>"

  legendGrid: () ->
    html_element = ''
    for value in @futureThreatsColorpleth
      for colour in value
        html_element = html_element.concat("""<div class='map-legend-grid-square' 
                                              style=background-color:#{colour};></div>""")
    return html_element

  setLegend: () =>
    if @legend then @unsetLegend()
    @legend = L.control(position: "bottomleft")
    @legend.onAdd = (map) =>
      div = L.DomUtil.create("div", "info legend")
      tab = @filter.get('tab')
      subject = @filter.get('subject')
      title = if tab == 'change' then 'Change' else 'Importance'
      if tab == 'future_threats'
        #categories option
        div.innerHTML = """
          <div class='map-legend-base'>
            <table class='map-legend-table'>
              <tr>
                <td class='map-legend-table-rotate'>
                  <div><span>Agr. Dev. Level</span></div>
                </td>
                <td class='map-legend-table-rotate'>
                  <div class='legend-high-low'>
                    <span>Low High</span>
                  </div>
                </td>
                <td class='map-legend-table-right-column'>
                  <div class='map-legend-grid'>
                    #{@legendGrid()}
                  </div>
                </td>
              </tr>
              <tr>
                <td class='map-legend-table-left-column'>
                </td>
                <td class='map-legend-table-left-column'>
                </td>
                <td class='map-legend-table-right-column'>
                  <div class='legend-high-low'>
                    <span>Low</span>
                    <span>High</span>
                  </div>
                <td>
              </tr>
              <tr>
                <td class='map-legend-table-left-column'>
                </td>
                <td class='map-legend-table-left-column'>
                </td>
                <td class='map-legend-table-right-column'>
                  <div><span>#{@subjectText[subject]} Level of Importance</span></div>
                <td>
              </tr>
            </table>
          </div>
        """

        # gradient option
        # div.innerHTML = """
        #     <div class='map-legend-y-axis-label'>
        #       <h3>Agr. Dev. Level</h3>
        #     </div>
        #   #{@getLegendGradientElement(tab)}
        # """
      else
        div.innerHTML = """
          <div class='map-legend-text'>
            <h3 class='legend-title'>#{@subjectText[subject]} Level of #{title}</h3>
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

  getPopupText: (w, isLake) ->
    tab = @filter.get('tab')
    subject = @filter.get('subject')
    if isLake
      return "<a href='data/data_sheets/#{w.name}.pdf'>Watershed data sheet</a>"
    else
      if tab == 'future_threats'
        agr_dev_row = """Agr. Dev. Level: #{@formatToFirst2NonZeroDecimals(w.agr_dev_value)}<br>"""
      else
        agr_dev_row = """"""
      return """
      Watershed id: #{w.name} <br>
      #{@subjectText[subject]} Value: #{@formatToFirst2NonZeroDecimals(w.value)} (Maximum: #{@formatToFirst2NonZeroDecimals(@max['value'])})<br>
      #{agr_dev_row}
      <!--Pressure Index: #{@formatToFirst2NonZeroDecimals(w.pressure_index)} <br-->
      Protection Percentage: #{w.protection_percentage.toFixed(0)} <br>
      <a href='data/data_sheets/#{w.name}.pdf' target="_blank">Watershed data sheet</a>
      """

  bindPopup: (feature, layer) =>
    id = layer.feature.properties.cartodb_id
    w = _.find(@data, (row) -> row.watershed_id == id)
    popupOptions = {maxWidth: 230}
    layer.bindPopup(@getPopupText(w, feature.properties.lake), popupOptions)

  # This re-styles the map with new data
  updateQueryLayer: =>
    @map.removeLayer @queryLayer
    @styleValueField = 'value'  # or value
    @filterValueField = 'rank'
    q = @filter.get('query')
    unless q? then return
    @resultsNumber.set 'loading', true
    $.getJSON("https://carbon-tool.cartodb.com/api/v2/sql?q=#{q}&callback=?", (data) =>
      @resultsNumber.set 'loading', false
      @data = @sortDataBy(data.rows, 'value')
      @dataLenght = @data.length
      unless @dataLenght > 0
        throw new Error("Data should not be empty, check your query")
      @setMinMax()
      if @filter.get('tab') == 'change' then @setZeroValueIndexes()
      @querydata = @buildQuerydata @data
      @setLinearScaleColour()
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

    data_without_lakes = $.grep @data, (e) -> e.lake isnt true
    @max = {
      'value': data_without_lakes[data_without_lakes.length - 1].value
      'rank': data_without_lakes.length
      'agrCommDev': _.max(data_without_lakes, (o) -> o.agr_dev_value).agr_dev_value
    }
    @min = {
      'value': data_without_lakes[0].value
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
        agrCommDevValue: x.agr_dev_value or ""
        watershed_name: x.name
        lake: x.lake or no
      }])
    )

  # This show-hides watersheds, but does not re-style the map
  updateQueryLayerStyle: =>
    if @querydata?
      @unsetWatershedSelectionCount()
      #TODO: there might be some unnecessary calls here:
      @setLinearScaleColour()
      @queryLayer.setStyle @queryPolyStyle
 
  resetQueryLayerStyle: =>
    @queryLayer.setStyle @basePolyStyle

  getColor: (feature) =>
    tab = @filter.get('tab')
    rank = @querydata[feature][@styleValueField]
    #isZero = _.find(@zeroValueIndexes, (i) -> rank == i)
    if tab == 'change'
      if @styleValueField == 'value'
        middle_gradient = 0
        if rank == 0
          return '#eee'
      else
        middle_gradient = @firstPositiveIndex
        if isZero?
          return '#eee'
      if rank > middle_gradient
        return@colorPositive(rank)
      if rank < middle_gradient
        return @colorNegative(rank)
    if tab == 'future_threats'
      d = @querydata[feature].agrCommDevValue
      @futureThreatsColorpleth = @colorRange.futureThreatsColorpleth
      min_agr = @min.agrCommDev
      max_agr = @max.agrCommDev
      max_val = @max[@styleValueField]
      min_val = @min[@styleValueField]
      range_agr = (( max_agr - min_agr ) /3)
      range_val = (( max_val - min_val ) /3)
      if rank < min_val + range_val
        if d < min_agr + range_agr
          return @futureThreatsColorpleth[2][0]
        if d < min_agr + 2 * range_agr and d > min_agr + range_agr
          return @futureThreatsColorpleth[1][0]
        if d > min_agr + range_agr
          return @futureThreatsColorpleth[0][0]
      if rank < min_val + 2 * range_val and rank > min_val + range_val
        if d < min_agr + range_agr
          return @futureThreatsColorpleth[2][1]
        if d < min_agr + 2 * range_agr and d > min_agr + range_agr
          return @futureThreatsColorpleth[1][1]
        if d > min_agr + range_agr
          return @futureThreatsColorpleth[0][1]
      if rank > min_val + 2 * range_val
        if d < min_agr + range_agr
          return @futureThreatsColorpleth[2][2]
        if d < min_agr + 2 * range_agr and d > min_agr + range_agr
          return @futureThreatsColorpleth[1][2]
        if d > min_agr + range_agr
          return @futureThreatsColorpleth[0][2]
  # In case of multiple gradients:

  #    d = @querydata[feature].agrCommDevValue
  #    max = @max.agrCommDev
  #    if @min.agrCommDev > 0
  #      min = @min.agrCommDev
  #    else
  #      min = 0
  #    range = (max - min) / @categories
  #    return @high_agricultural_colour(rank)  if d > min + range * 2
  #    return @medium_agricultural_colour(rank)  if d >= min + range and d < min + range * 2
  #    return @low_agricultural_colour(rank)  if d >= min and d < min + range
  #    @negative_agricultural_colour rank  if d < 0
    if tab == 'now'
      @color(rank)

  filterFeatureLevel: (id) =>
    level = @filter.get('level')
    tab = @filter.get('tab')
    d = @querydata[id]
    if tab == 'change'
      range = @firstPositiveFilterIndex / @categories
    else
      range = (@max[@filterValueField] - @min[@filterValueField]) / @categories
    if level == 'all'
      return yes
    if level == 'increase'
      return d[@filterValueField] >= @firstPositiveFilterIndex
    if level == 'high' && tab != 'change'
      if d[@filterValueField] >= @min[@filterValueField] + range * 2
        return yes
    if level == 'low' && tab == 'change'
      if d[@filterValueField] >= @min[@filterValueField] + range * 2 and d[@filterValueField] < @firstPositiveFilterIndex
        return yes      
    if level == 'medium'
      if d[@filterValueField] >= @min[@filterValueField] + range and d[@filterValueField] < @min[@filterValueField] + range * 2
        return yes
    if level == 'low' && tab != 'change' or level == 'high' && tab == 'change'
      if d[@filterValueField] >= @min[@filterValueField] and d[@filterValueField] < @min[@filterValueField] + range
        return yes
    no

  setProtectionFill: (op, d) =>
    protectionLevel = @filter.get('protectionLevel')
    if protectionLevel == 'high'
      unless d.protectionPercentage >= 66 and d.protectionPercentage <= 100
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
    @parsedResults += 1
    if @parsedResults == @dataLenght
      @setWatershedSelectionCount()
    {
      weight: 0
      opacity: 0
      fillOpacity: if feature.properties.lake then 0 else fillOpacity
      fillColor: fillColor
    }

  setWatershedSelectionCount: ->
    @parsedResults = 0
    @resultsNumber.set 'number', @currentSelectionCount
    if @currentSelectionCount == 0
      @unsetLegend()
    else
      unless @legend then @setLegend()
    @currentSelectionCount = 0

  unsetWatershedSelectionCount: ->
    unless @currentSelectionCount != undefined
      @parsedResults = 0
      @currentSelectionCount = 0
    unless @resultsNumber.get('number') == -999
      @resultsNumber.set 'number', 0

  formatToFirst2NonZeroDecimals: (number) ->
    number += ''
    number.match(/^-{0,1}[0-9]+\.*0*[1-9]{0,2}/)

  setZeroValueIndexes: () ->
    sortedData = @sortDataBy(@data, 'value')
    firstPositiveNonZeroIndex = null
    @zeroValueIndexes = _.map(_.filter(sortedData, (d, i) ->
      if d.value > 0 then firstPositiveNonZeroIndex = i
      if d.value == 0
        d.index = i
      d.value == 0
    ), (d) -> d.index)
    if @styleValueField == 'value'
      @firstPositiveIndex = 0
      @firstPositiveFilterIndex = @zeroValueIndexes[0] or firstPositiveNonZeroIndex
    else
      @firstPositiveIndex = @zeroValueIndexes[0] or firstPositiveNonZeroIndex

  setNegativeLinearScaleColour: (tab) ->
    if @styleValueField == 'value'
      domain = [@min[@styleValueField], @firstPositiveIndex]
    else
      domain = [@min[@styleValueField], @firstPositiveIndex-1]
    range = @colorRange[tab][0..1]
    @colorNegative = d3.scale.linear().domain(domain).range(range)

  setPositiveLinearScaleColour: (tab) ->
    #if @zeroValueIndexes?.length > 0
    if @styleValueField == 'value'
      min = 0
    else
      min = @zeroValueIndexes[0]
    domain = [min, @max[@styleValueField]]
    range = @colorRange[tab][-2..]
    @colorPositive = d3.scale.linear().domain(domain).range(range)

  setFutureThreatsLinearScaleColour: ->
    domain = [@min[@styleValueField], @max[@styleValueField]]
    range_high = @futureThreatsColorRange['high_agricultural_colour']
    range_medium = @futureThreatsColorRange['medium_agricultural_colour']
    range_low = @futureThreatsColorRange['low_agricultural_colour']
    range_negative = @futureThreatsColorRange['negative_agricultural_colour']
    @high_agricultural_colour = d3.scale.linear().domain(domain).range(range_high)
    @medium_agricultural_colour = d3.scale.linear().domain(domain).range(range_medium)
    @low_agricultural_colour = d3.scale.linear().domain(domain).range(range_low)
    @negative_agricultural_colour = d3.scale.linear().domain(domain).range(range_negative)

  setLinearScaleColour: ->
    tab = @filter.get('tab')
    if tab == 'change'
      @setNegativeLinearScaleColour tab
      @setPositiveLinearScaleColour tab
    if tab == 'future_threats'
      @setFutureThreatsLinearScaleColour()
    else
      domain = [@min[@styleValueField], @max[@styleValueField]]
      range = @colorRange[tab]
      @color = d3.scale.linear().domain(domain).range(range)

  fireTabChangeCallbacks: =>
    @resetQueryLayerStyle()

  onClose: ->
    @remove()
