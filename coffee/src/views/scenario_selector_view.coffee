window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ScenarioSelectorView extends Backbone.View
  template: Handlebars.templates['scenario_selector']

  events:
    "change #scenario-select": "setScenario"

  initialize: (options) ->
    @config = _.cloneDeep(MacArthur.CONFIG.scenarios)
    @filter = options.filter
    @render()

  render: ->
    scenarios = _.map(@config, (scenario) =>
      if @filter.get('scenario') is scenario.selector
        scenario.selected = true
      else
        scenario.selected = false
      scenario
    )
    @$el.html(@template(
      filter: @filter
      scenarios: scenarios
    ))
    return @

  onClose: ->

  setScenario: ->
    scenarioName = $(event.target).find(':selected').attr('value')
    @filter.set('scenario', scenarioName)

    
