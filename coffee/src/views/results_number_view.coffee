window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ResultsNumberView extends Backbone.View
  template: Handlebars.templates['results_number']

  initialize: (options) ->
    @resultsNumber = options.resultsNumber
    @listenTo(@resultsNumber, 'change:number', @render)
    @listenTo(@resultsNumber, 'change:loading', @render)
    @render()

  render: ->
    @$el.html(@template(
      number: @resultsNumber.get('number')
      isRelevantNumber: @resultsNumber.get('number') != -999
      dataLoading: @resultsNumber.get('loading')
    ))
    return @

  onClose: ->
    @remove()
    @stopListening()
