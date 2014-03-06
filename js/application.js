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
  var regions, _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  regions = [
    {
      id: 1,
      name: "Andes"
    }, {
      id: 2,
      name: "African Great Lakes"
    }, {
      id: 3,
      name: "Mekong"
    }
  ];

  Backbone.Views.RegionChooserView = (function(_super) {
    __extends(RegionChooserView, _super);

    function RegionChooserView() {
      this.triggerChooseRegion = __bind(this.triggerChooseRegion, this);
      return RegionChooserView.__super__.constructor.apply(this, arguments);
    }

    RegionChooserView.prototype.template = Handlebars.templates['region_chooser'];

    RegionChooserView.prototype.events = {
      "click .regions li": "triggerChooseRegion"
    };

    RegionChooserView.prototype.initialize = function(options) {
      this.regions = new Backbone.Collections.RegionCollection(regions);
      return this.render();
    };

    RegionChooserView.prototype.render = function() {
      this.$el.html(this.template({
        regions: this.regions.toJSON()
      }));
      return this;
    };

    RegionChooserView.prototype.triggerChooseRegion = function(event) {
      var regionId;
      regionId = $(event.target).attr('data-region-id');
      return this.trigger('regionChosen', this.regions.get(regionId));
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

  Backbone.Views.PerspectiveView = (function(_super) {
    __extends(PerspectiveView, _super);

    function PerspectiveView() {
      return PerspectiveView.__super__.constructor.apply(this, arguments);
    }

    PerspectiveView.prototype.template = Handlebars.templates['perspective'];

    PerspectiveView.prototype.initialize = function(options) {
      return this.render();
    };

    PerspectiveView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    PerspectiveView.prototype.onClose = function() {};

    return PerspectiveView;

  })(Backbone.View);

}).call(this);

(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Controllers || (_base.Controllers = {});

  Backbone.Controllers.MainController = (function(_super) {
    __extends(MainController, _super);

    function MainController() {
      this.chooseRegion = __bind(this.chooseRegion, this);
      this.mainRegion = new Backbone.Diorama.ManagedRegion();
      $('body').append(this.mainRegion.$el);
      this.chooseRegion();
    }

    MainController.prototype.chooseRegion = function() {
      var regionChooserView;
      regionChooserView = new Backbone.Views.RegionChooserView();
      this.mainRegion.showView(regionChooserView);

      /*
        @changeStateOn maps events published by other objects to
        controller states
       */
      return this.changeStateOn();
    };

    return MainController;

  })(Backbone.Diorama.Controller);

}).call(this);
