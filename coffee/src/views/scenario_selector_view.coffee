window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ScenarioSelectorView extends Backbone.View
  template: Handlebars.templates['scenario_selector']

  initialize: (options) ->
    @filter = options.filter
    @render()

  render: ->
    @$el.html(@template(
      filter: @filter
      scenarios: MacArthur.CONFIG.scenarios
    ))
    return @

  onClose: ->

  setDefaultFilter: =>
    @filter.set('lens', @getDefaultFilter().selector)
    
