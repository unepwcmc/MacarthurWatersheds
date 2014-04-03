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
    subjects = MacArthur.getFilterOptionsWithSelectedSet(@filter, 'subject')
    @$el.html(@template(
      thisView: @
      subjects: subjects
      showLensSelector: @showLensSelector()
      showScenarioGroup: @showScenarioGroup()
      showScenarioSelector: @showScenarioSelector()
      showOtherSelectors: @showOtherSelectors()
      showAgrCommDevSelector: @showAgrCommDevSelector()
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

  showScenarioGroup: ->
    tab = @filter.get('tab')
    if tab == 'future_threats' then yes else no

  showScenarioSelector: ->
    tab = @filter.get('tab')
    if tab == 'change' or tab == 'future_threats'
      return @filter.get('subject')?
    no

  showAgrCommDevSelector: ->
    @filter.get('tab') == 'future_threats' and 
    @showOtherSelectors()

  showOtherSelectors: ->
    tab = @filter.get('tab')
    if tab == 'now'
      return @filter.get('subject')?
    if tab == 'change' or tab == 'future_threats'
      return @filter.get('subject')? and @filter.get('scenario')?
    no
    
