suite 'Tab View'

test('when the `change` tab selector has been clicked the view 
 re-renders and the scenario subview is rendered', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )
  scenarioRenderSpy = sinon.spy(Backbone.Views.ScenarioSelectorView::, 'render')

  tabView = new Backbone.Views.TabView( filter: filter )

  tabView.$el.find('li.change-tab').trigger('click')

  try
    assert.strictEqual(
      scenarioRenderSpy.callCount, 1,
      "Expected the filterView to be called once"
    )

  finally
    scenarioRenderSpy.restore()

)