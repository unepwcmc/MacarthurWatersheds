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

    @modalContainer = new ModalContainer
    @sidePanel = new Backbone.Diorama.ManagedRegion()
    @sidePanel.$el.attr('id', 'side-panel')
    @sidePanel.$el.insertAfter('#map')
    
    # Default state
    @chooseRegion()



  chooseRegion: =>
    regionChooserView = new Backbone.Views.RegionChooserView()
    @modalContainer.showModal(regionChooserView)

    ###
      @changeStateOn maps events published by other objects to
      controller states
    ###
    @changeStateOn(
      {event: 'regionChosen', publisher: regionChooserView, newState: @show}
    )


  show: (region) =>
    @modalContainer.hideModal()
    @sidePanel.showView(new Backbone.Views.FilterView())

