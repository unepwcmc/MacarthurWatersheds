window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ScenarioSelectorView extends Backbone.View
  template: Handlebars.templates['scenario_selector']

  initialize: (options) ->
    @render()

  render: ->
    @$el.html(@template())
    return @

  onClose: ->
    
