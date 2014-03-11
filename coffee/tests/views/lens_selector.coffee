suite "LensSelector View"

test('when the filter has a subject set, it renders the corresponding lenses', ->

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  lensSelectorView = new Backbone.Views.LensSelectorView( filter: filter )

  ecosystemLenses = MacArthur.CONFIG.lenses.ecosystem
  dataSelectionEco = lensSelectorView.$el.find('ul [data-subject="totef"]')
  biodiversityLenses = MacArthur.CONFIG.lenses.biodiversity
  dataSelectionBio = lensSelectorView.$el.find('ul [data-subject="allsp"]')

  assert.lengthOf dataSelectionEco, 0,
    "Expected the LensSelectorView not to contain the ecosystem lenses"

  assert.strictEqual dataSelectionBio.text(), 
    'All species',
    "Expected the LensSelectorView to contain the biodiversity lenses"
)