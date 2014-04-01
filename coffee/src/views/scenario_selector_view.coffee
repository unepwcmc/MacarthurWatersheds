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
    defaultOption = if @filter.get('scenario')? then no else yes
    @$el.html(@template(
      filter: @filter
      scenarios: scenarios
      defaultOption: defaultOption
    ))

    # SORRY
    theSelect = @$el.find('.select-box')
    setTimeout(->
      theSelect.customSelect()
    , 20)
    # /SORRY

    return @

  onClose: ->

  setScenario: (event) ->
    scenarioName = $(event.target).find(':selected').attr('value')
    @filter.set('scenario', scenarioName)
    
