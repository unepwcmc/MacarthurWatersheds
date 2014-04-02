window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ResultsNumberView extends Backbone.View
  template: Handlebars.templates['results_number']

  initialize: (options) ->
    @resultsNumber = options.resultsNumber
    @listenTo(@resultsNumber, 'change:number', @render)
    @render()

  render: ->
    @$el.html(@template(
      number: @resultsNumber.get('number')
    ))
    return @

  onClose: ->
    @remove()
