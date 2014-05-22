suite 'Region Chooser View'

test('.render presents a list of the three regions', ->
  regions = new Backbone.Collections.RegionCollection MacArthur.CONFIG.regions
  view = new Backbone.Views.RegionChooserView({regions: regions})

  assert.strictEqual(
    view.$el.find(".regions .region-area.region-link[data-region-code='WAN']").text(),
    "Andes"
  )
  assert.strictEqual(
    view.$el.find(".regions .region-area.region-link[data-region-code='GLR']").text(),
    "African Great Lakes"
  )
  assert.strictEqual(
    view.$el.find(".regions .region-area.region-link[data-region-code='MEK']").text(),
    "Mekong"
  )
)