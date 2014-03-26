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
      scenarioRenderSpy.callCount, 2,
      "Expected the filterView to be called twice"
    )

  finally
    scenarioRenderSpy.restore()

)

test('when the `change` tab selector has been clicked an `active` class 
  is set on it and removed from all other siblings', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  tabView = new Backbone.Views.TabView( filter: filter )

  activeTab = tabView.$el.find('ul.tabs li.active')
  assert.strictEqual(
    activeTab.attr('data-subject'), 'now',
    "Expected the `now` tab to be active"
  )

  tabView.$el.find('li.change-tab').trigger('click')

  activeTab = tabView.$el.find('ul.tabs li.active')
  assert.strictEqual(
    activeTab.attr('data-subject'), 'change',
    "Expected the `change` tab to be active"
  )
  assert.isFalse(
    activeTab.siblings().hasClass('active'),
    "Expected other tabs NOT to be active"
  )

)

test('when the `Future Threats` tab selector is clicked,
  the LensSelectorView is not rendered,
  the LevelSelectorAgrCommDevView is rendered', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )
  lensSelectorRenderSpy = sinon.spy(
    Backbone.Views.LensSelectorView::, 'render')
  levelSelectorAgrCommDevRenderSpy = sinon.spy(
    Backbone.Views.LevelSelectorAgrCommDevView::, 'render')

  tabView = new Backbone.Views.TabView( filter: filter )

  tabView.$el.find('li.future_threats-tab').trigger('click')

  try
    assert.strictEqual(
      lensSelectorRenderSpy.callCount, 1,
      "Expected the lensSelectorView to be called once"
    )
    assert.strictEqual(
      levelSelectorAgrCommDevRenderSpy.callCount, 1,
      "Expected the levelSelectorAgrCommDevView to be called once"
    )

  finally
    lensSelectorRenderSpy.restore()
    levelSelectorAgrCommDevRenderSpy.restore()

)