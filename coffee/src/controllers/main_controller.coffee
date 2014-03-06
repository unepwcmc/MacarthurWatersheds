window.Backbone ||= {}
window.Backbone.Controllers ||= {}

class Backbone.Controllers.MainController extends Backbone.Diorama.Controller
  constructor: ->
    @mainRegion = new Backbone.Diorama.ManagedRegion()
    $('body').append(@mainRegion.$el)
    
    # Default state
    @index()


  index: =>
    regionChooserView = new Backbone.Views.RegionChooserView()
    @mainRegion.showView(regionChooserView)

    ###
      @changeStateOn maps events published by other objects to
      controller states
    ###
    @changeStateOn(
    #  {event: 'someEvent', publisher: indexView, newState: @anotherState}
    )

