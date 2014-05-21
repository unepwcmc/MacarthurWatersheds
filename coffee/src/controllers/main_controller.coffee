window.Backbone ||= {}
window.Backbone.Controllers ||= {}

class ModalContainer
  constructor: ->
    @disabler = $('<div class="disabler"></div>')

  showModal: (view) ->
    @view = view
    $('body').prepend(@disabler)
    $('body').append(@view.$el)

  hideModal: ->
    $('body').find('.disabler').remove()
    @view.close()

class Backbone.Controllers.MainController extends Backbone.Diorama.Controller
  constructor: ->
    @regions = new Backbone.Collections.RegionCollection MacArthur.CONFIG.regions
    @scales = new Backbone.Collections.ScaleCollection MacArthur.CONFIG.scales
    @filter = new Backbone.Models.Filter()
    @resultsNumber = new Backbone.Models.ResultsNumber()
    @queryBuilder = new window.MacArthur.QueryBuilder(@filter)
    @modalContainer = new ModalContainer
    @sidePanel = new Backbone.Diorama.ManagedRegion()
    @sidePanel.$el.attr('id', 'side-panel')
    @sidePanel.$el.insertAfter('#map')
    
    # Default state
    @showMap()
    @chooseRegion()

    #routing
    @appRouter = new Backbone.Router.AppRouter({regions: @regions})
    Backbone.history.start()

  showMap: =>
    @map = new Backbone.Views.MapView(
      filter: @filter 
      resultsNumber: @resultsNumber
    )

  chooseRegion: =>
    regionChooserView = new Backbone.Views.RegionChooserView({regions: @regions})
    @modalContainer.showModal(regionChooserView)

    ###
      @changeStateOn maps events published by other objects to
      controller states
    ###
    @changeStateOn({
      event: 'regionChosen', 
      publisher: regionChooserView, 
      newState: @chooseScale
    })

  chooseScale: (region) =>
    @modalContainer.hideModal()
    scaleChooserView = new Backbone.Views.ScaleChooserView({scales: @scales})
    @modalContainer.showModal(scaleChooserView)

    ###
      @changeStateOn maps events published by other objects to
      controller states
    ###
    @changeStateOn({
      event: 'scaleChosen', 
      publisher: scaleChooserView, 
      newState: _.partialRight(@getGeometries, region, @showSidePanel)
    })

  getGeometries: (scale, region, callback) =>
    #TODO: use something like: https://github.com/superfeedr/indexeddb-backbonejs-adapter ???
    regionCode = region.get('code')
    $.getJSON("../../../data/#{regionCode}.topo.json", (geo) =>
      # Node-style
      callback(null, geo, region, scale)
    )

  showSidePanel: (err, geo, region, scale) =>
    @modalContainer.hideModal()
    @sidePanel.$el.addClass('active')
    @filter.set(region: region)
    @filter.set(scale: scale)
    view = new Backbone.Views.TabView(
      filter: @filter
      resultsNumber: @resultsNumber
    )
    @sidePanel.showView(view)
    @map.initQueryLayer(geo, region)

  

