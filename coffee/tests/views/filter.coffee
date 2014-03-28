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

test('if the filter has a subject, render creates a LensSelector subview
  with that filter', ->

  LensSelectorConstructorSpy = sinon.spy(Backbone.Views, 'LensSelectorView')

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
  )

  filterView = new Backbone.Views.FilterView( filter: filter )

  try
    assert.isTrue(
      LensSelectorConstructorSpy.callCount > 0,
      "Expected a new LensSelectorView to be created"
    )

    lensSelectorArgs = LensSelectorConstructorSpy.getCall(0).args

    assert.deepEqual lensSelectorArgs[0].filter, filter,
      "Expected the LensSelectorView to be created with the biodiversity lenses"
  finally
    LensSelectorConstructorSpy.restore()
)

test('if the filter does not have a subject set,
  no LensSelector subview is created', ->

  LensSelectorConstructorSpy = sinon.spy(Backbone.Views, 'LensSelectorView')

  filter = new Backbone.Models.Filter()

  filterView = new Backbone.Views.FilterView( filter: filter )

  try
    assert.strictEqual(
      LensSelectorConstructorSpy.callCount, 0,
      "Expected a new LensSelectorView not to be created"
    )

  finally
    LensSelectorConstructorSpy.restore()
)

test('in the change tab, if the subject filter is set, but not the scenario,
 no LensSelector subview is created', ->

  LensSelectorConstructorSpy = sinon.spy(Backbone.Views, 'LensSelectorView')

  filter = new Backbone.Models.Filter()

  filterView = new Backbone.Views.FilterView( filter: filter )
  filter.set('tab', 'change')
  filter.set('subject', 'biodiversity')

  try
    assert.strictEqual(
      LensSelectorConstructorSpy.callCount, 0,
      "Expected a new LensSelectorView not to be created"
    )

  finally
    LensSelectorConstructorSpy.restore()
)