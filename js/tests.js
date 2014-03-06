(function() {
  suite('Perspective View');

  test("render shows the title 'perspective'", function() {
    var view;
    view = new Backbone.Views.PerspectiveView();
    return assert.match(view.$el.text(), new RegExp("Perspective"));
  });

}).call(this);

(function() {
  suite('Region Chooser View');

  test('.render presents a list of the three regions', function() {
    var view;
    view = new Backbone.Views.RegionChooserView();
    assert.match(view.$el.find('.regions li').text(), new RegExp("Mekong"));
    assert.match(view.$el.find('.regions li').text(), new RegExp("African Great Lakes"));
    return assert.match(view.$el.find('.regions li').text(), new RegExp("Andes"));
  });

}).call(this);
