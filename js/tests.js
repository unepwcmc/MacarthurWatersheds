(function() {
  suite('Main Controller');

  test('The application starts by showing the choose region view and a map', function() {
    var chooseRegionActionStub, controller, showMapActionStub;
    chooseRegionActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, "chooseRegion", function() {});
    showMapActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, "showMap", function() {});
    controller = new Backbone.Controllers.MainController();
    try {
      assert.isTrue(chooseRegionActionStub.calledOnce, "Expected the chooseRegion action to be called");
      return assert.isTrue(showMapActionStub.calledOnce, "Expected the showMap action to be called");
    } finally {
      chooseRegionActionStub.restore();
      showMapActionStub.restore();
    }
  });

  test('on initialize, the controller creates a side panel after the map', function() {
    var chooseRegionActionStub, controller, showMapActionStub;
    chooseRegionActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, "chooseRegion", function() {});
    showMapActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, "showMap", function() {});
    $('body').append('<div id="map">');
    controller = new Backbone.Controllers.MainController();
    try {
      return assert.lengthOf($('body').find('#side-panel'), 1, "Expected to side a #side-panel");
    } finally {
      chooseRegionActionStub.restore();
      showMapActionStub.restore();
      $('body').remove('#map');
      $('body').remove('#side-panel');
    }
  });

  test('From the choose region view, if I pick a region, it transitions to the show action', function() {
    var chooseRegionView, controller, showActionStub;
    showActionStub = sinon.stub(Backbone.Controllers.MainController.prototype, 'showSidePanel', function() {});
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
    Backbone.Controllers.MainController.prototype.showSidePanel.call(controller);
    assert.isTrue(controller.sidePanel.showView.calledOnce, "Expected controller.sidePanel.showView to be called");
    showViewArgs = controller.sidePanel.showView.getCall(0).args;
    return assert.strictEqual(showViewArgs[0].constructor.name, "FilterView", "Expected sidePanel.showView to be called with a FilterView");
  });

}).call(this);

(function() {
  suite('Filter View');

  test('presents a choice between biodiversity and ecosystem subjects', function() {
    var view;
    view = new Backbone.Views.FilterView({
      filter: new Backbone.Models.Filter()
    });
    assert.match(view.$el.find('.subjects').text(), new RegExp('.*Biodiversity.*'));
    return assert.match(view.$el.find('.subjects').text(), new RegExp('.*Ecosystem.*'));
  });

  test('when a subject is selected the filter object is updated', function() {
    var filter, subjectElement, view;
    filter = new Backbone.Models.Filter();
    view = new Backbone.Views.FilterView({
      filter: filter
    });
    subjectElement = view.$el.find('.subjects [data-subject="biodiversity"]');
    subjectElement.trigger('click');
    return assert.strictEqual(filter.get('subject'), 'biodiversity', 'Expected the filter model subject attribute to be biodiversity');
  });

  test('if the filter has a subject, render creates a LensSelector subview with that filter', function() {
    var LensSelectorConstructorSpy, filter, filterView, lensSelectorArgs;
    LensSelectorConstructorSpy = sinon.spy(Backbone.Views, 'LensSelectorView');
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity'
    });
    filterView = new Backbone.Views.FilterView({
      filter: filter
    });
    try {
      assert.isTrue(LensSelectorConstructorSpy.calledOnce, "Expected a new LensSelectorView to be created");
      lensSelectorArgs = LensSelectorConstructorSpy.getCall(0).args;
      return assert.deepEqual(lensSelectorArgs[0].filter, filter, "Expected the LensSelectorView to be created with the biodiversity lenses");
    } finally {
      LensSelectorConstructorSpy.restore();
    }
  });

  test('if the filter does not have a subject set, no LensSelector subview is created', function() {
    var LensSelectorConstructorSpy, filter, filterView;
    LensSelectorConstructorSpy = sinon.spy(Backbone.Views, 'LensSelectorView');
    filter = new Backbone.Models.Filter();
    filterView = new Backbone.Views.FilterView({
      filter: filter
    });
    try {
      return assert.strictEqual(LensSelectorConstructorSpy.callCount, 0, "Expected a new LensSelectorView not to be created");
    } finally {
      LensSelectorConstructorSpy.restore();
    }
  });

}).call(this);

(function() {
  suite("LensSelector View");

  test('when the filter has a subject set, it renders the corresponding lenses', function() {
    var biodiversityLenses, dataSelectionBio, dataSelectionEco, ecosystemLenses, filter, lensSelectorView;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity'
    });
    lensSelectorView = new Backbone.Views.LensSelectorView({
      filter: filter
    });
    ecosystemLenses = MacArthur.CONFIG.lenses.ecosystem;
    dataSelectionEco = lensSelectorView.$el.find('select option[value="comprov"]');
    biodiversityLenses = MacArthur.CONFIG.lenses.biodiversity;
    dataSelectionBio = lensSelectorView.$el.find('select option[value="amphibia"]');
    assert.lengthOf(dataSelectionEco, 0, "Expected the LensSelectorView not to contain the ecosystem lenses");
    return assert.lengthOf(dataSelectionBio, 1, "Expected the LensSelectorView to contain the biodiversity lenses");
  });

  test('when the lenses view is initialized the default lens is set on the filter', function() {
    var filter, lensSelectorView;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity'
    });
    lensSelectorView = new Backbone.Views.LensSelectorView({
      filter: filter
    });
    return assert.strictEqual(filter.get('lens'), 'allsp', "Expected lens to be allsp");
  });

}).call(this);

(function() {
  suite('Region Chooser View');

  test('.render presents a list of the three regions', function() {
    var view;
    view = new Backbone.Views.RegionChooserView();
    assert.strictEqual(view.$el.find(".regions li[data-region-code='WAN']").text(), "Andes");
    assert.strictEqual(view.$el.find(".regions li[data-region-code='GLR']").text(), "African Great Lakes");
    return assert.strictEqual(view.$el.find(".regions li[data-region-code='MEK']").text(), "Mekong");
  });

  test("when a region is clicked, it triggers the 'regionChosen' event with the corresponding region model", function() {
    var eventArg, spy, view;
    view = new Backbone.Views.RegionChooserView();
    spy = sinon.spy();
    view.on("regionChosen", spy);
    view.$el.find(".regions li[data-region-code='MEK']").trigger('click');
    assert.isTrue(spy.calledOnce, "Expected regionChosen to be triggered");
    eventArg = spy.getCall(0).args[0];
    assert.strictEqual(eventArg.constructor.name, "Region", "Expected the event to send a Region model");
    return assert.strictEqual(eventArg.get('name'), 'Mekong', "Expected the event to be trigger with the right Region");
  });

}).call(this);
