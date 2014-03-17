suite 'Main Controller'

test('The application starts by showing the choose region view and a map', ->
  chooseRegionActionStub = sinon.stub(Backbone.Controllers.MainController::, "chooseRegion", ->)
  showMapActionStub = sinon.stub(Backbone.Controllers.MainController::, "showMap", ->)
  controller = new Backbone.Controllers.MainController()

  try
    assert.isTrue chooseRegionActionStub.calledOnce, "Expected the chooseRegion action to be called"
    assert.isTrue showMapActionStub.calledOnce, "Expected the showMap action to be called"
  finally
    chooseRegionActionStub.restore()
    showMapActionStub.restore()
)

test('on initialize, the controller creates a side panel after the map', ->
  chooseRegionActionStub = sinon.stub(Backbone.Controllers.MainController::, "chooseRegion", ->)
  showMapActionStub = sinon.stub(Backbone.Controllers.MainController::, "showMap", ->)

  $('body').append('<div id="map">')
  controller = new Backbone.Controllers.MainController()

  try
    assert.lengthOf $('body').find('#side-panel'), 1,
      "Expected to side a #side-panel"
  finally
    chooseRegionActionStub.restore()
    showMapActionStub.restore()
    $('body').remove('#map')
    $('body').remove('#side-panel')
)

test('From the choose region view, if I pick a region, it transitions to the show action', ->
  showActionStub = sinon.stub(Backbone.Controllers.MainController::, 'showSidePanel', ->)
  showMapActionStub = sinon.stub(Backbone.Controllers.MainController::, "showMap", ->)
  controller = new Backbone.Controllers.MainController()

  chooseRegionView = controller.modalContainer.view

  try
    assert.isNotNull(chooseRegionView,
      "Expected the controller to have a modal with choose region in")

    chooseRegionView.$el.find('.regions li:first').trigger('click')

    assert.isTrue showActionStub.calledOnce, "Expected the show action to be initialized"

    controller.modalContainer.hideModal()

  finally
    showActionStub.restore()
    showMapActionStub.restore()
)

test('the show action renders a filter view into the side panel', ->
  controller =
    modalContainer:
      hideModal: ->
    sidePanel:
      showView: sinon.spy()
    filter: new Backbone.Models.Filter()

  Backbone.Controllers.MainController::showSidePanel.call(controller)

  assert.isTrue controller.sidePanel.showView.calledOnce,
    "Expected controller.sidePanel.showView to be called"

  showViewArgs = controller.sidePanel.showView.getCall(0).args
  assert.strictEqual showViewArgs[0].constructor.name, "FilterView" ,
    "Expected sidePanel.showView to be called with a FilterView"
)