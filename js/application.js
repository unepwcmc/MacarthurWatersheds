(function() {
  window.MacArthur || (window.MacArthur = {});

  MacArthur.CONFIG = {
    tabs: [
      {
        selector: "now",
        name: "Now",
        strapline: "Current status"
      }, {
        selector: "change",
        name: "Change",
        strapline: "Change between now and 2050"
      }, {
        selector: "future_threats",
        name: "Future Threats",
        strapline: "Future threats from agricultural development"
      }
    ],
    regions: [
      {
        code: "WAN",
        name: "Andes",
        bounds: [[-22, -57], [14, -83]],
        centre: [-4, -61]
      }, {
        code: "GLR",
        name: "African Great Lakes",
        bounds: [[-18, 30], [10, 40]],
        centre: [-3, 43]
      }, {
        code: "MEK",
        name: "Mekong",
        bounds: [[6, 110], [35, 90]],
        centre: [21, 110]
      }
    ],
    scales: [
      {
        code: "broadscale",
        name: "Global",
        tooltip: "Global <a href='/about.html#global-definition' target='_blank'>GEO-4</a> scenarios were used to analyse full MacArthur regions"
      }, {
        code: "regional",
        name: "Regional",
        tooltip: "<a href='/about.html#regional-definition' target='_blank'>Regionally developed</a> scenarios were used to analyse a subset of three countries in each region"
      }
    ],
    subjects: [
      {
        selector: "biodiversity",
        name: "Biodiversity importance",
        threatsName: "Threats to current Biodiversity",
        nowTooltip: "Biodiversity importance is based on IUCN species ranges for amphibians, mammals, and birds in combination with their habitat affiliations and modelled land cover. <a href='/about.html'>More information</a>.",
        futureTooltip: "Threats to current biodiversity are based on expansion of agriculture under a future scenario and biodiversity is based on baseline biodiversity importance. <a href='/about.html'>More information</a>.",
        changeTooltip: "Change in biodiversity importance is based on IUCN species ranges for amphibians, mammals, and birds in combination with their habitat affiliations and modelled land cover. <a href='/about.html'>More information</a>."
      }, {
        selector: "ecosystem",
        name: "Ecosystem function provision",
        threatsName: "Threats to current ecosystem function",
        nowTooltip: "Ecosystem function provision is based on a landscape functions approach and modelled land cover. <a href='/about.html'>More information</a>.",
        futureTooltip: "threats to current ecosystem function provision are based on expansion of agriculture under a future scenario and ecosystem function provision is based on baseline ecosystem function provision importance. <a href='/about.html'>More information</a>.",
        changeTooltip: "Change in ecosystem function provision is based on a landscape functions approach and modelled land cover. <a href='/about.html'>More information</a>."
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
          name: "Total Ecosystem Function Provision",
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
    scenarios: {
      broadscale: [
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
      regional: {
        WAN: [
          {
            selector: "s1_2050",
            name: "New Dawn"
          }, {
            selector: "s2_2050",
            name: "Andean Autumn"
          }, {
            selector: "s3_2050",
            name: "Overcoming Obstacles"
          }, {
            selector: "s4_2050",
            name: "Flipping Burgers"
          }
        ],
        GLR: [
          {
            selector: "s1_2050",
            name: "Sleeping Lions"
          }, {
            selector: "s2_2050",
            name: "Lone Leopards"
          }, {
            selector: "s3_2050",
            name: "Herd of Zebra"
          }, {
            selector: "s4_2050",
            name: "Industrious Ants"
          }
        ],
        MEK: [
          {
            selector: "s1_2050",
            name: "Land of the Golden Mekong"
          }, {
            selector: "s2_2050",
            name: "Buffalo, Buffalo"
          }, {
            selector: "s3_2050",
            name: "The DoReKi Dragon"
          }, {
            selector: "s4_2050",
            name: "Tigers on a Train"
          }
        ]
      }
    },
    scenariosPdfs: {
      broadscale: "http://www.unep.org/geo/geo4.asp",
      regional: {
        WAN: "",
        GLR: "http://cgspace.cgiar.org/handle/10568/34864",
        MEK: ""
      }
    },
    levels: {
      "default": [
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
      change: [
        {
          selector: "all",
          name: "All",
          "default": true
        }, {
          selector: "increase",
          name: "Increase"
        }, {
          selector: "low",
          name: "Low Decrease"
        }, {
          selector: "medium",
          name: "Medium Decrease"
        }, {
          selector: "high",
          name: "High Decrease"
        }
      ]
    },
    protectionLevels: [
      {
        selector: "high",
        name: "66% -100% covered",
        "default": true
      }, {
        selector: "medium",
        name: "33% - 66% covered"
      }, {
        selector: "low",
        name: "0 -  33% covered"
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
    ]
  };

  MacArthur.getFilterOptionsWithSelectedSet = function(filter, options) {
    var collection_name, option, _ref;
    collection_name = options.plural || ("" + options.name + "s");
    option = ((_ref = MacArthur.CONFIG[collection_name][options.scale]) != null ? _ref[options.region] : void 0) || MacArthur.CONFIG[collection_name][options.scale] || MacArthur.CONFIG[collection_name];
    return _.map(option, function(element) {
      if (filter.get(options.name) === element.selector) {
        element.active = true;
      } else {
        element.active = false;
      }
      return element;
    });
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
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (_base = window.Backbone).Models || (_base.Models = {});

  window.Backbone.Models.ResultsNumber = (function(_super) {
    __extends(ResultsNumber, _super);

    function ResultsNumber() {
      return ResultsNumber.__super__.constructor.apply(this, arguments);
    }

    ResultsNumber.prototype.defaults = {
      number: -999
    };

    return ResultsNumber;

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
      var regionCode, scaleCode;
      if (this.hasRequiredFilters()) {
        regionCode = this.filter.get('region').get('code');
        scaleCode = this.filter.get('scale').get('code');
        return "SELECT DISTINCT d.watershed_id, d.value, percentage as protection_percentage,\npressure.value as pressure_index " + (this.includeComprovValueClause()) + ",\nw.name, w.lake \nFROM macarthur_region r \nRIGHT JOIN macarthur_watershed w ON r.cartodb_id = w.region_id \nLEFT JOIN macarthur_datapoint d ON d.watershed_id = w.cartodb_id \nLEFT JOIN macarthur_lens lens ON lens.cartodb_id = d.lens_id \nLEFT JOIN macarthur_protection p ON p.watershed_id = w.cartodb_id \nLEFT JOIN macarthur_pressure pressure \nON pressure.watershed_id = w.cartodb_id \n" + (this.buildComprovValueClause()) + " \nWHERE r.code = '" + regionCode + "' \nAND w.is_broadscale = " + (this.isBroadscale(scaleCode)) + " \nAND " + (this.buildSubjectClause()) + " \nAND " + (this.buildLensClause()) + "\nAND " + (this.buildMetricClause()) + " \nAND " + (this.buildScenarioClause()) + " \nAND type_data = 'value'\n";
      } else {
        return this.filter.get('query');
      }
    };

    QueryBuilder.prototype.isBroadscale = function(scale) {
      if (scale !== 'broadscale' && scale !== 'regional') {
        throw new Error("'" + scale + "': wrong scale name! Expected broadscale or regional");
      }
      if (scale === 'broadscale') {
        return true;
      } else {
        return false;
      }
    };

    QueryBuilder.prototype.includeComprovValueClause = function() {
      if (this.filter.get('tab') === 'future_threats') {
        return ", agr_dev_value ";
      } else {
        return " ";
      }
    };

    QueryBuilder.prototype.buildComprovValueClause = function() {
      if (this.filter.get('tab') === 'future_threats') {
        return "LEFT JOIN (\nSELECT d.watershed_id, d.value AS agr_dev_value \nFROM macarthur_agriculture_development d \nWHERE " + (this.buildScenarioClause('comprov')) + " ) s \nON s.watershed_id = d.watershed_id ";
      } else {
        return "";
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

    QueryBuilder.prototype.buildScenarioClause = function(originSelect) {
      var scenario, tab;
      scenario = this.filter.get('scenario');
      tab = this.filter.get('tab');
      if (tab === 'future_threats') {
        if (originSelect === 'comprov') {
          return "scenario = '" + scenario + "' ";
        } else {
          return "scenario = 'bas' ";
        }
      } else {
        if (scenario != null) {
          return "scenario = '" + scenario + "' ";
        } else {
          return "scenario = 'bas' ";
        }
      }
    };

    QueryBuilder.prototype.buildLensClause = function() {
      var lensCode;
      lensCode = this.filter.get('lens');
      return "lens.type = '" + lensCode + "' ";
    };

    QueryBuilder.prototype.buildMetricClause = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'change') {
        return "metric = 'change' ";
      } else {
        return "metric = 'imp' ";
      }
    };

    QueryBuilder.prototype.hasLens = function(subjectCode, lensCode) {
      if (this.filter.get('tab') === 'future_threats') {
        return true;
      }
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

    QueryBuilder.prototype.tabLacksSelections = function() {
      var lensCode, scenarioCode, subjectCode, tab;
      tab = this.filter.get('tab');
      if (tab === 'now' || tab === 'future_threats') {
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
      if (!((this.filter.changedAttributes().query != null) || this.isFromProtection() || this.isFromPressure() || this.tabLacksSelections())) {
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
  var _base, _base1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Models || (_base.Models = {});

  (_base1 = window.Backbone).Collections || (_base1.Collections = {});

  Backbone.Models.Scale = (function(_super) {
    __extends(Scale, _super);

    function Scale() {
      return Scale.__super__.constructor.apply(this, arguments);
    }

    return Scale;

  })(Backbone.Model);

  Backbone.Collections.ScaleCollection = (function(_super) {
    __extends(ScaleCollection, _super);

    function ScaleCollection() {
      return ScaleCollection.__super__.constructor.apply(this, arguments);
    }

    ScaleCollection.prototype.model = Backbone.Models.Scale;

    return ScaleCollection;

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
      this.hideGoBack = __bind(this.hideGoBack, this);
      this.goBack = __bind(this.goBack, this);
      this.setTab = __bind(this.setTab, this);
      return TabView.__super__.constructor.apply(this, arguments);
    }

    TabView.prototype.template = Handlebars.templates['tab'];

    TabView.prototype.events = {
      "click ul.tabs li": "setTab",
      "click .scale-info a": "goBack"
    };

    TabView.prototype.initialize = function(options) {
      this.config = _.cloneDeep(MacArthur.CONFIG.tabs);
      this.filter = options.filter;
      this.resultsNumber = options.resultsNumber;
      return this.render();
    };

    TabView.prototype.render = function() {
      var options, strapline, tabs;
      options = {
        name: 'tab'
      };
      tabs = MacArthur.getFilterOptionsWithSelectedSet(this.filter, options);
      strapline = _.find(tabs, function(t) {
        return t.active;
      }).strapline;
      this.$el.html(this.template({
        thisView: this,
        filter: this.filter,
        resultsNumber: this.resultsNumber,
        tabs: tabs,
        strapline: strapline,
        selectedScaleName: this.getSelectedScaleName(),
        unSelectedScaleName: this.getUnSelectedScaleName()
      }));
      this.attachSubViews();
      return this;
    };

    TabView.prototype.onClose = function() {
      this.closeSubViews();
      return this.stopListening();
    };

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

    TabView.prototype.getSelectedScaleName = function() {
      return this.filter.get('scale').get('name');
    };

    TabView.prototype.getUnSelectedScaleName = function() {
      var idx, scaleOptions, selectedScaleName;
      selectedScaleName = this.getSelectedScaleName();
      scaleOptions = MacArthur.CONFIG.scales;
      idx = _.findIndex(scaleOptions, function(o) {
        return o.name !== selectedScaleName;
      });
      return scaleOptions[idx].name;
    };

    TabView.prototype.goBack = function(e) {
      e.preventDefault();
      this.resetFilters();
      return Backbone.appRouter.navigate(Backbone.history.fragment.split('/')[0], {
        trigger: true
      });
    };

    TabView.prototype.hideGoBack = function(e) {
      return $(e.currentTarget).closest('div').hide();
    };

    TabView.prototype.resetFilters = function() {
      this.filter.unset('subject');
      this.filter.unset('lens');
      this.filter.unset('scenario');
      this.filter.unset('level');
      this.filter.unset('protection');
      this.filter.unset('protectionLevel');
      this.filter.unset('pressure');
      this.filter.unset('pressureLevel');
      return this.resultsNumber.set('number', -999);
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
      this.isBiodiversity = __bind(this.isBiodiversity, this);
      this.isChangeTab = __bind(this.isChangeTab, this);
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
        levels: levels,
        isChangeTab: this.isChangeTab,
        isBiodiversity: this.isBiodiversity
      }));
      theSelect = this.$el.find('.select-box');
      return setTimeout((function(_this) {
        return function() {
          theSelect.customSelect();
          return _this.$el.find('.customSelectInner').css({
            'width': '100%'
          });
        };
      })(this), 20);
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

    BaseSelectorView.prototype.isChangeTab = function() {
      return this.filter.get('tab') === 'change';
    };

    BaseSelectorView.prototype.isBiodiversity = function() {
      if (this.filter.attributes.subject === 'biodiversity') {
        return true;
      }
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
      this.fireTabChangeCallbacks = __bind(this.fireTabChangeCallbacks, this);
      this.queryPolyStyle = __bind(this.queryPolyStyle, this);
      this.baseLineStyle = __bind(this.baseLineStyle, this);
      this.getFillOpacity = __bind(this.getFillOpacity, this);
      this.setPressureFill = __bind(this.setPressureFill, this);
      this.setProtectionFill = __bind(this.setProtectionFill, this);
      this.filterFeatureLevel = __bind(this.filterFeatureLevel, this);
      this.getColor = __bind(this.getColor, this);
      this.resetQueryLayerStyle = __bind(this.resetQueryLayerStyle, this);
      this.updateQueryLayerStyle = __bind(this.updateQueryLayerStyle, this);
      this.buildQuerydata = __bind(this.buildQuerydata, this);
      this.setMinMax = __bind(this.setMinMax, this);
      this.updateQueryLayer = __bind(this.updateQueryLayer, this);
      this.bindPopup = __bind(this.bindPopup, this);
      this.unsetLegend = __bind(this.unsetLegend, this);
      this.setLegend = __bind(this.setLegend, this);
      return MapView.__super__.constructor.apply(this, arguments);
    }

    MapView.prototype.template = Handlebars.templates['map'];

    MapView.prototype.colorRange = {
      'change': ["#FF5C26", "#fff", "#A3D900"],
      'now': ["#fcbba1", "#67000d"],
      'futureThreatsColorpleth': [['#E64C00', '#7a5259', '#730000'], ['#FF9f6b', '#B87461', '#a82a00'], ['#FFF7E6', '#bed5ed', '#7ab6f5']]
    };

    MapView.prototype.futureThreatsColorRange = {
      'high_agricultural_colour': ["#deebf7", "#3182bd"],
      'medium_agricultural_colour': ["#efedf5", "#756bb1"],
      'low_agricultural_colour': ["#fee0d2", "#de2d26"],
      'negative_agricultural_colour': ["#ffffff", "#000000"]
    };

    MapView.prototype.legendText = {
      'change': ['Decrease', 'Increase'],
      'now': ["Low", "High"],
      'future_threats': ["Low", "High"]
    };

    MapView.prototype.subjectText = {
      'biodiversity': 'Biodiversity',
      'ecosystem': 'EF'
    };

    MapView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.resultsNumber = options.resultsNumber;
      this.parsedResults = 0;
      this.initBaseLayer();
      this.listenTo(this.filter, 'change:tab', this.fireTabChangeCallbacks);
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
      this.mapHasData = false;
      this.lineWeight = d3.scale.linear().domain([0, 11]).range([.5, 2.6]);
      this.map = L.map('map', {
        scrollWheelZoom: true
      }).setView([0, 0], 3);
      this.queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?';
      return L.tileLayer('https://a.tiles.mapbox.com/v3/timwilki.himjd69g/{z}/{x}/{y}.png', {
        attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
      }).addTo(this.map);
    };

    MapView.prototype.initQueryLayer = function(geo, region, scale) {
      var regionBounds, regionCentre, regionCode, scaleCode;
      this.querydata = null;
      if (this.queryLayer) {
        this.map.removeLayer(this.queryLayer);
      }
      if (this.queryLayerInteriors) {
        this.map.removeLayer(this.queryLayerInteriors);
      }
      this.region = region;
      this.scale = scale;
      regionCode = region.get('code');
      scaleCode = scale.get('code');
      regionBounds = region.get('bounds');
      regionCentre = region.get('centre');
      this.categories = 3;
      this.unsetWatershedSelectionCount();
      this.collection = topojson.feature(geo, geo.objects["" + regionCode + "_" + scaleCode]);
      this.interiors = topojson.mesh(geo, geo.objects["" + regionCode + "_" + scaleCode]);
      this.queryLayer = L.geoJson(this.collection, {
        style: this.basePolyStyle
      }).addTo(this.map);
      this.queryLayerInteriors = L.geoJson(this.interiors, {
        style: this.baseLineStyle
      }).addTo(this.map);
      this.map.setView(regionCentre, 5, {
        animate: false
      });
      return this.map.on('zoomend', (function(_this) {
        return function() {
          return _this.queryLayerInteriors.setStyle(_this.baseLineStyle);
        };
      })(this));
    };

    MapView.prototype.htmlGradientElement = function(colorRange) {
      var colours, style;
      colorRange = _.cloneDeep(colorRange);
      colours = colorRange.join(', ');
      style = "linear-gradient(to right, " + colours + ");";
      return "<div class='map-legend-gradient' style='background: " + style + "'>";
    };

    MapView.prototype.getLegendGradientElement = function(tab) {
      var html_element, k, v, _ref;
      if (Modernizr.cssgradients) {
        if (tab === 'future_threats') {
          html_element = '';
          _ref = this.futureThreatsColorRange;
          for (k in _ref) {
            v = _ref[k];
            html_element = html_element.concat("" + (this.htmlGradientElement(v)) + "</div>");
          }
          return html_element;
        } else {
          return this.htmlGradientElement(this.colorRange[tab]);
        }
      } else {
        return "<div class='map-legend-gradient nogradient " + tab + "'>";
      }
    };

    MapView.prototype.legendGrid = function() {
      var colour, html_element, value, _i, _j, _len, _len1, _ref;
      html_element = '';
      _ref = this.futureThreatsColorpleth;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        for (_j = 0, _len1 = value.length; _j < _len1; _j++) {
          colour = value[_j];
          html_element = html_element.concat("<div class='map-legend-grid-square' \nstyle=background-color:" + colour + ";></div>");
        }
      }
      return html_element;
    };

    MapView.prototype.setLegend = function() {
      if (this.legend) {
        this.unsetLegend();
      }
      this.legend = L.control({
        position: "bottomleft"
      });
      this.legend.onAdd = (function(_this) {
        return function(map) {
          var div, subject, tab, title;
          div = L.DomUtil.create("div", "info legend");
          tab = _this.filter.get('tab');
          subject = _this.filter.get('subject');
          title = tab === 'change' ? 'Change' : 'Importance';
          if (tab === 'future_threats') {
            div.innerHTML = "<div class='map-legend-base'>\n  <table class='map-legend-table'>\n    <tr>\n      <td class='map-legend-table-rotate'>\n        <div><span>Agr. Dev. Level</span></div>\n      </td>\n      <td class='map-legend-table-rotate'>\n        <div class='legend-high-low'>\n          <span>Low High</span>\n        </div>\n      </td>\n      <td class='map-legend-table-right-column'>\n        <div class='map-legend-grid'>\n          " + (_this.legendGrid()) + "\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <td class='map-legend-table-left-column'>\n      </td>\n      <td class='map-legend-table-left-column'>\n      </td>\n      <td class='map-legend-table-right-column'>\n        <div class='legend-high-low'>\n          <span>Low</span>\n          <span>High</span>\n        </div>\n      <td>\n    </tr>\n    <tr>\n      <td class='map-legend-table-left-column'>\n      </td>\n      <td class='map-legend-table-left-column'>\n      </td>\n      <td class='map-legend-table-right-column'>\n        <div><span>" + _this.subjectText[subject] + " Level of Importance</span></div>\n      <td>\n    </tr>\n  </table>\n</div>";
          } else {
            div.innerHTML = "<div class='map-legend-text'>\n  <h3 class='legend-title'>" + _this.subjectText[subject] + " Level of " + title + "</h3>\n</div>\n  " + (_this.getLegendGradientElement(tab)) + "\n  <span>" + _this.legendText[tab][0] + "</span>\n  <span>" + _this.legendText[tab][1] + "</span>\n</div>";
          }
          return div;
        };
      })(this);
      return this.legend.addTo(this.map);
    };

    MapView.prototype.unsetLegend = function() {
      if (this.legend) {
        this.legend.removeFrom(this.map);
      }
      return this.legend = false;
    };

    MapView.prototype.getPopupText = function(w, isLake) {
      var agr_dev_row, subject, tab;
      tab = this.filter.get('tab');
      subject = this.filter.get('subject');
      if (isLake) {
        return "<a href='data/data_sheets/" + w.name + ".pdf'>Watershed data sheet</a>";
      } else {
        if (tab === 'future_threats') {
          agr_dev_row = "Agr. Dev. Level: " + (this.formatToFirst2NonZeroDecimals(w.agr_dev_value)) + "<br>";
        } else {
          agr_dev_row = "";
        }
        return "Watershed id: " + w.name + " <br>\n" + this.subjectText[subject] + " Value: " + (this.formatToFirst2NonZeroDecimals(w.value)) + " <br>\nRegion: Max. " + (this.formatToFirst2NonZeroDecimals(this.max['value'])) + " / Min. " + (this.formatToFirst2NonZeroDecimals(this.min['value'])) + " <br>\n" + agr_dev_row + "\n<!--Pressure Index: " + (this.formatToFirst2NonZeroDecimals(w.pressure_index)) + " <br-->\nProtection Percentage: " + (w.protection_percentage.toFixed(0)) + " <br>\n<a href='data/data_sheets/" + w.name + ".pdf' target=\"_blank\">Watershed data sheet</a>";
      }
    };

    MapView.prototype.bindPopup = function(feature, layer) {
      var id, popupOptions, w;
      id = layer.feature.properties.cartodb_id;
      w = _.find(this.data, function(row) {
        return row.watershed_id === id;
      });
      popupOptions = {
        maxWidth: 230
      };
      return layer.bindPopup(this.getPopupText(w, feature.properties.lake), popupOptions);
    };

    MapView.prototype.updateQueryLayer = function() {
      var q;
      this.map.removeLayer(this.queryLayer);
      this.styleValueField = 'value';
      this.filterValueField = 'rank';
      q = this.filter.get('query');
      if (q == null) {
        return;
      }
      this.resultsNumber.set('loading', true);
      return $.getJSON("https://carbon-tool.cartodb.com/api/v2/sql?q=" + q + "&callback=?", (function(_this) {
        return function(data) {
          _this.resultsNumber.set('loading', false);
          _this.data = _this.sortDataBy(data.rows, 'value');
          _this.dataLenght = _this.data.length;
          if (!(_this.dataLenght > 0)) {
            throw new Error("Data should not be empty, check your query");
          }
          _this.setMinMax();
          if (_this.filter.get('tab') === 'change') {
            _this.setZeroValueIndexes();
          }
          _this.querydata = _this.buildQuerydata(_this.data);
          _this.setLinearScaleColour();
          _this.queryLayer = L.geoJson(_this.collection, {
            style: _this.queryPolyStyle,
            onEachFeature: _this.bindPopup
          }).addTo(_this.map);
          if (!_this.mapHasData) {
            _this.mapHasData = true;
            _this.queryLayerInteriors.setStyle(_this.baseLineStyle);
          }
          _this.queryLayerInteriors.bringToFront();
          return _this.setLegend();
        };
      })(this));
    };

    MapView.prototype.setMinMax = function(type) {
      var data_without_lakes;
      data_without_lakes = $.grep(this.data, function(e) {
        return e.lake !== true;
      });
      this.max = {
        'value': data_without_lakes[data_without_lakes.length - 1].value,
        'rank': data_without_lakes.length,
        'agrCommDev': _.max(data_without_lakes, function(o) {
          return o.agr_dev_value;
        }).agr_dev_value
      };
      this.min = {
        'value': data_without_lakes[0].value,
        'rank': 0,
        'agrCommDev': 0
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
              pressureIndex: x.pressure_index,
              agrCommDevValue: x.agr_dev_value || "",
              watershed_name: x.name,
              lake: x.lake || false
            }
          ];
        };
      })(this)));
    };

    MapView.prototype.updateQueryLayerStyle = function() {
      if (this.querydata != null) {
        this.unsetWatershedSelectionCount();
        this.setLinearScaleColour();
        return this.queryLayer.setStyle(this.queryPolyStyle);
      }
    };

    MapView.prototype.resetQueryLayerStyle = function() {
      return this.queryLayer.setStyle(this.basePolyStyle);
    };

    MapView.prototype.getColor = function(feature) {
      var d, max_agr, max_val, middle_gradient, min_agr, min_val, range_agr, range_val, rank, tab;
      tab = this.filter.get('tab');
      rank = this.querydata[feature][this.styleValueField];
      if (tab === 'change') {
        if (this.styleValueField === 'value') {
          middle_gradient = 0;
          if (rank === 0) {
            return '#eee';
          }
        } else {
          middle_gradient = this.firstPositiveIndex;
          if (typeof isZero !== "undefined" && isZero !== null) {
            return '#eee';
          }
        }
        if (rank > middle_gradient) {
          return this.colorPositive(rank);
        }
        if (rank < middle_gradient) {
          return this.colorNegative(rank);
        }
      }
      if (tab === 'future_threats') {
        d = this.querydata[feature].agrCommDevValue;
        this.futureThreatsColorpleth = this.colorRange.futureThreatsColorpleth;
        min_agr = this.min.agrCommDev;
        max_agr = this.max.agrCommDev;
        max_val = this.max[this.styleValueField];
        min_val = this.min[this.styleValueField];
        range_agr = (max_agr - min_agr) / 3;
        range_val = (max_val - min_val) / 3;
        if (rank < min_val + range_val) {
          if (d < min_agr + range_agr) {
            return this.futureThreatsColorpleth[2][0];
          }
          if (d < min_agr + 2 * range_agr && d > min_agr + range_agr) {
            return this.futureThreatsColorpleth[1][0];
          }
          if (d > min_agr + range_agr) {
            return this.futureThreatsColorpleth[0][0];
          }
        }
        if (rank < min_val + 2 * range_val && rank > min_val + range_val) {
          if (d < min_agr + range_agr) {
            return this.futureThreatsColorpleth[2][1];
          }
          if (d < min_agr + 2 * range_agr && d > min_agr + range_agr) {
            return this.futureThreatsColorpleth[1][1];
          }
          if (d > min_agr + range_agr) {
            return this.futureThreatsColorpleth[0][1];
          }
        }
        if (rank > min_val + 2 * range_val) {
          if (d < min_agr + range_agr) {
            return this.futureThreatsColorpleth[2][2];
          }
          if (d < min_agr + 2 * range_agr && d > min_agr + range_agr) {
            return this.futureThreatsColorpleth[1][2];
          }
          if (d > min_agr + range_agr) {
            return this.futureThreatsColorpleth[0][2];
          }
        }
      }
      if (tab === 'now') {
        return this.color(rank);
      }
    };

    MapView.prototype.filterFeatureLevel = function(id) {
      var d, level, range, tab;
      level = this.filter.get('level');
      tab = this.filter.get('tab');
      d = this.querydata[id];
      if (tab === 'change') {
        range = this.firstPositiveFilterIndex / this.categories;
      } else {
        range = (this.max[this.filterValueField] - this.min[this.filterValueField]) / this.categories;
      }
      if (level === 'all') {
        return true;
      }
      if (level === 'increase') {
        return d[this.filterValueField] >= this.firstPositiveFilterIndex;
      }
      if (level === 'high' && tab !== 'change') {
        if (d[this.filterValueField] >= this.min[this.filterValueField] + range * 2) {
          return true;
        }
      }
      if (level === 'low' && tab === 'change') {
        if (d[this.filterValueField] >= this.min[this.filterValueField] + range * 2 && d[this.filterValueField] < this.firstPositiveFilterIndex) {
          return true;
        }
      }
      if (level === 'medium') {
        if (d[this.filterValueField] >= this.min[this.filterValueField] + range && d[this.filterValueField] < this.min[this.filterValueField] + range * 2) {
          return true;
        }
      }
      if (level === 'low' && tab !== 'change' || level === 'high' && tab === 'change') {
        if (d[this.filterValueField] >= this.min[this.filterValueField] && d[this.filterValueField] < this.min[this.filterValueField] + range) {
          return true;
        }
      }
      return false;
    };

    MapView.prototype.setProtectionFill = function(op, d) {
      var protectionLevel;
      protectionLevel = this.filter.get('protectionLevel');
      if (protectionLevel === 'high') {
        if (!(d.protectionPercentage >= 66 && d.protectionPercentage <= 100)) {
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
      if (op === .9) {
        this.currentSelectionCount += 1;
      }
      return op;
    };

    MapView.prototype.baseLineStyle = function(feature) {
      return {
        weight: this.lineWeight(this.map.getZoom()),
        opacity: 0.5,
        color: this.mapHasData ? '#222' : '#C0A972',
        fillOpacity: 0
      };
    };

    MapView.prototype.basePolyStyle = function(feature) {
      return {
        weight: 0,
        opacity: 0,
        fillOpacity: 0.25,
        color: '#C0A972'
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
      this.parsedResults += 1;
      if (this.parsedResults === this.dataLenght) {
        this.setWatershedSelectionCount();
      }
      return {
        weight: 0,
        opacity: 0,
        fillOpacity: feature.properties.lake ? 0 : fillOpacity,
        fillColor: fillColor
      };
    };

    MapView.prototype.setWatershedSelectionCount = function() {
      this.parsedResults = 0;
      this.resultsNumber.set('number', this.currentSelectionCount);
      if (this.currentSelectionCount === 0) {
        this.unsetLegend();
      } else {
        if (!this.legend) {
          this.setLegend();
        }
      }
      return this.currentSelectionCount = 0;
    };

    MapView.prototype.unsetWatershedSelectionCount = function() {
      if (this.currentSelectionCount === void 0) {
        this.parsedResults = 0;
        this.currentSelectionCount = 0;
      }
      if (this.resultsNumber.get('number') !== -999) {
        return this.resultsNumber.set('number', 0);
      }
    };

    MapView.prototype.formatToFirst2NonZeroDecimals = function(number) {
      number += '';
      return number.match(/^-{0,1}[0-9]+\.*0*[1-9]{0,2}/);
    };

    MapView.prototype.setZeroValueIndexes = function() {
      var firstPositiveNonZeroIndex, sortedData;
      sortedData = this.sortDataBy(this.data, 'value');
      firstPositiveNonZeroIndex = null;
      this.zeroValueIndexes = _.map(_.filter(sortedData, function(d, i) {
        if (d.value > 0) {
          firstPositiveNonZeroIndex = i;
        }
        if (d.value === 0) {
          d.index = i;
        }
        return d.value === 0;
      }), function(d) {
        return d.index;
      });
      if (this.styleValueField === 'value') {
        this.firstPositiveIndex = 0;
        return this.firstPositiveFilterIndex = this.zeroValueIndexes[0] || firstPositiveNonZeroIndex;
      } else {
        return this.firstPositiveIndex = this.zeroValueIndexes[0] || firstPositiveNonZeroIndex;
      }
    };

    MapView.prototype.setNegativeLinearScaleColour = function(tab) {
      var domain, range;
      if (this.styleValueField === 'value') {
        domain = [this.min[this.styleValueField], this.firstPositiveIndex];
      } else {
        domain = [this.min[this.styleValueField], this.firstPositiveIndex - 1];
      }
      range = this.colorRange[tab].slice(0, 2);
      return this.colorNegative = d3.scale.linear().domain(domain).range(range);
    };

    MapView.prototype.setPositiveLinearScaleColour = function(tab) {
      var domain, min, range;
      if (this.styleValueField === 'value') {
        min = 0;
      } else {
        min = this.zeroValueIndexes[0];
      }
      domain = [min, this.max[this.styleValueField]];
      range = this.colorRange[tab].slice(-2);
      return this.colorPositive = d3.scale.linear().domain(domain).range(range);
    };

    MapView.prototype.setFutureThreatsLinearScaleColour = function() {
      var domain, range_high, range_low, range_medium, range_negative;
      domain = [this.min[this.styleValueField], this.max[this.styleValueField]];
      range_high = this.futureThreatsColorRange['high_agricultural_colour'];
      range_medium = this.futureThreatsColorRange['medium_agricultural_colour'];
      range_low = this.futureThreatsColorRange['low_agricultural_colour'];
      range_negative = this.futureThreatsColorRange['negative_agricultural_colour'];
      this.high_agricultural_colour = d3.scale.linear().domain(domain).range(range_high);
      this.medium_agricultural_colour = d3.scale.linear().domain(domain).range(range_medium);
      this.low_agricultural_colour = d3.scale.linear().domain(domain).range(range_low);
      return this.negative_agricultural_colour = d3.scale.linear().domain(domain).range(range_negative);
    };

    MapView.prototype.setLinearScaleColour = function() {
      var domain, range, tab;
      tab = this.filter.get('tab');
      if (tab === 'change') {
        this.setNegativeLinearScaleColour(tab);
        this.setPositiveLinearScaleColour(tab);
      }
      if (tab === 'future_threats') {
        return this.setFutureThreatsLinearScaleColour();
      } else {
        domain = [this.min[this.styleValueField], this.max[this.styleValueField]];
        range = this.colorRange[tab];
        return this.color = d3.scale.linear().domain(domain).range(range);
      }
    };

    MapView.prototype.fireTabChangeCallbacks = function() {
      return this.resetQueryLayerStyle();
    };

    MapView.prototype.onClose = function() {
      return this.remove();
    };

    return MapView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.ResultsNumberView = (function(_super) {
    __extends(ResultsNumberView, _super);

    function ResultsNumberView() {
      return ResultsNumberView.__super__.constructor.apply(this, arguments);
    }

    ResultsNumberView.prototype.template = Handlebars.templates['results_number'];

    ResultsNumberView.prototype.initialize = function(options) {
      this.resultsNumber = options.resultsNumber;
      this.listenTo(this.resultsNumber, 'change:number', this.render);
      this.listenTo(this.resultsNumber, 'change:loading', this.render);
      return this.render();
    };

    ResultsNumberView.prototype.render = function() {
      this.$el.html(this.template({
        number: this.resultsNumber.get('number'),
        isRelevantNumber: this.resultsNumber.get('number') !== -999,
        dataLoading: this.resultsNumber.get('loading')
      }));
      return this;
    };

    ResultsNumberView.prototype.onClose = function() {
      this.remove();
      return this.stopListening();
    };

    return ResultsNumberView;

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
      "click .regions .region-area": "triggerChooseRegion"
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
      var regionCode;
      regionCode = $(event.target).attr('data-region-code');
      return Backbone.appRouter.navigate("region:" + regionCode, {
        trigger: true
      });
    };

    RegionChooserView.prototype.onClose = function() {};

    return RegionChooserView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.ScaleChooserView = (function(_super) {
    __extends(ScaleChooserView, _super);

    function ScaleChooserView() {
      this.triggerChooseScale = __bind(this.triggerChooseScale, this);
      return ScaleChooserView.__super__.constructor.apply(this, arguments);
    }

    ScaleChooserView.prototype.template = Handlebars.templates['scale_chooser'];

    ScaleChooserView.prototype.className = 'modal scale-chooser';

    ScaleChooserView.prototype.events = {
      "click .scales li": "triggerChooseScale",
      "click .back a": "goBack"
    };

    ScaleChooserView.prototype.initialize = function(options) {
      this.scales = options.scales;
      return this.render();
    };

    ScaleChooserView.prototype.render = function() {
      this.$el.html(this.template({
        scales: this.scales.toJSON(),
        regionName: this.getRegionName()
      }));
      this.$el.find("[data-toggle=\"popover\"]").popover({
        trigger: "manual",
        animation: false,
        html: true
      }).on("mouseenter", function() {
        var _this;
        _this = this;
        $(this).popover("show");
        $('.popover').on("mouseleave", function() {
          $(_this).popover("hide");
        });
      }).on("mouseleave", function() {
        var _this;
        _this = this;
        setTimeout((function() {
          if (!$(".popover:hover").length) {
            $(_this).popover("hide");
          }
        }), 100);
      });
      return this;
    };

    ScaleChooserView.prototype.getRegionName = function() {
      var regionCode, regionOptions;
      regionCode = Backbone.history.fragment.split(':')[1];
      regionOptions = MacArthur.CONFIG.regions;
      return _.find(regionOptions, function(o) {
        return o.code === regionCode;
      }).name;
    };

    ScaleChooserView.prototype.triggerChooseScale = function(event) {
      var scaleCode;
      scaleCode = $(event.target).attr('data-scale-code') || $(event.target).find('.scale-link').attr('data-scale-code');
      return Backbone.appRouter.navigate("" + Backbone.history.fragment + "/scale:" + scaleCode, {
        trigger: true
      });
    };

    ScaleChooserView.prototype.goBack = function(e) {
      e.preventDefault();
      return Backbone.appRouter.navigate('/', {
        trigger: true
      });
    };

    ScaleChooserView.prototype.onClose = function() {
      return $('.popover[role="tooltip"]').remove();
    };

    return ScaleChooserView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.SpinView = (function(_super) {
    __extends(SpinView, _super);

    function SpinView() {
      return SpinView.__super__.constructor.apply(this, arguments);
    }

    SpinView.prototype.template = _.template("<p>Loading...</p>");

    SpinView.prototype.className = 'modal spin';

    SpinView.prototype.initialize = function(options) {
      return this.render();
    };

    SpinView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    return SpinView;

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
      var conf, defaultOption, options, pdf, region, scale, scenarioDescription, scenarios, theSelect;
      scale = this.filter.get('scale').get('code');
      region = this.filter.get('region').get('code');
      options = {
        name: 'scenario',
        scale: scale,
        region: region
      };
      scenarios = MacArthur.getFilterOptionsWithSelectedSet(this.filter, options);
      conf = MacArthur.CONFIG;
      pdf = conf.scenariosPdfs[scale][region] || conf.scenariosPdfs[scale];
      scenarioDescription = this.getScenarioDescription();
      defaultOption = this.filter.get('scenario') != null ? false : true;
      this.$el.html(this.template({
        filter: this.filter,
        scenarios: scenarios,
        defaultOption: defaultOption,
        scenarioDescription: scenarioDescription,
        isFutureTab: this.isFutureTab(),
        pdf: pdf
      }));
      theSelect = this.$el.find('.select-box');
      setTimeout((function(_this) {
        return function() {
          theSelect.customSelect();
          return _this.$el.find('.customSelectInner').css({
            'width': '100%'
          });
        };
      })(this), 20);
      return this;
    };

    ScenarioSelectorView.prototype.onClose = function() {};

    ScenarioSelectorView.prototype.setScenario = function(event) {
      var scenarioName;
      scenarioName = $(event.target).find(':selected').attr('value');
      return this.filter.set('scenario', scenarioName);
    };

    ScenarioSelectorView.prototype.getScenarioDescription = function() {
      var scale;
      scale = this.filter.get('scale').get('code');
      if (scale === 'broadscale') {
        return 'These scenarios are based on UNEP GEO4';
      } else {
        return 'These scenarios are based on regional scenarios and workshops';
      }
    };

    ScenarioSelectorView.prototype.isFutureTab = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'future_threats') {
        return true;
      } else {
        return false;
      }
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
      this.listenTo(this.filter, 'change:subject', this.setDefaultLens);
      if (this.filter.get('lens') == null) {
        this.setDefaultLens();
      }
      return this.render();
    };

    LensSelectorView.prototype.render = function() {
      var lenses, subject, theSelect;
      subject = this.filter.get('subject');
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
        lenses: lenses,
        heading: this.getLensTitle(),
        title: this.getLensTitle(),
        subject: subject.charAt(0).toUpperCase() + subject.slice(1)
      }));
      theSelect = this.$el.find('.select-box');
      setTimeout((function(_this) {
        return function() {
          theSelect.customSelect();
          return _this.$el.find('.customSelectInner').css({
            'width': '100%'
          });
        };
      })(this), 20);
      return this;
    };

    LensSelectorView.prototype.setLens = function(event) {
      var lensName;
      lensName = $(event.target).find(':selected').attr('value');
      return this.filter.set('lens', lensName);
    };

    LensSelectorView.prototype.onClose = function() {
      return this.remove();
    };

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

    LensSelectorView.prototype.getLensTitle = function() {
      if (this.filter.get('subject') === 'biodiversity') {
        return {
          title: "For Species",
          tooltip: "View results for total or a subset of species"
        };
      } else if (this.filter.get('subject') === 'ecosystem') {
        return {
          title: "By provision",
          tooltip: "View results for total or a subset of ecosystem functions"
        };
      }
    };

    return LensSelectorView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.LevelSelectorView = (function(_super) {
    __extends(LevelSelectorView, _super);

    function LevelSelectorView() {
      this.setConfig = __bind(this.setConfig, this);
      return LevelSelectorView.__super__.constructor.apply(this, arguments);
    }

    LevelSelectorView.prototype.template = Handlebars.templates['level_selector'];

    LevelSelectorView.prototype.events = {
      "change #levels-select": "setLevel"
    };

    LevelSelectorView.prototype.initialize = function(options) {
      LevelSelectorView.__super__.initialize.apply(this, arguments);
      this.listenTo(this.filter, 'change:tab', this.setConfig);
      this.setConfig();
      this.levelType = 'level';
      if (this.filter.get('level') == null) {
        this.setDefaultLevel();
      }
      if (!this.isFutureTab()) {
        return this.render();
      }
    };

    LevelSelectorView.prototype.setConfig = function() {
      var l;
      l = MacArthur.CONFIG.levels[this.filter.get('tab')] || MacArthur.CONFIG.levels['default'];
      return this.config = _.cloneDeep(l);
    };

    LevelSelectorView.prototype.isFutureTab = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'future_threats') {
        return true;
      } else {
        return false;
      }
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
      'change [type="checkbox"]': "setPressure",
      'click .for-checkbox': "toggleCheckbox"
    };

    PressureOptionView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.pressure = this.filter.get('pressure');
      return this.render();
    };

    PressureOptionView.prototype.render = function() {};

    PressureOptionView.prototype.setPressure = function(event) {
      this.filter.set('pressure', $(event.target).is(':checked'));
      return this.unsetPressureLevel();
    };

    PressureOptionView.prototype.unsetPressureLevel = function() {
      if (this.filter.get('pressure') === false) {
        return this.filter.unset('pressureLevel');
      }
    };

    PressureOptionView.prototype.toggleCheckbox = function(event) {
      var checkBox, isChecked;
      checkBox = $(event.target).parent().find('input');
      isChecked = checkBox.prop("checked");
      checkBox.prop("checked", !isChecked);
      this.filter.set('pressure', !isChecked);
      return this.unsetPressureLevel();
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
      'change [type="checkbox"]': "setProtection",
      'click .for-checkbox': "toggleCheckbox"
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

    ProtectionOptionView.prototype.toggleCheckbox = function(event) {
      var checkBox, isChecked;
      checkBox = $(event.target).parent().find('input');
      isChecked = checkBox.prop("checked");
      checkBox.prop("checked", !isChecked);
      this.filter.set('protection', !isChecked);
      return this.unsetProtectionLevel();
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
      this.resultsNumber = options.resultsNumber;
      this.listenTo(this.filter, 'change', this.render);
      return this.render();
    };

    FilterView.prototype.render = function() {
      var options, subjects;
      options = {
        name: 'subject'
      };
      subjects = MacArthur.getFilterOptionsWithSelectedSet(this.filter, options);
      this.$el.html(this.template({
        thisView: this,
        subjects: subjects,
        showLensSelector: this.showLensSelector(),
        showScenarioGroup: this.showScenarioGroup(),
        showScenarioSelector: this.showScenarioSelector(),
        showOtherSelectors: this.showOtherSelectors(),
        filter: this.filter,
        resultsNumber: this.resultsNumber,
        isNowTab: this.isNowTab()
      }));
      this.attachSubViews();
      this.initialiseTooltips();
      $('.popover[role="tooltip"]').remove();
      return this;
    };

    FilterView.prototype.initialiseTooltips = function() {
      return this.$el.find("[data-toggle=\"popover\"]").popover({
        trigger: "manual",
        animation: false,
        html: true
      }).on("mouseenter", function() {
        var _this;
        _this = this;
        $(this).popover("show");
        $('.popover').on("mouseleave", function() {
          $(_this).popover("hide");
        });
      }).on("mouseleave", function() {
        var _this;
        _this = this;
        setTimeout((function() {
          if (!$(".popover:hover").length) {
            $(_this).popover("hide");
          }
        }), 100);
      });
    };

    FilterView.prototype.setSubject = function(event) {
      var subjectName;
      subjectName = $(event.target).attr('data-subject');
      return this.filter.set('subject', subjectName);
    };

    FilterView.prototype.onClose = function() {
      this.closeSubViews();
      return this.stopListening();
    };

    FilterView.prototype.showLensSelector = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'now') {
        return this.filter.get('subject') != null;
      }
      if (tab === 'change') {
        return (this.filter.get('subject') != null) && (this.filter.get('scenario') != null);
      }
      if (tab === 'future_threats') {
        return this.showOtherSelectors();
      }
      return false;
    };

    FilterView.prototype.isNowTab = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'now') {
        return true;
      } else {
        return false;
      }
    };

    FilterView.prototype.showScenarioGroup = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'future_threats') {
        return true;
      } else {
        return false;
      }
    };

    FilterView.prototype.showScenarioSelector = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'change' || tab === 'future_threats') {
        return this.filter.get('subject') != null;
      }
      return false;
    };

    FilterView.prototype.showOtherSelectors = function() {
      var tab;
      tab = this.filter.get('tab');
      if (tab === 'now') {
        return this.filter.get('subject') != null;
      }
      if (tab === 'change') {
        return (this.filter.get('subject') != null) && (this.filter.get('scenario') != null);
      }
      if (tab === 'future_threats') {
        return (this.filter.get('subject') != null) && (this.filter.get('scenario') != null);
      }
      return false;
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
      if (this.view) {
        $('body').find('.disabler').remove();
        return this.view.close();
      }
    };

    return ModalContainer;

  })();

  Backbone.Controllers.MainController = (function(_super) {
    __extends(MainController, _super);

    function MainController() {
      this.showMap = __bind(this.showMap, this);
      this.regions = new Backbone.Collections.RegionCollection(MacArthur.CONFIG.regions);
      this.scales = new Backbone.Collections.ScaleCollection(MacArthur.CONFIG.scales);
      this.filter = new Backbone.Models.Filter();
      this.resultsNumber = new Backbone.Models.ResultsNumber();
      this.queryBuilder = new window.MacArthur.QueryBuilder(this.filter);
      this.modalContainer = new ModalContainer();
      this.sidePanel = new Backbone.Diorama.ManagedRegion();
      this.sidePanel.$el.attr('id', 'side-panel');
      this.sidePanel.$el.insertAfter('#map');
      this.map = this.showMap();
      Backbone.appRouter = new Backbone.Router.AppRouter({
        regions: this.regions,
        scales: this.scales,
        modalContainer: this.modalContainer,
        filter: this.filter,
        sidePanel: this.sidePanel,
        map: this.map,
        resultsNumber: this.resultsNumber
      });
      Backbone.history.start();
    }

    MainController.prototype.showMap = function() {
      return new Backbone.Views.MapView({
        filter: this.filter,
        resultsNumber: this.resultsNumber
      });
    };

    return MainController;

  })(Backbone.Diorama.Controller);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Router || (_base.Router = {});

  Backbone.Router.AppRouter = (function(_super) {
    __extends(AppRouter, _super);

    function AppRouter() {
      this.setSideView = __bind(this.setSideView, this);
      this.showSidePanel = __bind(this.showSidePanel, this);
      this.showScaleChooser = __bind(this.showScaleChooser, this);
      this.showRegionChooser = __bind(this.showRegionChooser, this);
      return AppRouter.__super__.constructor.apply(this, arguments);
    }

    AppRouter.prototype.routes = {
      '': 'showRegionChooser',
      'region::region': 'showScaleChooser',
      'region::region/scale::scale': 'showSidePanel'
    };

    AppRouter.prototype.initialize = function(options) {
      this.regions = options.regions;
      this.scales = options.scales;
      this.filter = options.filter;
      this.modalContainer = options.modalContainer;
      this.sidePanel = options.sidePanel;
      this.map = options.map;
      this.resultsNumber = options.resultsNumber;
      return this.geoms = {};
    };

    AppRouter.prototype.showRegionChooser = function() {
      var regionChooserView;
      this.modalContainer.hideModal();
      this.sidePanel.$el.removeClass('active');
      regionChooserView = new Backbone.Views.RegionChooserView({
        regions: this.regions
      });
      return this.modalContainer.showModal(regionChooserView);
    };

    AppRouter.prototype.showScaleChooser = function(regionCode) {
      var scaleChooserView;
      this.sidePanel.$el.removeClass('active');
      this.modalContainer.hideModal();
      scaleChooserView = new Backbone.Views.ScaleChooserView({
        scales: this.scales
      });
      return this.modalContainer.showModal(scaleChooserView);
    };

    AppRouter.prototype.showSidePanel = function(regionCode, scaleCode) {
      var geom, init, spinView;
      this.modalContainer.hideModal();
      spinView = new Backbone.Views.SpinView();
      this.modalContainer.showModal(spinView);
      init = (function(_this) {
        return function(geo) {
          var region, scale;
          _this.modalContainer.hideModal();
          region = _this.regions.find(function(region) {
            return region.get('code') === regionCode;
          });
          scale = _this.scales.find(function(scale) {
            return scale.get('code') === scaleCode;
          });
          _this.sidePanel.$el.addClass('active');
          _this.filter.set({
            region: region
          });
          _this.filter.set({
            scale: scale
          });
          _this.sideView = _this.setSideView();
          _this.sidePanel.showView(_this.sideView);
          _this.map.initQueryLayer(geo, region, scale);
          return _this.geo = geo;
        };
      })(this);
      geom = this.geoms["" + regionCode + "_" + scaleCode];
      if (geom) {
        init(geom);
      } else {
        $.getJSON("../../../data/" + regionCode + "_" + scaleCode + ".topo.json", (function(_this) {
          return function(geo) {
            init(geo);
            return _this.geoms["" + regionCode + "_" + scaleCode] = geo;
          };
        })(this));
      }
      return this.currentRegionCode = regionCode;
    };

    AppRouter.prototype.setSideView = function() {
      if (this.sideView) {
        this.sideView.close();
      }
      return this.sideView = new Backbone.Views.TabView({
        filter: this.filter,
        resultsNumber: this.resultsNumber
      });
    };

    return AppRouter;

  })(Backbone.Router);

}).call(this);
