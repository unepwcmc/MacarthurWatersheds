(function() {
  suite('Main Controller');

  test('The application starts by showing the choose region view', function() {
    var chooseRegionActionStub, controller;
    chooseRegionActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, "chooseRegion", function() {});
    controller = new Backbone.Controllers.MainController();
    try {
      return assert.isTrue(chooseRegionActionStub.calledOnce, "Expected the chooseRegion action to be called");
    } finally {
      chooseRegionActionStub.restore();
    }
  });

  test('From the choose region view, if I pick a region, it transitions to the show action', function() {
    var chooseRegionView, controller, showActionStub;
    showActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, 'show', function() {});
    controller = new Backbone.Controllers.MainController();
    chooseRegionView = controller.modalContainer.view;
    try {
      assert.isNotNull(chooseRegionView, "Expected the controller to have a modal with choose region in");
      chooseRegionView.$el.find('.regions li:first').trigger('click');
      assert.isTrue(showActionStub.calledOnce, "Expected the show action to be initialized");
      return controller.modalContainer.hideModal();
    } finally {
      showActionStub.restore();
    }
  });

}).call(this);

(function() {
  suite('Lens View');

  test("render shows the title 'Lens'", function() {
    var view;
    view = new Backbone.Views.LensView();
    return assert.match(view.$el.text(), new RegExp("Lens"));
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
