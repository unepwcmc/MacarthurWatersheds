window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ResultsNumberView extends Backbone.View
  template: Handlebars.templates['results_number']

  initialize: () ->
    @resultsNumber = new Backbone.Models.ResultsNumber()
    @render()

  render: ->
    @$el.html(@template(
      number: @resultsNumber.get('number')
    ))
    return @

  onClose: ->
    
