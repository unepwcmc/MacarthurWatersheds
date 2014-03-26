(function() {
  window.MacArthur || (window.MacArthur = {});

  MacArthur.CONFIG = {
    tabs: [
      {
        selector: "now",
        name: "Now"
      }, {
        selector: "change",
        name: "Change"
      }, {
        selector: "future_threats",
        name: "Future Threats"
      }
    ],
    regions: [
      {
        code: "WAN",
        name: "Andes",
        bounds: [[-22, -57], [14, -83]]
      }, {
        code: "MEK",
        name: "Mekong",
        bounds: [[6, 110], [35, 90]]
      }, {
        code: "GLR",
        name: "African Great Lakes",
        bounds: [[-18, 30], [10, 40]]
      }
    ],
    subjects: [
      {
        selector: "biodiversity",
        name: "Biodiversity"
      }, {
        selector: "ecosystem",
        name: "Ecosystem"
      }
    ],
    lenses: {
      biodiversity: [
        {
          selector: "allsp",
          name: "All species",
          "default": true
        }, {
          selector: "crenvu",
          name: "All threatened"
        }, {
          selector: "amphibia",
          name: "Amphibians"
        }, {
          selector: "mammalia",
          name: "Mammals"
        }, {
          selector: "aves",
          name: "Birds"
        }
      ],
      ecosystem: [
        {
          selector: "totef",
          name: "Total EF provision",
          "default": true
        }, {
          selector: "comprov",
          name: "Commodity provision (cultivated products)"
        }, {
          selector: "wildprov",
          name: "Wild provision"
        }, {
          selector: "regprov",
          name: "Regulating functions provision"
        }
      ]
    },
    scenarios: [
      {
        selector: "mf2050",
        name: "Markets first"
      }, {
        selector: "susf2050",
        name: "Sustainability first"
      }, {
        selector: "secf2050",
        name: "Security first"
      }, {
        selector: "polf2050",
        name: "Policy first"
      }
    ],
    levels: [
      {
        selector: "all",
        name: "All",
        "default": true
      }, {
        selector: "high",
        name: "High"
      }, {
        selector: "medium",
        name: "Medium"
      }, {
        selector: "low",
        name: "Low"
      }
    ],
    protectionLevels: [
      {
        selector: "high",
        name: "Completely covered by PA’s",
        "default": true
      }, {
        selector: "medium",
        name: "Up to two thirds covered"
      }, {
        selector: "low",
        name: "Up to one third covered"
      }
    ],
    pressureLevels: [
      {
        selector: "high",
        name: "High",
        "default": true
      }, {
        selector: "medium",
        name: "Medium"
      }, {
        selector: "low",
        name: "Low"
      }
    ],
    agrCommDevLevels: [
      {
        selector: "high",
        name: "High",
        "default": true
      }, {
        selector: "medium",
        name: "Medium"
      }, {
        selector: "low",
        name: "Low"
      }, {
        selector: "negative",
        name: "Decrease"
      }
    ]
  };

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (_base = window.Backbone).Models || (_base.Models = {});

  window.Backbone.Models.Filter = (function(_super) {
    __extends(Filter, _super);

    function Filter() {
      return Filter.__super__.constructor.apply(this, arguments);
    }

    Filter.prototype.defaults = {
      tab: 'now'
    };

    return Filter;

  })(Backbone.Model);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.MacArthur || (window.MacArthur = {});

  window.MacArthur.QueryBuilder = (function() {
    function QueryBuilder(filter) {
      this.filter = filter;
      this.updateFilterQuery = __bind(this.updateFilterQuery, this);
      this.filter.on('change', this.updateFilterQuery);
    }

    QueryBuilder.prototype.buildQuery = function() {
      var regionCode;
      if (this.hasRequiredFilters()) {
        regionCode = this.filter.get('region').get('code');
        return "SELECT d.watershed_id, d.value, percentage as protection_percentage,\npressure.value as pressure_index \nFROM macarthur_region r \nRIGHT JOIN macarthur_watershed w on r.cartodb_id = w.region_id \nLEFT JOIN macarthur_datapoint d on d.watershed_id = w.cartodb_id \nLEFT JOIN macarthur_lens lens on lens.cartodb_id = d.lens_id \nLEFT JOIN macarthur_protection p on p.watershed_id = w.cartodb_id \nLEFT JOIN macarthur_pressure pressure on pressure.watershed_id = w.cartodb_id \nWHERE r.code = '" + regionCode + "' \nAND " + (this.buildSubjectClause()) + " \nAND " + (this.buildLensClause()) + "\nAND metric = 'imp' \nAND " + (this.buildScenarioClause()) + " \nAND type_data = 'value'";
      } else {
        return this.filter.get('query');
      }
    };

    QueryBuilder.prototype.buildSubjectClause = function() {
      var name, subjectCode, subjectsMap;
      subjectCode = this.filter.get('subject');
      subjectsMap = {
        'biodiversity': 'bd',
        'ecosystem': 'ef'
      };
      name = subjectsMap[subjectCode];
      if (name == null) {
        throw new Error("Error building query, unknown subject '" + subjectCode + "'");
      }
      return "lens.name = '" + name + "' ";
    };

    QueryBuilder.prototype.buildScenarioClause = function() {
      var scenario;
      scenario = this.filter.get('scenario');
      if (scenario != null) {
        return "scenario = '" + scenario + "' ";
      } else {
        return "scenario = 'bas' ";
      }
    };

    QueryBuilder.prototype.buildLensClause = function() {
      var lensCode;
      lensCode = this.filter.get('lens');
      return "lens.type = '" + lensCode + "' ";
    };

    QueryBuilder.prototype.hasLens = function(subjectCode, lensCode) {
      return _.find(MacArthur.CONFIG.lenses[subjectCode], (function(_this) {
        return function(lens) {
          return lens.selector === lensCode;
        };
      })(this)) != null;
    };

    QueryBuilder.prototype.hasRequiredFilters = function() {
      var lensCode, subjectCode;
      subjectCode = this.filter.get('subject');
      lensCode = this.filter.get('lens');
      if ((subjectCode != null) && (lensCode != null)) {
        return this.hasLens(subjectCode, lensCode);
      }
      return false;
    };

    QueryBuilder.prototype.isFromProtection = function() {
      return (this.filter.changedAttributes().protection != null) || (this.filter.changedAttributes().protection_levels != null);
    };

    QueryBuilder.prototype.isFromPressure = function() {
      return (this.filter.changedAttributes().pressure != null) || (this.filter.changedAttributes().pressure_levels != null);
    };

    QueryBuilder.prototype.tabHasSelections = function() {
      var lensCode, scenarioCode, subjectCode, tab;
      tab = this.filter.get('tab');
      if (tab !== 'change') {
        return false;
      }
      scenarioCode = this.filter.get('scenario');
      subjectCode = this.filter.get('subject');
      lensCode = this.filter.get('lens');
      if ((subjectCode != null) && (lensCode != null) && (scenarioCode != null)) {
        return false;
      }
      return true;
    };

    QueryBuilder.prototype.updateFilterQuery = function(model, event) {
      if (!((this.filter.changedAttributes().query != null) || this.isFromProtection() || this.isFromPressure() || this.tabHasSelections())) {
        return this.filter.set('query', this.buildQuery(this.filter));
      }
    };

    return QueryBuilder;

  })();

}).call(this);

(function() {
  var _base, _base1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Models || (_base.Models = {});

  (_base1 = window.Backbone).Collections || (_base1.Collections = {});

  Backbone.Models.Region = (function(_super) {
    __extends(Region, _super);

    function Region() {
      return Region.__super__.constructor.apply(this, arguments);
    }

    return Region;

  })(Backbone.Model);

  Backbone.Collections.RegionCollection = (function(_super) {
    __extends(RegionCollection, _super);

    function RegionCollection() {
      return RegionCollection.__super__.constructor.apply(this, arguments);
    }

    RegionCollection.prototype.model = Backbone.Models.Region;

    return RegionCollection;

  })(Backbone.Collection);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.TabView = (function(_super) {
    __extends(TabView, _super);

    function TabView() {
      this.setTab = __bind(this.setTab, this);
      return TabView.__super__.constructor.apply(this, arguments);
    }

    TabView.prototype.template = Handlebars.templates['tab'];

    TabView.prototype.events = {
      "click ul.tabs li": "setTab"
    };

    TabView.prototype.initialize = function(options) {
      this.config = _.cloneDeep(MacArthur.CONFIG.tabs);
      this.filter = options.filter;
      return this.render();
    };

    TabView.prototype.render = function() {
      var tabs;
      tabs = _.map(this.config, (function(_this) {
        return function(tab) {
          if (_this.filter.get('tab') === tab.selector) {
            tab.active = true;
          } else {
            tab.active = false;
          }
          return tab;
        };
      })(this));
      this.$el.html(this.template({
        thisView: this,
        filter: this.filter,
        tabs: tabs
      }));
      this.attachSubViews();
      return this;
    };

    TabView.prototype.onClose = function() {};

    TabView.prototype.setTab = function(event) {
      var tabName;
      tabName = $(event.target).attr('data-subject');
      if (tabName === this.filter.get('tab')) {
        return;
      }
      this.resetFilters();
      this.filter.set('tab', tabName);
      return this.render();
    };

    TabView.prototype.resetFilters = function() {
      this.filter.unset('subject');
      this.filter.unset('lens');
      return this.filter.unset('level');
    };

    return TabView;

  })(Backbone.Diorama.NestingView);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.BaseSelectorView = (function(_super) {
    __extends(BaseSelectorView, _super);

    function BaseSelectorView() {
      this.setDefaultLevel = __bind(this.setDefaultLevel, this);
      return BaseSelectorView.__super__.constructor.apply(this, arguments);
    }

    BaseSelectorView.prototype.initialize = function(options) {
      return this.filter = options.filter;
    };

    BaseSelectorView.prototype.render = function() {
      var levels, theSelect;
      levels = _.map(this.config, (function(_this) {
        return function(level) {
          if (_this.filter.get(_this.levelType) === level.selector) {
            level.selected = true;
          } else {
            level.selected = false;
          }
          return level;
        };
      })(this));
      this.$el.html(this.template({
        levels: levels
      }));
      theSelect = this.$el.find('.select-box');
      return setTimeout(function() {
        return theSelect.customSelect();
      }, 100);
    };

    BaseSelectorView.prototype.setLevel = function(event) {
      var level;
      level = $(event.target).find(':selected').attr('value');
      return this.filter.set(this.levelType, level);
    };

    BaseSelectorView.prototype.setDefaultLevel = function() {
      return this.filter.set(this.levelType, this.getDefaultFilter().selector);
    };

    BaseSelectorView.prototype.getDefaultFilter = function() {
      return _.find(this.config, function(obj) {
        return obj["default"] != null;
      });
    };

    return BaseSelectorView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      this.queryPolyStyle = __bind(this.queryPolyStyle, this);
      this.getFillOpacity = __bind(this.getFillOpacity, this);
      this.setPressureFill = __bind(this.setPressureFill, this);
      this.setProtectionFill = __bind(this.setProtectionFill, this);
      this.filterFeatureLevel = __bind(this.filterFeatureLevel, this);
      this.getColor = __bind(this.getColor, this);
      this.updateQueryLayerStyle = __bind(this.updateQueryLayerStyle, this);
      this.buildQuerydata = __bind(this.buildQuerydata, this);
      this.setMinMax = __bind(this.setMinMax, this);
      this.updateQueryLayer = __bind(this.updateQueryLayer, this);
      this.bindPopup = __bind(this.bindPopup, this);
      return MapView.__super__.constructor.apply(this, arguments);
    }

    MapView.prototype.template = Handlebars.templates['map'];

    MapView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.initBaseLayer();
      this.listenTo(this.filter, 'change:query', this.updateQueryLayer);
      this.listenTo(this.filter, 'change:level', this.updateQueryLayerStyle);
      this.listenTo(this.filter, 'change:protectionLevel', this.updateQueryLayerStyle);
      return this.listenTo(this.filter, 'change:pressureLevel', this.updateQueryLayerStyle);
    };

    MapView.prototype.sortDataBy = function(data, field) {
      return _.map(_.sortBy(data, field), function(row, i) {
        row.rank = i;
        return row;
      });
    };

    MapView.prototype.initBaseLayer = function() {
      this.map = L.map('map', {
        scrollWheelZoom: false
      }).setView([0, 0], 2);
      this.queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?';
      return L.tileLayer('https://a.tiles.mapbox.com/v3/timwilki.himjd69g/{z}/{x}/{y}.png', {
        attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
      }).addTo(this.map);
    };

    MapView.prototype.initQueryLayer = function(geo, region) {
      var regionBounds, regionCode;
      this.region = region;
      regionCode = region.get('code');
      regionBounds = region.get('bounds');
      this.categories = 3;
      this.collection = topojson.feature(geo, geo.objects[regionCode]);
      this.interiors = topojson.mesh(geo, geo.objects[regionCode]);
      this.queryLayer = L.geoJson(this.collection, {
        style: this.basePolyStyle
      }).addTo(this.map);
      this.queryLayerInteriors = L.geoJson(this.interiors, {
        style: this.baseLineStyle
      }).addTo(this.map);
      this.queryLayer;
      return this.map.fitBounds(regionBounds);
    };

    MapView.prototype.bindPopup = function(feature, layer) {
      var id, popupOptions, w;
      id = layer.feature.properties.cartodb_id;
      w = _.find(this.data, function(row) {
        return row.watershed_id === id;
      });
      popupOptions = {
        maxWidth: 200
      };
      return layer.bindPopup("Value: " + (w.value.toFixed(2)) + " <br>\nPressure Index: " + w.pressure_index + " <br>\nProtection Percentage: " + (w.protection_percentage.toFixed(2)) + " <br>", popupOptions);
    };

    MapView.prototype.updateQueryLayer = function() {
      var q;
      this.map.removeLayer(this.queryLayer);
      this.styleValueField = 'rank';
      q = this.filter.get('query');
      if (q == null) {
        return;
      }
      return $.getJSON("https://carbon-tool.cartodb.com/api/v2/sql?q=" + q, (function(_this) {
        return function(data) {
          _this.data = _this.sortDataBy(data.rows, 'value');
          _this.setMinMax();
          _this.querydata = _this.buildQuerydata(_this.data);
          _this.queryLayer = L.geoJson(_this.collection, {
            style: _this.queryPolyStyle,
            onEachFeature: _this.bindPopup
          }).addTo(_this.map);
          return _this.queryLayerInteriors.bringToFront();
        };
      })(this));
    };

    MapView.prototype.setMinMax = function(type) {
      this.max = {
        'value': this.data[this.data.length - 1].value,
        'rank': this.data.length
      };
      this.min = {
        'value': this.data[0].value,
        'rank': 0
      };
      return this;
    };

    MapView.prototype.buildQuerydata = function(data) {
      return _.object(_.map(data, (function(_this) {
        return function(x) {
          return [
            x.watershed_id, {
              rank: x.rank,
              value: x.value,
              protectionPercentage: x.protection_percentage,
              pressureIndex: x.pressure_index
            }
          ];
        };
      })(this)));
    };

    MapView.prototype.updateQueryLayerStyle = function() {
      if (this.querydata != null) {
        return this.queryLayer.setStyle(this.queryPolyStyle);
      }
    };

    MapView.prototype.getColor = function(feature) {
      var d, p, range;
      d = this.querydata[feature];
      p = d[this.styleValueField] - this.min[this.styleValueField];
      range = (this.max[this.styleValueField] - this.min[this.styleValueField]) / this.categories;
      if (p >= this.min[this.styleValueField] + range * 2) {
        return '#e6550d';
      }
      if (p >= this.min[this.styleValueField] + range) {
        return '#fdae6b';
      }
      if (p >= this.min[this.styleValueField]) {
        return '#fee6ce';
      }
      return '#fff';
    };

    MapView.prototype.filterFeatureLevel = function(id) {
      var d, level, range;
      level = this.filter.get('level');
      range = (this.max[this.styleValueField] - this.min[this.styleValueField]) / this.categories;
      d = this.querydata[id];
      if (level === 'all') {
        return true;
      }
      if (level === 'high') {
        if (d[this.styleValueField] >= this.min[this.styleValueField] + range * 2) {
          return true;
        }
      }
      if (level === 'medium') {
        if (d[this.styleValueField] >= this.min[this.styleValueField] + range && d[this.styleValueField] < this.min[this.styleValueField] + range * 2) {
          return true;
        }
      }
      if (level === 'low') {
        if (d[this.styleValueField] >= this.min[this.styleValueField] && d[this.styleValueField] < this.min[this.styleValueField] + range) {
          return true;
        }
      }
      return false;
    };

    MapView.prototype.setProtectionFill = function(op, d) {
      var protectionLevel;
      protectionLevel = this.filter.get('protectionLevel');
      if (protectionLevel === 'high') {
        if (!(d.protectionPercentage >= 66)) {
          op = 0;
        }
      }
      if (protectionLevel === 'medium') {
        if (!(d.protectionPercentage >= 33 && d.protectionPercentage < 66)) {
          op = 0;
        }
      }
      if (protectionLevel === 'low') {
        if (!(d.protectionPercentage < 33)) {
          op = 0;
        }
      }
      return op;
    };

    MapView.prototype.setPressureFill = function(op, d) {
      var pressureLevel;
      pressureLevel = this.filter.get('pressureLevel');
      if (pressureLevel === 'high') {
        if (!(d.pressureIndex >= .66)) {
          op = 0;
        }
      }
      if (pressureLevel === 'medium') {
        if (!(d.pressureIndex >= .33 && d.pressureIndex < .66)) {
          op = 0;
        }
      }
      if (pressureLevel === 'low') {
        if (!(d.pressureIndex < .33)) {
          op = 0;
        }
      }
      return op;
    };

    MapView.prototype.getFillOpacity = function(feature) {
      var d, op;
      op = .9;
      d = this.querydata[feature];
      if (this.filter.get('protection') === true) {
        op = this.setProtectionFill(op, d);
      }
      if (this.filter.get('pressure') === true) {
        op = this.setPressureFill(op, d);
      }
      return op;
    };

    MapView.prototype.baseLineStyle = function(feature) {
      return {
        weight: 1.2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0
      };
    };

    MapView.prototype.basePolyStyle = function(feature) {
      return {
        weight: 0,
        opacity: 0,
        fillOpacity: 0
      };
    };

    MapView.prototype.queryPolyStyle = function(feature) {
      var fillColor, fillOpacity, id;
      id = feature.properties.cartodb_id;
      if (this.filterFeatureLevel(id)) {
        fillOpacity = this.getFillOpacity(id);
        fillColor = this.getColor(id);
      } else {
        fillOpacity = 0;
        fillColor = 0;
      }
      return {
        weight: 0,
        opacity: 0,
        fillOpacity: fillOpacity,
        fillColor: fillColor
      };
    };

    MapView.prototype.onClose = function() {
      return this.remove();
    };

    return MapView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.RegionChooserView = (function(_super) {
    __extends(RegionChooserView, _super);

    function RegionChooserView() {
      this.triggerChooseRegion = __bind(this.triggerChooseRegion, this);
      return RegionChooserView.__super__.constructor.apply(this, arguments);
    }

    RegionChooserView.prototype.template = Handlebars.templates['region_chooser'];

    RegionChooserView.prototype.className = 'modal region-chooser';

    RegionChooserView.prototype.events = {
      "click .regions li": "triggerChooseRegion"
    };

    RegionChooserView.prototype.initialize = function(options) {
      this.regions = options.regions;
      return this.render();
    };

    RegionChooserView.prototype.render = function() {
      this.$el.html(this.template({
        regions: this.regions.toJSON()
      }));
      return this;
    };

    RegionChooserView.prototype.triggerChooseRegion = function(event) {
      var region, regionCode;
      regionCode = $(event.target).attr('data-region-code');
      region = this.regions.find(function(region) {
        return region.get('code') === regionCode;
      });
      return this.trigger('regionChosen', region);
    };

    RegionChooserView.prototype.onClose = function() {};

    return RegionChooserView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.ScenarioSelectorView = (function(_super) {
    __extends(ScenarioSelectorView, _super);

    function ScenarioSelectorView() {
      return ScenarioSelectorView.__super__.constructor.apply(this, arguments);
    }

    ScenarioSelectorView.prototype.template = Handlebars.templates['scenario_selector'];

    ScenarioSelectorView.prototype.events = {
      "change #scenario-select": "setScenario"
    };

    ScenarioSelectorView.prototype.initialize = function(options) {
      this.config = _.cloneDeep(MacArthur.CONFIG.scenarios);
      this.filter = options.filter;
      return this.render();
    };

    ScenarioSelectorView.prototype.render = function() {
      var scenarios, theSelect;
      scenarios = _.map(this.config, (function(_this) {
        return function(scenario) {
          if (_this.filter.get('scenario') === scenario.selector) {
            scenario.selected = true;
          } else {
            scenario.selected = false;
          }
          return scenario;
        };
      })(this));
      this.$el.html(this.template({
        filter: this.filter,
        scenarios: scenarios
      }));
      theSelect = this.$el.find('.select-box');
      setTimeout(function() {
        return theSelect.customSelect();
      }, 100);
      return this;
    };

    ScenarioSelectorView.prototype.onClose = function() {};

    ScenarioSelectorView.prototype.setScenario = function() {
      var scenarioName;
      scenarioName = $(event.target).find(':selected').attr('value');
      return this.filter.set('scenario', scenarioName);
    };

    return ScenarioSelectorView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.LensSelectorView = (function(_super) {
    __extends(LensSelectorView, _super);

    function LensSelectorView() {
      this.setDefaultLens = __bind(this.setDefaultLens, this);
      return LensSelectorView.__super__.constructor.apply(this, arguments);
    }

    LensSelectorView.prototype.template = Handlebars.templates['lens_selector'];

    LensSelectorView.prototype.events = {
      "change #lens-select": "setLens"
    };

    LensSelectorView.prototype.initialize = function(options) {
      this.config = _.cloneDeep(MacArthur.CONFIG.lenses);
      this.filter = options.filter;
      this.filter.on('change:subject', this.setDefaultLens);
      if (this.filter.get('lens') == null) {
        this.setDefaultLens();
      }
      return this.render();
    };

    LensSelectorView.prototype.render = function() {
      var lenses, theSelect;
      console.log('######################');
      lenses = _.map(this.config[this.filter.get('subject')], (function(_this) {
        return function(lens) {
          if (_this.filter.get('lens') === lens.selector) {
            lens.selected = true;
          } else {
            lens.selected = false;
          }
          return lens;
        };
      })(this));
      this.$el.html(this.template({
        lenses: lenses
      }));
      theSelect = this.$el.find('.select-box');
      setTimeout(function() {
        return theSelect.customSelect();
      }, 100);
      return this;
    };

    LensSelectorView.prototype.setLens = function(event) {
      var lensName;
      lensName = $(event.target).find(':selected').attr('value');
      return this.filter.set('lens', lensName);
    };

    LensSelectorView.prototype.onClose = function() {};

    LensSelectorView.prototype.setDefaultLens = function() {
      if (this.filter.get('subject') != null) {
        return this.filter.set('lens', this.getDefaultFilter().selector);
      }
    };

    LensSelectorView.prototype.getDefaultFilter = function() {
      return _.find(this.config[this.filter.get('subject')], function(obj) {
        return obj["default"] != null;
      });
    };

    return LensSelectorView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.LevelSelectorAgrCommDevView = (function(_super) {
    __extends(LevelSelectorAgrCommDevView, _super);

    function LevelSelectorAgrCommDevView() {
      return LevelSelectorAgrCommDevView.__super__.constructor.apply(this, arguments);
    }

    LevelSelectorAgrCommDevView.prototype.template = Handlebars.templates['level_selector_agr_comm_dev'];

    LevelSelectorAgrCommDevView.prototype.events = {
      'change #agr-comm-select': "setLevel"
    };

    LevelSelectorAgrCommDevView.prototype.initialize = function(options) {
      LevelSelectorAgrCommDevView.__super__.initialize.apply(this, arguments);
      this.config = _.cloneDeep(MacArthur.CONFIG.protectionLevels);
      this.levelType = 'agrCommLevel';
      if (this.filter.get(this.levelType) == null) {
        this.setDefaultLevel();
      }
      return this.render();
    };

    return LevelSelectorAgrCommDevView;

  })(Backbone.Views.BaseSelectorView);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.LevelSelectorView = (function(_super) {
    __extends(LevelSelectorView, _super);

    function LevelSelectorView() {
      return LevelSelectorView.__super__.constructor.apply(this, arguments);
    }

    LevelSelectorView.prototype.template = Handlebars.templates['level_selector'];

    LevelSelectorView.prototype.events = {
      "change #levels-select": "setLevel"
    };

    LevelSelectorView.prototype.initialize = function(options) {
      LevelSelectorView.__super__.initialize.apply(this, arguments);
      this.config = _.cloneDeep(MacArthur.CONFIG.levels);
      this.levelType = 'level';
      if (this.filter.get('level') == null) {
        this.setDefaultLevel();
      }
      return this.render();
    };

    return LevelSelectorView;

  })(Backbone.Views.BaseSelectorView);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.PressureOptionView = (function(_super) {
    __extends(PressureOptionView, _super);

    function PressureOptionView() {
      return PressureOptionView.__super__.constructor.apply(this, arguments);
    }

    PressureOptionView.prototype.template = Handlebars.templates['pressure_option'];

    PressureOptionView.prototype.events = {
      'change [type="checkbox"]': "setPressure"
    };

    PressureOptionView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.pressure = this.filter.get('pressure');
      return this.render();
    };

    PressureOptionView.prototype.render = function() {
      this.$el.html(this.template({
        thisView: this,
        filter: this.filter,
        pressure: !!this.pressure
      }));
      this.attachSubViews();
      return this;
    };

    PressureOptionView.prototype.setPressure = function(event) {
      this.filter.set('pressure', $(event.target).is(':checked'));
      return this.unsetPressureLevel();
    };

    PressureOptionView.prototype.unsetPressureLevel = function() {
      if (this.filter.get('pressure') === false) {
        return this.filter.unset('pressureLevel');
      }
    };

    PressureOptionView.prototype.onClose = function() {
      this.closeSubViews();
      return this.stopListening();
    };

    return PressureOptionView;

  })(Backbone.Diorama.NestingView);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.PressureSelectorView = (function(_super) {
    __extends(PressureSelectorView, _super);

    function PressureSelectorView() {
      return PressureSelectorView.__super__.constructor.apply(this, arguments);
    }

    PressureSelectorView.prototype.template = Handlebars.templates['pressure_selector'];

    PressureSelectorView.prototype.events = {
      'change #pressure-select': "setLevel"
    };

    PressureSelectorView.prototype.initialize = function(options) {
      PressureSelectorView.__super__.initialize.apply(this, arguments);
      this.config = _.cloneDeep(MacArthur.CONFIG.pressureLevels);
      this.levelType = 'pressureLevel';
      if (this.filter.get(this.levelType) == null) {
        this.setDefaultLevel();
      }
      return this.render();
    };

    return PressureSelectorView;

  })(Backbone.Views.BaseSelectorView);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.ProtectionOptionView = (function(_super) {
    __extends(ProtectionOptionView, _super);

    function ProtectionOptionView() {
      return ProtectionOptionView.__super__.constructor.apply(this, arguments);
    }

    ProtectionOptionView.prototype.template = Handlebars.templates['protection_option'];

    ProtectionOptionView.prototype.events = {
      'change [type="checkbox"]': "setProtection"
    };

    ProtectionOptionView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.protection = this.filter.get('protection');
      return this.render();
    };

    ProtectionOptionView.prototype.render = function() {
      this.$el.html(this.template({
        thisView: this,
        filter: this.filter,
        protection: !!this.protection
      }));
      this.attachSubViews();
      return this;
    };

    ProtectionOptionView.prototype.setProtection = function(event) {
      this.filter.set('protection', $(event.target).is(':checked'));
      return this.unsetProtectionLevel();
    };

    ProtectionOptionView.prototype.unsetProtectionLevel = function() {
      if (this.filter.get('protection') === false) {
        return this.filter.unset('protectionLevel');
      }
    };

    ProtectionOptionView.prototype.onClose = function() {
      this.closeSubViews();
      return this.stopListening();
    };

    return ProtectionOptionView;

  })(Backbone.Diorama.NestingView);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.ProtectionSelectorView = (function(_super) {
    __extends(ProtectionSelectorView, _super);

    function ProtectionSelectorView() {
      return ProtectionSelectorView.__super__.constructor.apply(this, arguments);
    }

    ProtectionSelectorView.prototype.template = Handlebars.templates['protection_selector'];

    ProtectionSelectorView.prototype.events = {
      'change #protection-select': "setLevel"
    };

    ProtectionSelectorView.prototype.initialize = function(options) {
      ProtectionSelectorView.__super__.initialize.apply(this, arguments);
      this.config = _.cloneDeep(MacArthur.CONFIG.protectionLevels);
      this.levelType = 'protectionLevel';
      if (this.filter.get(this.levelType) == null) {
        this.setDefaultLevel();
      }
      return this.render();
    };

    return ProtectionSelectorView;

  })(Backbone.Views.BaseSelectorView);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.FilterView = (function(_super) {
    __extends(FilterView, _super);

    function FilterView() {
      this.setSubject = __bind(this.setSubject, this);
      return FilterView.__super__.constructor.apply(this, arguments);
    }

    FilterView.prototype.template = Handlebars.templates['filter'];

    FilterView.prototype.events = {
      "click .subjects li": "setSubject"
    };

    FilterView.prototype.attributes = {
      "class": "filters"
    };

    FilterView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.listenTo(this.filter, 'change', this.render);
      return this.render();
    };

    FilterView.prototype.render = function() {
      this.$el.html(this.template({
        thisView: this,
        subjects: MacArthur.CONFIG.subjects,
        showLensSelector: this.filter.get('subject') != null,
        showScenarioSelector: this.filter.get('tab') === 'change',
        filter: this.filter
      }));
      this.attachSubViews();
      return this;
    };

    FilterView.prototype.setSubject = function(event) {
      var subjectName;
      subjectName = $(event.target).attr('data-subject');
      console.log('ZZZZZZZZZZZZZZZZZZz');
      return this.filter.set('subject', subjectName);
    };

    FilterView.prototype.onClose = function() {
      this.closeSubViews();
      return this.stopListening();
    };

    return FilterView;

  })(Backbone.Diorama.NestingView);

}).call(this);

(function() {
  var ModalContainer, _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Controllers || (_base.Controllers = {});

  ModalContainer = (function() {
    function ModalContainer() {
      this.disabler = $('<div class="disabler"></div>');
    }

    ModalContainer.prototype.showModal = function(view) {
      this.view = view;
      $('body').prepend(this.disabler);
      return $('body').append(this.view.$el);
    };

    ModalContainer.prototype.hideModal = function() {
      $('body').find('.disabler').remove();
      return this.view.close();
    };

    return ModalContainer;

  })();

  Backbone.Controllers.MainController = (function(_super) {
    __extends(MainController, _super);

    function MainController() {
      this.showSidePanel = __bind(this.showSidePanel, this);
      this.getGeometries = __bind(this.getGeometries, this);
      this.chooseRegion = __bind(this.chooseRegion, this);
      this.showMap = __bind(this.showMap, this);
      this.regions = new Backbone.Collections.RegionCollection(MacArthur.CONFIG.regions);
      this.filter = new Backbone.Models.Filter();
      this.queryBuilder = new window.MacArthur.QueryBuilder(this.filter);
      this.modalContainer = new ModalContainer;
      this.sidePanel = new Backbone.Diorama.ManagedRegion();
      this.sidePanel.$el.attr('id', 'side-panel');
      this.sidePanel.$el.insertAfter('#map');
      this.showMap();
      this.chooseRegion();
    }

    MainController.prototype.showMap = function() {
      return this.map = new Backbone.Views.MapView({
        filter: this.filter
      });
    };

    MainController.prototype.chooseRegion = function() {
      var regionChooserView;
      regionChooserView = new Backbone.Views.RegionChooserView({
        regions: this.regions
      });
      this.modalContainer.showModal(regionChooserView);

      /*
        @changeStateOn maps events published by other objects to
        controller states
       */
      return this.changeStateOn({
        event: 'regionChosen',
        publisher: regionChooserView,
        newState: _.partialRight(this.getGeometries, this.showSidePanel)
      });
    };

    MainController.prototype.getGeometries = function(region, callback) {
      var regionCode;
      regionCode = region.get('code');
      return $.getJSON("../../../data/" + regionCode + ".topo.json", (function(_this) {
        return function(geo) {
          return callback(null, geo, region);
        };
      })(this));
    };

    MainController.prototype.showSidePanel = function(err, geo, region) {
      var view;
      this.modalContainer.hideModal();
      this.filter.set({
        region: region
      });
      view = new Backbone.Views.TabView({
        filter: this.filter
      });
      this.sidePanel.showView(view);
      return this.map.initQueryLayer(geo, region);
    };

    return MainController;

  })(Backbone.Diorama.Controller);

}).call(this);
