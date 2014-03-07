(function() {
  suite('Main Controller');

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
    assert.strictEqual(view.$el.find(".regions li[data-region-id='1']").text(), "Andes");
    assert.strictEqual(view.$el.find(".regions li[data-region-id='2']").text(), "African Great Lakes");
    return assert.strictEqual(view.$el.find(".regions li[data-region-id='3']").text(), "Mekong");
  });

  test("when a region is clicked, it triggers the 'regionChosen' event with the corresponding region model", function() {
    var eventArg, spy, view;
    view = new Backbone.Views.RegionChooserView();
    spy = sinon.spy();
    view.on("regionChosen", spy);
    view.$el.find(".regions li[data-region-id='3']").trigger('click');
    assert.isTrue(spy.calledOnce, "Expected regionChosen to be triggered");
    eventArg = spy.getCall(0).args[0];
    assert.strictEqual(eventArg.constructor.name, "Region", "Expected the event to send a Region model");
    return assert.strictEqual(eventArg.get('name'), 'Mekong', "Expected the event to be trigger with the right Region");
  });

}).call(this);
