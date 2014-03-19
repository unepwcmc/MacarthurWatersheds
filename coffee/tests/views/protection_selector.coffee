suite "ProtectionSelector View"

filter = null
ProtectionOptionView = null
protectionSelectorView = null

beforeEach( ->
  filter = new Backbone.Models.Filter(
    subject: 'biodiversity'
    protection: false
  )
  protectionOptionView = new Backbone.Views.ProtectionOptionView( filter: filter )
)

afterEach( ->
  filter = null
  protectionSelectorView
)
