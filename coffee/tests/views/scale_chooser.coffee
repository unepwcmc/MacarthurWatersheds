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