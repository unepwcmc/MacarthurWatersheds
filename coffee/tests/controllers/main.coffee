suite 'Main Controller'

test('.index creates a RegionChooserView and shows it', ->
  controller = {
    mainRegion:
      showView: sinon.spy()
    changeStateOn: ->
  }

  Backbone.Controllers.MainController::index.call(controller)

  assert.isTrue controller.mainRegion.showView.calledOnce,
    "Expected mainRegion.showView to be called"

  showViewArgs = controller.mainRegion.showView.getCall(0).args

  assert.strictEqual showViewArgs[0].constructor.name, "RegionChooserView",
    "Expected mainRegion.showView to receive a RegionChooserView"
)