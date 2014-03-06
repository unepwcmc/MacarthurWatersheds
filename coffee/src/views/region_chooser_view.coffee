window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.RegionChooserView extends Backbone.View
  template: Handlebars.templates['region_chooser']

  initialize: (options) ->
    @render()

  render: ->
    @$el.html(@template())
    return @

  onClose: ->
    
