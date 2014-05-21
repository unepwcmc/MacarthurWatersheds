suite 'Scale Chooser View'

test('.render presents a list of the two scales', ->
  scales = new Backbone.Collections.ScaleCollection MacArthur.CONFIG.scales
  view = new Backbone.Views.ScaleChooserView({scales: scales})

  assert.strictEqual(
    view.$el.find(".scales .scale-area.scale-link[data-scale-code='broadscale']").text(),
    "Global"
  )
  assert.strictEqual(
    view.$el.find(".scales .scale-area.scale-link[data-scale-code='regional']").text(),
    "Regional"
  )
)

test("when a scale is clicked, it triggers the 'scaleChosen' event with
  the corresponding scale model", ->
  scales = new Backbone.Collections.ScaleCollection MacArthur.CONFIG.scales
  view = new Backbone.Views.ScaleChooserView({scales: scales})

  spy = sinon.spy()
  view.on("scaleChosen", spy)

  view.$el.find(".scales .scale-area.scale-link[data-scale-code='broadscale']").trigger('click')

  assert.isTrue spy.calledOnce,
    "Expected scaleChosen to be triggered"

  eventArg = spy.getCall(0).args[0]

  assert.strictEqual eventArg.constructor.name, "Scale",
    "Expected the event to send a Scale model"

  assert.strictEqual eventArg.get('name'), 'Global',
    "Expected the event to be trigger with the right Scale"
)