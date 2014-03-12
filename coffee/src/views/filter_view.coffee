window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.FilterView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['filter']

  events:
    "click .subjects li": "setSubject"

  initialize: (options) ->
    @filter = options.filter
    @listenTo(@filter, 'change', @render)
    @render()

  render: ->
    @$el.html(@template(
      thisView: @
      subjects: MacArthur.CONFIG.subjects
      showLensSelector: @filter.get('subject')?
      filter: @filter
    ))
    @attachSubViews()
    return @

  setSubject: (event) ->
    subjectName = $(event.target).attr('data-subject')
    @filter.set('subject', subjectName)

  onClose: ->
    @closeSubViews()
    @stopListening()
    
