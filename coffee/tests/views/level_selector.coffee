suite "LevelSelector View"

test('when the filter has a subject set, it renders the corresponding levels', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  levelSelectorView = new Backbone.Views.LevelSelectorView( filter: filter )

  ecosystemLenses = MacArthur.CONFIG.lenses.ecosystem
  levels = MacArthur.CONFIG.levels

  dataSelectionHigh = levelSelectorView.$el.find('select option[value="high"]')

  assert.lengthOf dataSelectionHigh, 1,
    "Expected the levelSelectorView to contain the high level"

)

test('when the level view is initialized the default level for the filter subject
 is set on the filter', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  changeSpy = sinon.spy()
  filter.on('change:level', changeSpy)

  lensSelectorView = new Backbone.Views.LevelSelectorView( filter: filter )

  assert.strictEqual(
    filter.get('level'), 'all',
    "Expected level to be high"
  )

  assert.strictEqual( changeSpy.callCount, 1 )
)

test('it shows the current level selected', ->
  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
    level: 'medium'
  )

  levelSelectorView = new Backbone.Views.LevelSelectorView( filter: filter )
  selection = levelSelectorView.$el.find('select').find(":selected").attr('value')
  assert.strictEqual(selection, 'medium',
    "Expected selection value to match the filter level attribute"
  )

)