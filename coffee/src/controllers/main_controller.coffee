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
    @filter = new Backbone.Models.Filter()
    @queryBuilder = new window.MacArthur.QueryBuilder(@filter)
    @modalContainer = new ModalContainer
    @sidePanel = new Backbone.Diorama.ManagedRegion()
    @sidePanel.$el.attr('id', 'side-panel')
    @sidePanel.$el.insertAfter('#map')
    
    # Default state
    @showMap()
    @chooseRegion()

  showMap: =>
    @map = new Backbone.Views.MapView {filter: @filter}

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
      newState: _.partialRight(@getGeometries, @showSidePanel)
    })

  getGeometries: (region, callback) =>
    #TODO: use something like: https://github.com/superfeedr/indexeddb-backbonejs-adapter ???
    regionCode = region.get('code')
    $.getJSON("../../../data/#{regionCode}.topo.json", (geo) =>
      # Node-style
      callback(null, geo, region)
    )

  showSidePanel: (err, geo, region) =>
    @modalContainer.hideModal()
    @filter.set(region: region)
    view = new Backbone.Views.FilterView(
      filter: @filter
    )
    @sidePanel.showView(view)
    @map.initQueryLayer(geo, region)
    


