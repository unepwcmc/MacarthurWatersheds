suite 'Region Chooser View'

test('.render presents a list of the three regions', ->
  regions = new Backbone.Collections.RegionCollection MacArthur.CONFIG.regions
  view = new Backbone.Views.RegionChooserView({regions: regions})

  assert.strictEqual(
    view.$el.find(".regions li[data-region-code='WAN']").text(),
    "Andes"
  )
  assert.strictEqual(
    view.$el.find(".regions li[data-region-code='GLR']").text(),
    "African Great Lakes"
  )
  assert.strictEqual(
    view.$el.find(".regions li[data-region-code='MEK']").text(),
    "Mekong"
  )
)

test("when a region is clicked, it triggers the 'regionChosen' event with
  the corresponding region model", ->
  regions = new Backbone.Collections.RegionCollection MacArthur.CONFIG.regions
  view = new Backbone.Views.RegionChooserView({regions: regions})

  spy = sinon.spy()
  view.on("regionChosen", spy)

  view.$el.find(".regions li[data-region-code='MEK']").trigger('click')

  assert.isTrue spy.calledOnce,
    "Expected regionChosen to be triggered"

  eventArg = spy.getCall(0).args[0]

  assert.strictEqual eventArg.constructor.name, "Region",
    "Expected the event to send a Region model"

  assert.strictEqual eventArg.get('name'), 'Mekong',
    "Expected the event to be trigger with the right Region"
)