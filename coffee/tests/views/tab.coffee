suite 'Tab View'

test('when the `change` tab selector and the `subject` selector have been clicked, 
 the view re-renders and the scenario subview is rendered', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )
  scenarioRenderSpy = sinon.spy(Backbone.Views.ScenarioSelectorView::, 'render')

  tabView = new Backbone.Views.TabView( filter: filter )
  filterView = new Backbone.Views.FilterView( filter: filter )

  tabView.$el.find('li.change-tab').trigger('click')
  filterView.$el.find('.subjects li:first').trigger('click')

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
  and the `subject` is selected
  and the `scenario` is selected, then
  the LensSelectorView is rendered and
  the LevelSelectorAgrCommDevView is', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )
  lensSelectorRenderSpy = sinon.spy(
    Backbone.Views.LensSelectorView::, 'render')
  levelSelectorAgrCommDevRenderSpy = sinon.spy(
    Backbone.Views.LevelSelectorAgrCommDevView::, 'render')

  tabView = new Backbone.Views.TabView( filter: filter )

  lensSelectorRenderCalles = lensSelectorRenderSpy.callCount
  levelSelectorAgrCommDevRenderCalles = levelSelectorAgrCommDevRenderSpy.callCount

  tabView.$el.find('li.future_threats-tab').trigger('click')

  filter.set('subject', 'biodiversity')
  filter.set('scenario', 'mf2050')

  try
    assert.isTrue(
      lensSelectorRenderSpy.callCount > lensSelectorRenderCalles,
      "Expected the lensSelectorView to be called"
    )
    assert.isTrue(
      levelSelectorAgrCommDevRenderSpy.callCount > levelSelectorAgrCommDevRenderCalles,
      "Expected the levelSelectorAgrCommDevView to be called"
    )

  finally
    lensSelectorRenderSpy.restore()
    levelSelectorAgrCommDevRenderSpy.restore()

)