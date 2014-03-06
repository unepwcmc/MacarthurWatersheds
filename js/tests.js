(function() {
  suite('Perspective View');

  test("render shows the title 'perspective'", function() {
    var view;
    view = new Backbone.Views.PerspectiveView();
    return assert.match(view.$el.text(), new RegExp("Perspective"));
  });

}).call(this);
