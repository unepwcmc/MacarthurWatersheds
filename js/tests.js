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

  test('on initialize, the controller creates a side panel after the map', function() {
    var chooseRegionActionStub, controller;
    chooseRegionActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, "chooseRegion", function() {});
    $('body').append('<div id="map">');
    controller = new Backbone.Controllers.MainController();
    try {
      return assert.lengthOf($('body').find('#side-panel'), 1, "Expected to side a #side-panel");
    } finally {
      chooseRegionActionStub.restore();
      $('body').remove('#map');
      $('body').remove('#side-panel');
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

  test('the show action renders a filter view into the side panel', function() {
    var controller, showViewArgs;
    controller = {
      modalContainer: {
        hideModal: function() {}
      },
      sidePanel: {
        showView: sinon.spy()
      }
    };
    Backbone.Controllers.MainController.prototype.show.call(controller);
    assert.isTrue(controller.sidePanel.showView.calledOnce, "Expected controller.sidePanel.showView to be called");
    showViewArgs = controller.sidePanel.showView.getCall(0).args;
    return assert.strictEqual(showViewArgs[0].constructor.name, "FilterView", "Expected sidePanel.showView to be called with a FilterView");
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
