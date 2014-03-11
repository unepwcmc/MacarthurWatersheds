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