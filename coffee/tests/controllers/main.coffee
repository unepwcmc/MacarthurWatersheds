suite 'Main Controller'

test('The application starts by showing the choose region view and a map', ->
  showMapActionStub = sinon.stub(Backbone.Controllers.MainController::, "showMap", ->)
  controller = new Backbone.Controllers.MainController()

  try
    assert.isTrue showMapActionStub.calledOnce, "Expected the showMap action to be called"
  finally
    showMapActionStub.restore()
)