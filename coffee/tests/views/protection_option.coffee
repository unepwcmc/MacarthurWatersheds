suite "ProtectionOption View"

filter = null
protectionOptionView = null
protectionSelectorView = null

beforeEach( ->
  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
    protection: false
  )

  protectionOptionView = new Backbone.Views.ProtectionOptionView( filter: filter )
  protectionSelectorView = new Backbone.Views.ProtectionSelectorView( filter: filter )
)

afterEach( ->
  filter = null
  protectionOptionView = null
  protectionSelectorView = null
)


test('when the filter has a subject set, it renders the protection option', ->

  selection = protectionOptionView.$el.find('input:checkbox')
  assert.lengthOf selection, 1,
    "Expected the protection checkbox button to be present"

)

test('when the checkbox button is checked, the protection filter is set to true', ->

  setProtectionSpy = sinon.spy(Backbone.Views.ProtectionOptionView::, 'setProtection')
  protectionOptionView = new Backbone.Views.ProtectionOptionView( filter: filter )
  
  protectionOptionView.$el.find("[type='checkbox']").attr('checked', true)
  protectionOptionView.$el.find("[type='checkbox']").trigger('change')

  protection = filter.get('protection')

  try
    assert.strictEqual setProtectionSpy.callCount, 1,
      "Expected setProtection to be called"
    assert.isTrue protection,
      "Expected the protection filter attribute to be true"
  finally
    setProtectionSpy.restore()
)

test('when the filter has protection set to true, the protection option is checked', ->

  filter.set('protection', true)
  selection = protectionOptionView.$el.find('input:checkbox').val()
  assert.equal selection, 'on',
    "Expected the protection checkbox button to be checked"

)

test('when the filter has protection set to true, the protection selector is 
visible and populated with options', ->

  filter.set('protection', true)
  selection = protectionSelectorView.$el.find('select')
  assert.lengthOf selection, 1,
    "Expected the protection select to be visible"
  assert.lengthOf selection.find('option'), 3,
    "Expected the dropdown to have 3 selections: high, medium, low"

)

test('when the filter has protection set to true, the query on the selector 
object is NOT updated', ->

  regions = new Backbone.Collections.RegionCollection MacArthur.CONFIG.regions
  filter.set('region', regions.models[0])
  filter.set('lens', 'allsp')
  buildQuerySpy = sinon.spy(MacArthur.QueryBuilder::, 'buildQuery')
  queryBuilder = new MacArthur.QueryBuilder(filter)
  filter.set('protection', true)

  assert.strictEqual buildQuerySpy.callCount, 0,
    "Expected the buildQuery method to be called once"

)

test('when the filter has protection set to false, the protection_level is unset 
 on the selector object', ->

  defaultProtectionLevel = _.find(MacArthur.CONFIG.protectionLevels, (pl) ->
    pl.default == yes).selector
  filter.set('protection', true)
  filter.set('protectionLevel', defaultProtectionLevel)
  protectionOptionView.$el.find("[type='checkbox']").attr('checked', false)
  protectionOptionView.$el.find("[type='checkbox']").trigger('change')
  
  assert.isUndefined filter.get('protection_level'),
    "Expected the protection_level filter to be undefined"

)