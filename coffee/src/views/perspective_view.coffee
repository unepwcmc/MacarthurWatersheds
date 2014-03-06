window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.PerspectiveView extends Backbone.View
  template: Handlebars.templates['perspective']

  initialize: (options) ->
    @render()

  render: ->
    @$el.html(@template())
    return @

  onClose: ->
    
