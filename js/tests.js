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

  test('the show action renders a filter view into the side panel', function() {
    var controller, region;
    region = new Backbone.Models.Region({
      code: "WAN"
    });
    return controller = {
      modalContainer: {
        hideModal: function() {}
      },
      sidePanel: {
        showView: sinon.spy()
      },
      filter: new Backbone.Models.Filter(),
      map: {
        mapBuilder: {
          initQueryLayer: function() {}
        }
      }
    };
  });

}).call(this);

(function() {
  suite("Query Builder integration");

  test("When a filter model has its attributes changed, the 'query' attribute is updated and change:query event is fired", function() {
    var changeQuerySpy, filter, newQuery, oldQuery, queryBuilder, updatedQuery;
    filter = new Backbone.Models.Filter();
    queryBuilder = new MacArthur.QueryBuilder(filter);
    oldQuery = filter.get('query');
    changeQuerySpy = sinon.spy();
    filter.on('change:query', changeQuerySpy);
    newQuery = "SELECT BLAH BLAH BVLAH";
    sinon.stub(queryBuilder, 'buildQuery', function() {
      return newQuery;
    });
    filter.set('subject', MacArthur.CONFIG.subjects[0].selector);
    updatedQuery = filter.get('query');
    assert.notEqual(updatedQuery, oldQuery, "Expected filter.query to be modified");
    assert.strictEqual(updatedQuery, newQuery, "Expected filter.query set to the result of QueryBuilder.buildQuery");
    return assert.isTrue(changeQuerySpy.calledOnce, "Expected filter to fire a change:query event once, but fired " + changeQuerySpy.callCount + " times");
  });

}).call(this);

(function() {
  suite("QueryBuilder");

  test("When initialized it takes a Filter instance and stores it as an attribute", function() {
    var filter, queryBuilder;
    filter = new Backbone.Models.Filter();
    queryBuilder = new window.MacArthur.QueryBuilder(filter);
    assert.property(queryBuilder, 'filter');
    return assert.strictEqual(queryBuilder.filter.cid, filter.cid, "Expected filter attribute to be equal to the filter passed to the constructor");
  });

  test("When the Filter changes, buildQuery is called only once", function() {
    var buildQueryStub, count, filter, queryBuilder;
    count = 0;
    filter = new Backbone.Models.Filter();
    queryBuilder = new window.MacArthur.QueryBuilder(filter);
    buildQueryStub = sinon.stub(queryBuilder, 'buildQuery', function() {
      if (count < 5) {
        count += 1;
      }
      return 'foo';
    });
    filter.set('subject', 'xxx');
    return assert.strictEqual(buildQueryStub.callCount, 1, "Expected filter attribute to be called once");
  });

  test(".updateFilterQuery updates the filter.query with the return value of buildQuery", function() {
    var buildQueryResult, buildQueryStub, filter, queryBuilder;
    filter = new Backbone.Models.Filter();
    queryBuilder = new window.MacArthur.QueryBuilder(filter);
    buildQueryResult = "FooBar";
    buildQueryStub = sinon.stub(queryBuilder, 'buildQuery', function() {
      return buildQueryResult;
    });
    filter.set('subject', 'xxx');
    return assert.strictEqual(filter.get('query'), buildQueryResult, "Expected the filter.query attribute to be updated");
  });

  test('.buildSubjectClause constructs an SQL clause for filter.subject', function() {
    var filter, query, queryBuiler;
    filter = new Backbone.Models.Filter({
      subject: MacArthur.CONFIG.subjects[0].selector
    });
    queryBuiler = new MacArthur.QueryBuilder(filter);
    query = queryBuiler.buildSubjectClause();
    return assert.strictEqual(query, "lens.name = 'bd' ");
  });

  test('.buildSubjectClause with no subject set throws an error', function() {
    var filter, queryBuiler;
    filter = new Backbone.Models.Filter();
    queryBuiler = new MacArthur.QueryBuilder(filter);
    return assert.throws((function() {
      return queryBuiler.buildSubjectClause();
    }), "Error building query, unknown subject 'undefined'");
  });

  test('.buildSubjectClause with unknown subject throws an error', function() {
    var filter, queryBuiler;
    filter = new Backbone.Models.Filter({
      subject: 'wofjefhsdjkgh'
    });
    queryBuiler = new MacArthur.QueryBuilder(filter);
    return assert.throws((function() {
      return queryBuiler.buildSubjectClause();
    }), "Error building query, unknown subject '" + (filter.get('subject')) + "'");
  });

  test('.buildLensClause constructs an SQL clause for filter.lens', function() {
    var filter, query, queryBuiler;
    filter = new Backbone.Models.Filter({
      subject: MacArthur.CONFIG.subjects[1].selector,
      lens: MacArthur.CONFIG.lenses.ecosystem[0].selector
    });
    queryBuiler = new MacArthur.QueryBuilder(filter);
    query = queryBuiler.buildLensClause();
    return assert.strictEqual(query, "lens.type = 'totef' ");
  });

  test('.buildLensClause when no lens is specified sets the default to all species');

  test('if the filter lens is set with the wrong subject, hasRequiredFilters returns false', function() {
    var filter, query, queryBuiler;
    filter = new Backbone.Models.Filter({
      subject: MacArthur.CONFIG.subjects[1].selector,
      lens: MacArthur.CONFIG.lenses.biodiversity[0].selector
    });
    queryBuiler = new MacArthur.QueryBuilder(filter);
    query = queryBuiler.buildLensClause();
    return assert.isFalse(queryBuiler.hasRequiredFilters());
  });

  test('if the filter lens is set with the correct subject, hasRequiredFilters returns true', function() {
    var filter, query, queryBuiler;
    filter = new Backbone.Models.Filter({
      subject: MacArthur.CONFIG.subjects[1].selector,
      lens: MacArthur.CONFIG.lenses.ecosystem[0].selector
    });
    queryBuiler = new MacArthur.QueryBuilder(filter);
    query = queryBuiler.buildLensClause();
    return assert.isTrue(queryBuiler.hasRequiredFilters());
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
      assert.isTrue(LensSelectorConstructorSpy.callCount > 0, "Expected a new LensSelectorView to be created");
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

  test('when the lenses view is initialized the default lens for the filter subject is set on the filter', function() {
    var changeSpy, filter, lensSelectorView;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity'
    });
    changeSpy = sinon.spy();
    filter.on('change:lens', changeSpy);
    lensSelectorView = new Backbone.Views.LensSelectorView({
      filter: filter
    });
    assert.strictEqual(filter.get('lens'), 'allsp', "Expected lens to be allsp");
    return assert.strictEqual(changeSpy.callCount, 1);
  });

  test('it shows the current lens selected', function() {
    var filter, lensSelectorView, selection;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity',
      lens: 'amphibia'
    });
    lensSelectorView = new Backbone.Views.LensSelectorView({
      filter: filter
    });
    selection = lensSelectorView.$el.find('select').find(":selected").attr('value');
    return assert.strictEqual(selection, 'amphibia', "Expected selection value to match the filter lens attribute");
  });

}).call(this);

(function() {
  suite("LevelSelector View");

  test('when the filter has a subject set, it renders the corresponding levels', function() {
    var dataSelectionHigh, ecosystemLenses, filter, levelSelectorView, levels;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity'
    });
    levelSelectorView = new Backbone.Views.LevelSelectorView({
      filter: filter
    });
    ecosystemLenses = MacArthur.CONFIG.lenses.ecosystem;
    levels = MacArthur.CONFIG.levels;
    dataSelectionHigh = levelSelectorView.$el.find('select option[value="high"]');
    return assert.lengthOf(dataSelectionHigh, 1, "Expected the levelSelectorView to contain the high level");
  });

  test('when the level view is initialized the default level for the filter subject is set on the filter', function() {
    var changeSpy, filter, levelSelectorView;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity'
    });
    changeSpy = sinon.spy();
    filter.on('change:level', changeSpy);
    levelSelectorView = new Backbone.Views.LevelSelectorView({
      filter: filter
    });
    assert.strictEqual(filter.get('level'), 'all', "Expected level to be high");
    return assert.strictEqual(changeSpy.callCount, 1);
  });

  test('it shows the current level selected', function() {
    var filter, levelSelectorView, selection;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity',
      level: 'medium'
    });
    levelSelectorView = new Backbone.Views.LevelSelectorView({
      filter: filter
    });
    selection = levelSelectorView.$el.find('select').find(":selected").attr('value');
    return assert.strictEqual(selection, 'medium', "Expected selection value to match the filter level attribute");
  });

  test('Level selector should show `all` selected when `all` is selected', function() {
    var filter, levelSelectorView;
    filter = new Backbone.Models.Filter({
      level: 'low'
    });
    levelSelectorView = new Backbone.Views.LevelSelectorView({
      filter: filter
    });
    levelSelectorView.$el.find("select").val('all');
    levelSelectorView.$el.find("select").trigger('change');
    assert.strictEqual(filter.get('level'), 'all', "Expected filter level to be equal to 'all'");
    assert.strictEqual(levelSelectorView.$el.find("select").val(), 'all', "Expected selected option to be equal to 'all'");
    return assert.strictEqual(levelSelectorView.$el.find('[selected]').length, 1, "Expected only one <option> to have the 'selected' attribute");
  });

}).call(this);

(function() {
  suite('Map View');

  test('When the filter query attribute changes, updateQueryLayer is called', function() {
    var filter, initBaseLayerStub, mapView, updateQueryLayerStub;
    initBaseLayerStub = sinon.stub(Backbone.Views.MapView.prototype, 'initBaseLayer', function() {});
    updateQueryLayerStub = sinon.stub(Backbone.Views.MapView.prototype, 'updateQueryLayer', function() {});
    filter = new Backbone.Models.Filter();
    mapView = new Backbone.Views.MapView({
      filter: filter
    });
    filter.set('query', 'my query');
    try {
      return assert.strictEqual(updateQueryLayerStub.callCount, 1, "expected updateQueryLayer to be called once");
    } finally {
      initBaseLayerStub.restore();
      updateQueryLayerStub.restore();
    }
  });

  test('.buildQuerydata should return an object with keys as watershed_ids and values as other objects with value and protection_percentage', function() {
    var filter, initBaseLayerStub, mapView, querydata, rows;
    initBaseLayerStub = sinon.stub(Backbone.Views.MapView.prototype, 'initBaseLayer', function() {});
    rows = [
      {
        watershed_id: 2805,
        value: 8.6066515929,
        protection_percentage: 59.1202577939
      }, {
        watershed_id: 2814,
        value: 106.4846311487,
        protection_percentage: 26.6124303217
      }, {
        watershed_id: 2815,
        value: 33.0610034886,
        protection_percentage: 18.2542237936
      }
    ];
    filter = new Backbone.Models.Filter();
    mapView = new Backbone.Views.MapView({
      filter: filter
    });
    querydata = mapView.buildQuerydata(rows);
    return assert.strictEqual(querydata[2805].protectionPercentage, 59.1202577939);
  });

}).call(this);

(function() {
  var filter, protectionOptionView, protectionSelectorView;

  suite("ProtectionOption View");

  filter = null;

  protectionOptionView = null;

  protectionSelectorView = null;

  beforeEach(function() {
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity',
      protection: false
    });
    protectionOptionView = new Backbone.Views.ProtectionOptionView({
      filter: filter
    });
    return protectionSelectorView = new Backbone.Views.ProtectionSelectorView({
      filter: filter
    });
  });

  afterEach(function() {
    filter = null;
    protectionOptionView = null;
    return protectionSelectorView = null;
  });

  test('when the filter has a subject set, it renders the protection option', function() {
    var selection;
    selection = protectionOptionView.$el.find('input:checkbox');
    return assert.lengthOf(selection, 1, "Expected the protection checkbox button to be present");
  });

  test('when the checkbox button is checked, the protection filter is set to true', function() {
    var protection, setProtectionSpy;
    setProtectionSpy = sinon.spy(Backbone.Views.ProtectionOptionView.prototype, 'setProtection');
    protectionOptionView = new Backbone.Views.ProtectionOptionView({
      filter: filter
    });
    protectionOptionView.$el.find("[type='checkbox']").attr('checked', true);
    protectionOptionView.$el.find("[type='checkbox']").trigger('change');
    protection = filter.get('protection');
    try {
      assert.strictEqual(setProtectionSpy.callCount, 1, "Expected setProtection to be called");
      return assert.isTrue(protection, "Expected the protection filter attribute to be true");
    } finally {
      setProtectionSpy.restore();
    }
  });

  test('when the filter has protection set to true, the protection option is checked', function() {
    var selection;
    filter.set('protection', true);
    selection = protectionOptionView.$el.find('input:checkbox').val();
    return assert.equal(selection, 'on', "Expected the protection checkbox button to be checked");
  });

  test('when the filter has protection set to true, the protection selector is visible and populated with options', function() {
    var selection;
    filter.set('protection', true);
    selection = protectionSelectorView.$el.find('select');
    assert.lengthOf(selection, 1, "Expected the protection select to be visible");
    return assert.lengthOf(selection.find('option'), 3, "Expected the dropdown to have 3 selections: high, medium, low");
  });

  test('when the filter has protection set to true, the query on the selector object is NOT updated', function() {
    var buildQuerySpy, queryBuilder, regions;
    regions = new Backbone.Collections.RegionCollection(MacArthur.CONFIG.regions);
    filter.set('region', regions.models[0]);
    filter.set('lens', 'allsp');
    buildQuerySpy = sinon.spy(MacArthur.QueryBuilder.prototype, 'buildQuery');
    queryBuilder = new MacArthur.QueryBuilder(filter);
    filter.set('protection', true);
    return assert.strictEqual(buildQuerySpy.callCount, 0, "Expected the buildQuery method to be called once");
  });

  test('when the filter has protection set to false, the protection_level is unset on the selector object', function() {
    var defaultProtectionLevel;
    defaultProtectionLevel = _.find(MacArthur.CONFIG.protectionLevels, function(pl) {
      return pl["default"] === true;
    }).selector;
    filter.set('protection', true);
    filter.set('protectionLevel', defaultProtectionLevel);
    protectionOptionView.$el.find("[type='checkbox']").attr('checked', false);
    protectionOptionView.$el.find("[type='checkbox']").trigger('change');
    return assert.isUndefined(filter.get('protection_level'), "Expected the protection_level filter to be undefined");
  });

}).call(this);

(function() {
  var ProtectionOptionView, filter, protectionSelectorView;

  suite("ProtectionSelector View");

  filter = null;

  ProtectionOptionView = null;

  protectionSelectorView = null;

  beforeEach(function() {
    var protectionOptionView;
    filter = new Backbone.Models.Filter({
      subject: 'biodiversity',
      protection: false
    });
    return protectionOptionView = new Backbone.Views.ProtectionOptionView({
      filter: filter
    });
  });

  afterEach(function() {
    filter = null;
    return protectionSelectorView;
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
