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