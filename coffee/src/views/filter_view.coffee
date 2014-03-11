window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.FilterView extends Backbone.View
  template: Handlebars.templates['filter']

  events:
    "click .subjects li": "setSubject"

  initialize: (options) ->
    @filter = options.filter
    @render()

  render: ->
    @$el.html(@template())
    return @

  setSubject: (event) ->
    subjectName = $(event.target).attr('data-subject')
    @filter.set('subject', subjectName)

  onClose: ->
    
