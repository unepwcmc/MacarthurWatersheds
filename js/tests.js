(function() {
  suite('Main Controller');

  test('.index creates a RegionChooserView and shows it', function() {
    var controller, showViewArgs;
    controller = {
      mainRegion: {
        showView: sinon.spy()
      },
      changeStateOn: function() {}
    };
    Backbone.Controllers.MainController.prototype.index.call(controller);
    assert.isTrue(controller.mainRegion.showView.calledOnce, "Expected mainRegion.showView to be called");
    showViewArgs = controller.mainRegion.showView.getCall(0).args;
    return assert.strictEqual(showViewArgs[0].constructor.name, "RegionChooserView", "Expected mainRegion.showView to receive a RegionChooserView");
  });

}).call(this);

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
