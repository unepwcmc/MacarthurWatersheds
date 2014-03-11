window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.FilterView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['filter']

  events:
    "click .subjects li": "setSubject"

  initialize: (options) ->
    @filter = options.filter
    @render()

  render: ->
    @$el.html(@template(
      thisView: @
      lenses: MacArthur.LENSES[@filter.get('subject')]
    ))
    @attachSubViews()
    return @

  setSubject: (event) ->
    subjectName = $(event.target).attr('data-subject')
    @filter.set('subject', subjectName)

  onClose: ->
    @closeSubViews()
    
