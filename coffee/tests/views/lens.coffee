suite('Lens View')

test("render shows the title 'Lens'", ->
  view = new Backbone.Views.LensView()

  assert.match view.$el.text(), new RegExp("Lens")
)