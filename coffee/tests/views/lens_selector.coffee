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

test('when the lenses view is initialized the default lens is set on the filter', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  lensSelectorView = new Backbone.Views.LensSelectorView( filter: filter )

  assert.strictEqual(
      filter.get('lens'), 'allsp',
      "Expected lens to be allsp"
    )
)
