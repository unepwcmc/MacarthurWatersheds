suite 'Region Chooser View'

test('.render presents a list of the three regions', ->
  view = new Backbone.Views.RegionChooserView()

  assert.match view.$el.find('.regions li').text(), new RegExp("Mekong")
  assert.match view.$el.find('.regions li').text(), new RegExp("African Great Lakes")
  assert.match view.$el.find('.regions li').text(), new RegExp("Andes")
)