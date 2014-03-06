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
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Backbone || (window.Backbone = {});

  (_base = window.Backbone).Views || (_base.Views = {});

  Backbone.Views.RegionChooserView = (function(_super) {
    __extends(RegionChooserView, _super);

    function RegionChooserView() {
      return RegionChooserView.__super__.constructor.apply(this, arguments);
    }

    RegionChooserView.prototype.template = Handlebars.templates['region_chooser'];

    RegionChooserView.prototype.initialize = function(options) {
      return this.render();
    };

    RegionChooserView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    RegionChooserView.prototype.onClose = function() {};

    return RegionChooserView;

  })(Backbone.View);

}).call(this);
