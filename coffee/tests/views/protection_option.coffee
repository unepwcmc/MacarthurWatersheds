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

  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
    protection: false
  )

  setProtectionSpy = sinon.spy(Backbone.Views.ProtectionOptionView::, 'setProtection')

  protectionOptionView = new Backbone.Views.ProtectionOptionView( filter: filter )
  protectionSelectorView = new Backbone.Views.ProtectionSelectorView( filter: filter )
  
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

test('when the filter has protection set to true, the protection selector is visible', ->

  filter.set('protection', true)
  selection = protectionSelectorView.$el.find('select')
  assert.lengthOf selection, 1,
    "Expected the protection select to be visible"

)