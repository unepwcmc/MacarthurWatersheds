window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LensView extends Backbone.View
  template: Handlebars.templates['lens']

  initialize: (options) ->
    @render()

  render: ->
    @$el.html(@template())
    return @

  onClose: ->
    
