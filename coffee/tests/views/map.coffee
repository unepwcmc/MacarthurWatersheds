suite 'Map View'

test('When the filter query attribute changes, updateQueryLayer is called', ->

  initBaseLayerStub = sinon.stub(Backbone.Views.MapView::, 'initBaseLayer', -> )
  updateQueryLayerStub = sinon.stub(Backbone.Views.MapView::, 'updateQueryLayer', -> )

  filter = new Backbone.Models.Filter()
  mapView = new Backbone.Views.MapView({filter: filter})

  filter.set('query', 'my query')

  try
    assert.strictEqual( updateQueryLayerStub.callCount, 1, 
      "expected updateQueryLayer to be called once" )
  finally
    initBaseLayerStub.restore()
    updateQueryLayerStub.restore()

)

test('.buildQuerydata should return an object with keys as watershed_ids and 
values as other objects with value and protection_percentage', ->

  initBaseLayerStub = sinon.stub(Backbone.Views.MapView::, 'initBaseLayer', -> )

  rows = [
    {
    watershed_id: 2805,
    value: 8.6066515929,
    protection_percentage: 59.1202577939
    },
    {
    watershed_id: 2814,
    value: 106.4846311487,
    protection_percentage: 26.6124303217
    },
    {
    watershed_id: 2815,
    value: 33.0610034886,
    protection_percentage: 18.2542237936
    }
  ]

  filter = new Backbone.Models.Filter()
  mapView = new Backbone.Views.MapView({filter: filter})
  querydata = mapView.buildQuerydata rows

  assert.strictEqual querydata[2805].protectionPercentage, 59.1202577939

)