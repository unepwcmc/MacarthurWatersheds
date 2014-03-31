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
    scenarios = MacArthur.getFilterOptionsWithSelectedSet(@filter, 'scenario')
    @$el.html(@template(
      filter: @filter
      scenarios: scenarios
    ))

    # SORRY
    theSelect = @$el.find('.select-box')
    setTimeout(->
      theSelect.customSelect()
    , 100)
    # /SORRY

    return @

  onClose: ->

  setScenario: (event) ->
    scenarioName = $(event.target).find(':selected').attr('value')
    @filter.set('scenario', scenarioName)
    
