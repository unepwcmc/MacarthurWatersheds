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

  showRegionChooser: =>
    @sidePanel.$el.removeClass('active')
    regionChooserView = new Backbone.Views.RegionChooserView({regions: @regions})
    @modalContainer.showModal(regionChooserView)

  showScaleChooser: (regionCode) =>
    @sidePanel.$el.removeClass('active')
    @modalContainer.hideModal()
    scaleChooserView = new Backbone.Views.ScaleChooserView({scales: @scales})
    @modalContainer.showModal(scaleChooserView)

  showSidePanel: (regionCode, scaleCode) =>
    $.getJSON("../../../data/#{regionCode}.topo.json", (geo) =>
      @modalContainer.hideModal()
      region = @regions.find( (region) -> region.get('code') == regionCode )
      scale = @scales.find( (scale) -> scale.get('code') == scaleCode )
      @sidePanel.$el.addClass('active')
      @filter.set(region: region)
      @filter.set(scale: scale)
      @sideView = new Backbone.Views.TabView(
        filter: @filter
        resultsNumber: @resultsNumber
      )
      @sidePanel.showView(@sideView)
      @map.initQueryLayer(geo, region)
    )
