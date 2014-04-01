suite 'Scenario View'

test('in the Future Threats tab, if the subject filter is set, and a scenario
 is selected, the filter should be set accordingly', ->

  selector = MacArthur.CONFIG.scenarios[1].selector
  filter = new Backbone.Models.Filter()

  scenarioView = new Backbone.Views.ScenarioSelectorView( filter: filter )
  filter.set('tab', 'future_threats')
  filter.set('subject', 'biodiversity')

  scenarioView.$el.find("#scenario-select option[value='#{selector}']")
    .prop('selected', true)
  scenarioView.$el.find("#scenario-select").trigger('change')

  assert.strictEqual( filter.get('scenario'), selector)

)

test('in the Change tab, if the subject filter is set, and a scenario
 is selected, the filter should be set accordingly', ->

  selector = MacArthur.CONFIG.scenarios[1].selector
  filter = new Backbone.Models.Filter()
  scenarioView = new Backbone.Views.ScenarioSelectorView( filter: filter )

  filter.set('tab', 'change')
  filter.set('subject', 'biodiversity')

  scenarioView.$el.find("#scenario-select option[value='#{selector}']")
    .prop('selected', true)
  scenarioView.$el.find("#scenario-select").trigger('change')

  assert.strictEqual( filter.get('scenario'), selector)

)