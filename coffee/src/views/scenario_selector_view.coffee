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
    scale = @filter.get('scale').get('code')
    scenarios = MacArthur.getFilterOptionsWithSelectedSet(@filter, 'scenario', null, scale)
    defaultOption = if @filter.get('scenario')? then no else yes
    @$el.html(@template(
      filter: @filter
      scenarios: scenarios
      defaultOption: defaultOption
    ))

    # SORRY
    theSelect = @$el.find('.select-box')
    setTimeout(=>
      theSelect.customSelect()
      @$el.find('.customSelectInner').css({'width': '100%'})
    , 20)
    # /SORRY

    return @

  onClose: ->

  setScenario: (event) ->
    scenarioName = $(event.target).find(':selected').attr('value')
    @filter.set('scenario', scenarioName)
    
