window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  initialize: (options) ->
    @mapBuilder = new window.MacArthur.MapBuilder()
    @mapBuilder.initBaseLayer()
    @filter = options.filter
