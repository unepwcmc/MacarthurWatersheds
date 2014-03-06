suite('Perspective View')

test("render shows the title 'perspective'", ->
  view = new Backbone.Views.PerspectiveView()

  assert.match view.$el.text(), new RegExp("Perspective")
)