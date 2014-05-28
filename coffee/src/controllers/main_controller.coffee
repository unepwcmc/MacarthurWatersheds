window.Backbone ||= {}
window.Backbone.Controllers ||= {}

class ModalContainer
  constructor: ->
    @disabler = $('<div class="disabler"></div>')
    @views = []

  showModal: (view) ->
    @views.push view
    $('body').prepend(@disabler)
    $('body').append(view.$el)

  hideModal: ->
    $('body').find('.disabler').remove()
    for view in @views
      view.close()
    @views = []

class Backbone.Controllers.MainController extends Backbone.Diorama.Controller
  constructor: ->
    @regions = new Backbone.Collections.RegionCollection MacArthur.CONFIG.regions
    @scales = new Backbone.Collections.ScaleCollection MacArthur.CONFIG.scales
    @filter = new Backbone.Models.Filter()
    @resultsNumber = new Backbone.Models.ResultsNumber()
    @queryBuilder = new window.MacArthur.QueryBuilder(@filter)
    @modalContainer = new ModalContainer()
    @sidePanel = new Backbone.Diorama.ManagedRegion()
    @sidePanel.$el.attr('id', 'side-panel')
    @sidePanel.$el.insertAfter('#map')
    
    # Default state
    @map = @showMap()
 
    Backbone.appRouter = new Backbone.Router.AppRouter({
      regions: @regions
      scales: @scales
      modalContainer: @modalContainer
      filter: @filter
      sidePanel: @sidePanel
      map: @map
      resultsNumber: @resultsNumber
    })

    Backbone.history.start()

  showMap: =>
    new Backbone.Views.MapView(
      filter: @filter 
      resultsNumber: @resultsNumber
    )
