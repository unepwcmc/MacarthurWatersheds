suite 'Main Controller'

test('The application starts by showing the choose region view', ->
  chooseRegionActionStub = sinon.stub(Backbone.Controllers.MainController::, "chooseRegion", ->)
  controller = new Backbone.Controllers.MainController()

  try
    assert.isTrue chooseRegionActionStub.calledOnce, "Expected the chooseRegion action to be called"
  finally
    chooseRegionActionStub.restore()
)

test('From the choose region view, if I pick a region, it transitions to the show action', ->
  showActionStub = sinon.stub(Backbone.Controllers.MainController::, 'show', ->)
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
)
