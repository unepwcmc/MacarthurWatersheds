suite 'Results number View'

test('When the Result model is updated the view is re-rendered and the
  result displayed', ->

  resultsNumberRenderSpy = sinon.spy(Backbone.Views.ResultsNumberView::, 'render')
  resultsNumber = new Backbone.Models.ResultsNumber({number: 10})
  resultsNumberView = new Backbone.Views.ResultsNumberView({
    resultsNumber: resultsNumber})
  
  resultsNumber.set('number', 20)

  try
    assert.strictEqual(
      resultsNumberRenderSpy.callCount, 2,
      "Expected the resultsNumberView to be called twice"
    )

  finally
    resultsNumberRenderSpy.restore()
  
)