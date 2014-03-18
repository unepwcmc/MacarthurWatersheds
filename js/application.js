(function() {
  window.MacArthur || (window.MacArthur = {});

  MacArthur.CONFIG = {
    regions: [
      {
        code: "WAN",
        name: "Andes"
      }, {
        code: "MEK",
        name: "Mekong"
      }, {
        code: "GLR",
        name: "African Great Lakes"
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
    }
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

    Filter.prototype.buildQuery = function() {};

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
      return "SELECT watershed_id, value, w.the_geom_webmercator FROM macarthur_region r right join macarthur_watershed w on r.cartodb_id = w.region_id left join macarthur_datapoint d on d.watershed_id = w.cartodb_id left join macarthur_lens l on l.cartodb_id = d.lens_id   where r.code = 'WAN' AND l.name = 'bd' AND l.type = 'allsp' and metric = 'imp' and scenario = 'bas' and type_data = 'value'";
    };

    QueryBuilder.prototype.updateFilterQuery = function(model, event) {
      if (model.changedAttributes().query == null) {
        return this.filter.set('query', this.buildQuery());
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
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      return MapView.__super__.constructor.apply(this, arguments);
    }

    MapView.prototype.template = Handlebars.templates['map'];

    MapView.prototype.initialize = function(options) {
      this.map = L.map('map', {
        scrollWheelZoom: false
      }).setView([0, 0], 2);
      this.queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?';
      L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
        attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
      }).addTo(this.map);
      this.css = '#macarthur_datapoint{ polygon-opacity: 0.8; line-color: #FFF; line-width: 1; line-opacity: 1macarthur_datapoint [ value <= 0.6177211398] {  polygon-fill: #005824macarthur_datapoint [ value <= 0.0007393294] {  polygon-fill: #238B45macarthur_datapoint [ value <= -0.000997682] {  polygon-fill: #41AE76macarthur_datapoint [ value <= -0.0109500099] {  polygon-fill: #66C2A4macarthur_datapoint [ value <= -0.0235889656] {  polygon-fill: #CCECE6macarthur_datapoint [ value <= -0.0845306143] {  polygon-fill: #D7FAF4macarthur_datapoint [ value <= -0.2292566377] {  polygon-fill: #EDF8FB;';
      return this.filter = options.filter;
    };

    MapView.prototype.initQueryLayer = function(geo) {
      this.collection = topojson.feature(geo, geo.objects.macarthur_watershed);
      this.interiors = topojson.mesh(geo, geo.objects.macarthur_watershed, function(a, b) {
        return a !== b;
      });
      this.queryLayer = L.geoJson(this.collection, {
        style: this.baseStyle
      }).addTo(this.map);
      return L.geoJson(this.interiors, {
        style: this.baseStyle
      }).addTo(this.map);
    };

    MapView.prototype.baseStyle = function(feature) {
      return {
        weight: 0.6,
        opacity: 1,
        color: 'white',
        fillOpacity: 0
      };
    };

    MapView.prototype.onClose = function() {};

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
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.LensSelectorView = (function(_super) {
    __extends(LensSelectorView, _super);

    function LensSelectorView() {
      return LensSelectorView.__super__.constructor.apply(this, arguments);
    }

    LensSelectorView.prototype.template = Handlebars.templates['lens_selector'];

    LensSelectorView.prototype.config = MacArthur.CONFIG.lenses;

    LensSelectorView.prototype.events = {
      "change #lens-select": "setLens"
    };

    LensSelectorView.prototype.initialize = function(options) {
      this.filter = options.filter;
      this.filter.set('lens', this.getDefaultFilter().selector, {
        silent: true
      });
      return this.render();
    };

    LensSelectorView.prototype.render = function() {
      var lenses;
      lenses = this.config[this.filter.get('subject')];
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

  Backbone.Views.FilterView = (function(_super) {
    __extends(FilterView, _super);

    function FilterView() {
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
        newState: this.showSidePanel
      });
    };

    MainController.prototype.showSidePanel = function(region) {
      return $.getJSON('../../../data/macarthur_watershed.topo.json', (function(_this) {
        return function(geo) {
          var view;
          _this.modalContainer.hideModal();
          _this.filter.set({
            region: region
          });
          view = new Backbone.Views.FilterView({
            filter: _this.filter
          });
          _this.sidePanel.showView(view);
          return _this.map.initQueryLayer(geo);
        };
      })(this));
    };

    return MainController;

  })(Backbone.Diorama.Controller);

}).call(this);
