window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.FilterView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['filter']

  events:
    "click .subjects li": "setSubject"
    "click ul.tabs li": "setTab"

  initialize: (options) ->
    @filter = options.filter
    @listenTo(@filter, 'change', @render)
    @render()

  render: ->
    @$el.html(@template(
      thisView: @
      subjects: MacArthur.CONFIG.subjects
      showLensSelector: @filter.get('subject')?
      showScenarioSelector: @filter.get('tab') is 'change'
      filter: @filter
    ))
    @attachSubViews()
    return @

  setSubject: (event) =>
    subjectName = $(event.target).attr('data-subject')
    @filter.set('subject', subjectName)

  setTab: (event) =>
    tabName = $(event.target).attr('data-subject')
    @filter.set('tab', tabName)

  onClose: ->
    @closeSubViews()
    @stopListening()
    
