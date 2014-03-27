window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.FilterView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['filter']

  events:
    "click .subjects li": "setSubject"

  attributes:
    class: "filters" 

  initialize: (options) ->
    @filter = options.filter
    @listenTo(@filter, 'change', @render)
    @render()

  render: ->
    @$el.html(@template(
      thisView: @
      subjects: MacArthur.CONFIG.subjects
      showLensSelector: @showLensSelector()
      showScenarioSelector: @showScenarioSelector()
      showOtherSelectors: @showOtherSelectors()
      showAgrCommDevSelector: @showshowAgrCommDevSelector()
      filter: @filter
    ))
    @attachSubViews()
    return @

  setSubject: (event) =>
    subjectName = $(event.target).attr('data-subject')
    @filter.set('subject', subjectName)

  onClose: ->
    @closeSubViews()
    @stopListening()

  showLensSelector: ->
    tab = @filter.get('tab')
    if tab == 'now'
      return @filter.get('subject')?
    if tab == 'change' or tab == 'future_threats'
      return @filter.get('subject')? and @filter.get('scenario')?
    no

  showScenarioSelector: ->
    tab = @filter.get('tab')
    if tab == 'change' or tab == 'future_threats'
      return @filter.get('subject')?
    no

  showshowAgrCommDevSelector: ->
    @filter.get('tab') == 'future_threats' and 
    @showOtherSelectors()

  showOtherSelectors: ->
    tab = @filter.get('tab')
    if tab == 'now'
      return @filter.get('subject')?
    if tab == 'change' or tab == 'future_threats'
      return @filter.get('subject')? and @filter.get('scenario')?
    no
    
