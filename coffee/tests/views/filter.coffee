suite 'Filter View'

test('presents a choice between biodiversity and ecosystem subjects', ->
  view = new Backbone.Views.FilterView(
    filter: new Backbone.Models.Filter()
  )

  assert.match view.$el.find('.subjects').text(), new RegExp('.*Biodiversity.*')
  assert.match view.$el.find('.subjects').text(), new RegExp('.*Ecosystem.*')
)

test('when a subject is selected the filter object is updated', ->
  filter = new Backbone.Models.Filter()
  view = new Backbone.Views.FilterView( filter: filter )

  subjectElement = view.$el.find('.subjects [data-subject="biodiversity"]')
  subjectElement.trigger('click')

  assert.strictEqual filter.get('subject'), 'biodiversity',
    'Expected the filter model subject attribute to be biodiversity'
)

test('when the filter has a subject set, it renders a lens selector
  subView with the corresponding lenses', ->

  LensSelectorConstructorSpy = sinon.spy(Backbone.Views, 'LensSelectorView')

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  filterView = new Backbone.Views.FilterView( filter: filter )

  try
    assert.isTrue(
      LensSelectorConstructorSpy.calledOnce,
      "Expected a new LensSelectorView to be created"
    )

    lensSelectorArgs = LensSelectorConstructorSpy.getCall(0).args

    biodiversityLenses = MacArthur.LENSES.biodiversty
    assert.deepEqual lensSelectorArgs[0].lenses, biodiversityLenses,
      "Expected the LensSelectorView to be created with the biodiversity lenses"
  finally
    LensSelectorConstructorSpy.restore()
)