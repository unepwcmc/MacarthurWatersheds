window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.FilterView extends Backbone.View
  template: Handlebars.templates['filter']

  initialize: (options) ->
    @render()

  render: ->
    @$el.html(@template())
    return @

  onClose: ->
    
