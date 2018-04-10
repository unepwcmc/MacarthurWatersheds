window.Backbone ||= {}
window.Backbone.Router ||= {}

class Backbone.Router.AppRouter extends Backbone.Router

  routes: {
    '': 'showRegionChooser'
    'region::region': 'showScaleChooser'
    'region::region/scale::scale': 'showSidePanel'
  }

  initialize: (options) ->
    @regions = options.regions
    @scales = options.scales
    @filter = options.filter
    @modalContainer = options.modalContainer
    @sidePanel = options.sidePanel
    @map = options.map
    @resultsNumber = options.resultsNumber
    @geoms = {}

  showRegionChooser: =>
    @modalContainer.hideModal()
    @sidePanel.$el.removeClass('active')
    regionChooserView = new Backbone.Views.RegionChooserView({regions: @regions})
    @modalContainer.showModal(regionChooserView)


  showScaleChooser: (regionCode) =>
    @sidePanel.$el.removeClass('active')
    @modalContainer.hideModal()

    if regionCode == "LVB"
      this.showSidePanel("LVB", "regional")
    else
      scaleChooserView = new Backbone.Views.ScaleChooserView({scales: @scales})
      @modalContainer.showModal(scaleChooserView)

  showSidePanel: (regionCode, scaleCode) =>
    @modalContainer.hideModal()
    spinView = new Backbone.Views.SpinView()
    @modalContainer.showModal(spinView)
    init = (geo) =>
      @modalContainer.hideModal()
      region = @regions.find( (region) -> region.get('code') == regionCode )
      scale = @scales.find( (scale) -> scale.get('code') == scaleCode )
      @sidePanel.$el.addClass('active')
      @filter.set(region: region)
      @filter.set(scale: scale)
      @sideView = @setSideView()
      @sidePanel.showView(@sideView)
      @map.initQueryLayer(geo, region, scale)
      @geo = geo

    geom = @geoms["#{regionCode}_#{scaleCode}"]
    if geom
      init(geom)
    else
      $.getJSON("../../../data/#{regionCode}_#{scaleCode}.topo.json", (geo) =>
        init(geo)
        @geoms["#{regionCode}_#{scaleCode}"] = geo
      )
    @currentRegionCode = regionCode

  setSideView: =>
    if @sideView then @sideView.close()
    @sideView = new Backbone.Views.TabView(
      filter: @filter
      resultsNumber: @resultsNumber
    )
