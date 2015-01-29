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
    @resultsNumber = options.resultsNumber
    @listenTo(@filter, 'change', @render)
    @render()

  render: ->
    options = {name: 'subject'}
    subjects = MacArthur.getFilterOptionsWithSelectedSet(@filter, options)
    @$el.html(@template(
      thisView: @
      subjects: subjects
      showLensSelector: @showLensSelector()
      showScenarioGroup: @showScenarioGroup()
      showScenarioSelector: @showScenarioSelector()
      showOtherSelectors: @showOtherSelectors()
      showAgrCommDevSelector: @showAgrCommDevSelector()
      filter: @filter
      resultsNumber: @resultsNumber
    ))
    @attachSubViews()
    @initialiseTooltips()
    $('.popover[role="tooltip"]').remove() 

    return @

  initialiseTooltips: ->
    @$el.find("[data-toggle=\"popover\"]").popover(
      trigger: "manual"
      animation: false
      html: true
    ).on("mouseenter", ->
      _this = this
      $(this).popover "show"
      $('.popover').on("mouseleave", ->
        $(_this).popover "hide"
        return
      )
      return
    ).on "mouseleave", ->
      _this = this
      setTimeout (->
        $(_this).popover "hide"  unless $(".popover:hover").length
        return
      ), 100
      return

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
    if tab == 'change'
      return @filter.get('subject')? and @filter.get('scenario')?
    if tab == 'future_threats'
      return @showOtherSelectors()
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
    @filter.get('tab') == 'future_threats' and @filter.get('scenario')?

  showOtherSelectors: ->
    tab = @filter.get('tab')
    if tab == 'now'
      return @filter.get('subject')?
    if tab == 'change'
      return @filter.get('subject')? and @filter.get('scenario')?
    if tab == 'future_threats'
      return @filter.get('subject')? and @filter.get('scenario')? and
      @filter.get('agrCommDevLevel')?
    no
