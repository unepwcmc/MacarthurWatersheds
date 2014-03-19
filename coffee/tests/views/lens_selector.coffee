suite "LensSelector View"

test('when the filter has a subject set, it renders the corresponding lenses', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  lensSelectorView = new Backbone.Views.LensSelectorView( filter: filter )

  ecosystemLenses = MacArthur.CONFIG.lenses.ecosystem
  dataSelectionEco = lensSelectorView.$el.find('select option[value="comprov"]')

  biodiversityLenses = MacArthur.CONFIG.lenses.biodiversity
  dataSelectionBio = lensSelectorView.$el.find('select option[value="amphibia"]')

  assert.lengthOf dataSelectionEco, 0,
    "Expected the LensSelectorView not to contain the ecosystem lenses"

  assert.lengthOf dataSelectionBio, 1,
    "Expected the LensSelectorView to contain the biodiversity lenses"
)

test('when the lenses view is initialized the default lens for the filter subject
 is set on the filter', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  changeSpy = sinon.spy()
  filter.on('change:lens', changeSpy)

  lensSelectorView = new Backbone.Views.LensSelectorView( filter: filter )

  assert.strictEqual(
    filter.get('lens'), 'allsp',
    "Expected lens to be allsp"
  )

  assert.strictEqual( changeSpy.callCount, 1 )
)

test('it shows the current lens selected', ->
  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
    lens: 'amphibia'
  )

  lensSelectorView = new Backbone.Views.LensSelectorView( filter: filter )
  selection = lensSelectorView.$el.find('select').find(":selected").attr('value')
  assert.strictEqual(selection, 'amphibia',
    "Expected selection value to match the filter lens attribute"
  )

)
