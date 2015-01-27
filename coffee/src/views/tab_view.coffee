window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.TabView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['tab']

  events:
    "click ul.tabs li": "setTab"
    "click .scale-info a": "goBack"
    "click i.fa": "hideGoBack"

  initialize: (options) ->
    @config = _.cloneDeep(MacArthur.CONFIG.tabs)
    @filter = options.filter
    @resultsNumber = options.resultsNumber
    @render()
    
  render: ->
    options = {name: 'tab'}
    tabs = MacArthur.getFilterOptionsWithSelectedSet(@filter, options)
    strapline = _.find(tabs, (t) -> t.active).strapline
    @$el.html(@template(
      thisView: @
      filter: @filter
      resultsNumber: @resultsNumber
      tabs: tabs
      strapline: strapline
      selectedScaleName: @getSelectedScaleName()
      unSelectedScaleName: @getUnSelectedScaleName()
    ))
    @attachSubViews()
    return @

  onClose: ->
    @closeSubViews()
    @stopListening()

  setTab: (event) =>
    tabName = $(event.target).attr('data-subject')
    if tabName == @filter.get('tab') then return
    @resetFilters()
    @filter.set('tab', tabName)
    @render()

  getSelectedScaleName: ->
    @filter.get('scale').get('name')

  getUnSelectedScaleName: ->
    selectedScaleName = @getSelectedScaleName()
    scaleOptions = MacArthur.CONFIG.scales
    idx = _.findIndex scaleOptions, (o) -> o.name != selectedScaleName
    scaleOptions[idx].name

  goBack: (e) =>
    e.preventDefault()
    @resetFilters()
    Backbone.appRouter.navigate(
      Backbone.history.fragment.split('/')[0], {trigger: true}
    )

  hideGoBack: (e) =>
    $(e.currentTarget).closest('div').hide()

  resetFilters: ->
    @filter.unset('subject')
    @filter.unset('lens')
    @filter.unset('scenario')
    @filter.unset('level')
    @filter.unset('protection')
    @filter.unset('protectionLevel')
    @filter.unset('pressure')
    @filter.unset('pressureLevel')
    @resultsNumber.set('number', -999)

