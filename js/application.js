(function() {
  window.MacArthur || (window.MacArthur = {});

  MacArthur.CONFIG = {
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
        bounds: [[-18, 15], [26, 12]]
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
    levels: [
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
        return "SELECT d.watershed_id, value, percentage as protection_percentage \nFROM macarthur_region r \nRIGHT JOIN macarthur_watershed w on r.cartodb_id = w.region_id \nLEFT JOIN macarthur_datapoint d on d.watershed_id = w.cartodb_id \nLEFT JOIN macarthur_lens lens on lens.cartodb_id = d.lens_id \nLEFT JOIN macarthur_protection p on p.watershed_id = w.cartodb_id \nWHERE r.code = '" + regionCode + "' \nAND " + (this.buildSubjectClause()) + " \nAND " + (this.buildLensClause()) + "\nAND metric = 'imp' \nAND scenario = 'bas' \nAND type_data = 'value'";
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

    QueryBuilder.prototype.buildLensClause = function() {
      var lensCode;
      lensCode = this.filter.get('lens');
      return "lens.type = '" + lensCode + "' ";
    };

    QueryBuilder.prototype.hasRequiredFilters = function() {
      var lensCode, subjectCode;
      subjectCode = this.filter.get('subject');
      lensCode = this.filter.get('lens');
      if ((subjectCode != null) && (lensCode != null)) {
        return _.find(MacArthur.CONFIG.lenses[subjectCode], (function(_this) {
          return function(lens) {
            return lens.selector === lensCode;
          };
        })(this)) != null;
      }
      return false;
    };

    QueryBuilder.prototype.updateFilterQuery = function(model, event) {
      if (!((this.filter.changedAttributes().query != null) || (this.filter.changedAttributes().protection != null) || (this.filter.changedAttributes().protection_levels != null))) {
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

  Backbone.Views.MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      this.queryPolyStyle = __bind(this.queryPolyStyle, this);
      this.getColor = __bind(this.getColor, this);
      this.updateQueryLayer = __bind(this.updateQueryLayer, this);
      return MapView.__super__.constructor.apply(this, arguments);
    }

    MapView.prototype.template = Handlebars.templates['map'];

    MapView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.initBaseLayer();
      return this.filter.on('change:query', this.updateQueryLayer);
    };

    MapView.prototype.initBaseLayer = function() {
      this.map = L.map('map', {
        scrollWheelZoom: false
      }).setView([0, 0], 2);
      this.queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?';
      return L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
        attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
      }).addTo(this.map);
    };

    MapView.prototype.initQueryLayer = function(geo, region) {
      var regionBounds, regionCode;
      this.region = region;
      regionCode = region.get('code');
      regionBounds = region.get('bounds');
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

    MapView.prototype.updateQueryLayer = function() {
      var q;
      this.map.removeLayer(this.queryLayer);
      q = this.filter.get('query');
      return $.getJSON("https://carbon-tool.cartodb.com/api/v2/sql?q=" + q, (function(_this) {
        return function(data) {
          _this.max = 0;
          _this.min = Infinity;
          _this.querydata = _.object(_.map(data.rows, function(x) {
            if (x.value > _this.max) {
              _this.max = x.value;
            }
            if (x.value < _this.min) {
              _this.min = x.value;
            }
            return [x.watershed_id, x.value];
          }));
          _this.range = (_this.max - _this.min) / 4;
          _this.queryLayer = L.geoJson(_this.collection, {
            style: _this.queryPolyStyle
          }).addTo(_this.map);
          return _this.queryLayerInteriors.bringToFront();
        };
      })(this));
    };

    MapView.prototype.updateCollection = function(collection, data) {};

    MapView.prototype.getColor = function(feature) {
      var d, p;
      d = this.querydata[feature];
      p = d - this.min;
      if (p > this.min + this.range * 3) {
        return '#fdbe85';
      }
      if (p > this.min + this.range * 2) {
        return '#fd8d3c';
      }
      if (p > this.min + this.range) {
        return '#d94701';
      }
      if (p > this.min) {
        return '#feedde';
      }
      return '#fff';
    };

    MapView.prototype.baseLineStyle = function(feature) {
      return {
        weight: 1.5,
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
      return {
        weight: 0,
        opacity: 0,
        fillOpacity: 0.9,
        fillColor: this.getColor(feature.properties.cartodb_id)
      };
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
      this.regions = new Backbone.Collections.RegionCollection(MacArthur.CONFIG.regions);
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

    LensSelectorView.prototype.config = MacArthur.CONFIG.lenses;

    LensSelectorView.prototype.events = {
      "change #lens-select": "setLens"
    };

    LensSelectorView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.filter.on('change:subject', this.setDefaultLens);
      if (this.filter.get('lens') == null) {
        this.setDefaultLens();
      }
      return this.render();
    };

    LensSelectorView.prototype.render = function() {
      var lenses;
      lenses = _.map(this.config[this.filter.get('subject')], (function(_this) {
        return function(lens) {
          if (_this.filter.get('lens') === lens.selector) {
            lens.selected = true;
          }
          return lens;
        };
      })(this));
      this.$el.html(this.template({
        lenses: lenses
      }));
      return this;
    };

    LensSelectorView.prototype.setLens = function(event) {
      var lensName;
      lensName = $(event.target).find(':selected').attr('value');
      return this.filter.set('lens', lensName);
    };

    LensSelectorView.prototype.onClose = function() {};

    LensSelectorView.prototype.setDefaultLens = function() {
      return this.filter.set('lens', this.getDefaultFilter().selector);
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
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.LevelSelectorView = (function(_super) {
    __extends(LevelSelectorView, _super);

    function LevelSelectorView() {
      this.setDefaultLevel = __bind(this.setDefaultLevel, this);
      return LevelSelectorView.__super__.constructor.apply(this, arguments);
    }

    LevelSelectorView.prototype.template = Handlebars.templates['level_selector'];

    LevelSelectorView.prototype.config = MacArthur.CONFIG.levels;

    LevelSelectorView.prototype.events = {
      "change #levels-select": "setLevel"
    };

    LevelSelectorView.prototype.initialize = function(options) {
      this.filter = options.filter;
      if (this.filter.get('level') == null) {
        this.setDefaultLevel();
      }
      return this.render();
    };

    LevelSelectorView.prototype.render = function() {
      var levels;
      levels = _.map(this.config, (function(_this) {
        return function(level) {
          if (_this.filter.get('level') === level.selector) {
            level.selected = true;
          }
          return level;
        };
      })(this));
      this.$el.html(this.template({
        levels: levels
      }));
      return this;
    };

    LevelSelectorView.prototype.setLevel = function(event) {
      var levelName;
      levelName = $(event.target).find(':selected').attr('value');
      return this.filter.set('level', levelName);
    };

    LevelSelectorView.prototype.onClose = function() {};

    LevelSelectorView.prototype.setDefaultLevel = function() {
      return this.filter.set('level', this.getDefaultFilter().selector);
    };

    LevelSelectorView.prototype.getDefaultFilter = function() {
      return _.find(this.config, function(obj) {
        return obj["default"] != null;
      });
    };

    return LevelSelectorView;

  })(Backbone.View);

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
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.ProtectionSelectorView = (function(_super) {
    __extends(ProtectionSelectorView, _super);

    function ProtectionSelectorView() {
      this.setDefaultProtectionLevel = __bind(this.setDefaultProtectionLevel, this);
      return ProtectionSelectorView.__super__.constructor.apply(this, arguments);
    }

    ProtectionSelectorView.prototype.template = Handlebars.templates['protection_selector'];

    ProtectionSelectorView.prototype.config = MacArthur.CONFIG.protectionLevels;

    ProtectionSelectorView.prototype.events = {
      'change #protection-select': "setProtectionLevel"
    };

    ProtectionSelectorView.prototype.initialize = function(options) {
      this.filter = options.filter;
      if (this.filter.get('protectionLevel') == null) {
        this.setDefaultProtectionLevel();
      }
      return this.render();
    };

    ProtectionSelectorView.prototype.render = function() {
      var protectionLevels;
      protectionLevels = _.map(this.config, (function(_this) {
        return function(level) {
          if (_this.filter.get('protectionLevel') === level.selector) {
            level.selected = true;
          }
          return level;
        };
      })(this));
      return this.$el.html(this.template({
        protectionLevels: protectionLevels
      }));
    };

    ProtectionSelectorView.prototype.setProtectionLevel = function(event) {
      var level;
      level = $(event.target).find(':selected').attr('value');
      return this.filter.set('protectionLevel', level);
    };

    ProtectionSelectorView.prototype.onClose = function() {};

    ProtectionSelectorView.prototype.setDefaultProtectionLevel = function() {
      return this.filter.set('protectionLevel', this.getDefaultFilter().selector);
    };

    ProtectionSelectorView.prototype.getDefaultFilter = function() {
      return _.find(this.config, function(obj) {
        return obj["default"] != null;
      });
    };

    return ProtectionSelectorView;

  })(Backbone.View);

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
        filter: this.filter
      }));
      this.attachSubViews();
      return this;
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
      regionChooserView = new Backbone.Views.RegionChooserView();
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
      view = new Backbone.Views.FilterView({
        filter: this.filter
      });
      this.sidePanel.showView(view);
      return this.map.initQueryLayer(geo, region);
    };

    return MainController;

  })(Backbone.Diorama.Controller);

}).call(this);
