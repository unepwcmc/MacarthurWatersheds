window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.TabView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['tab']

  events:
    "click ul.tabs li": "setTab"

  initialize: (options) ->
    @config = _.cloneDeep(MacArthur.CONFIG.tabs)
    @filter = options.filter
    @render()

  render: ->
    tabs = _.map(@config, (tab) =>
      if @filter.get('tab') is tab.selector
        tab.active = true
      else
        tab.active = false
      tab
    )

    @$el.html(@template(
      thisView: @
      filter: @filter
      tabs: tabs
    ))
    @attachSubViews()
    return @

  onClose: ->

  setTab: (event) =>
    tabName = $(event.target).attr('data-subject')
    if tabName == @filter.get('tab') then return
    @resetFilters()
    @filter.set('tab', tabName)
    @render()

  resetFilters: ->
    @filter.unset('subject')
    @filter.unset('lens')
    @filter.unset('scenario')
    @filter.unset('level')
    @filter.unset('agrCommDevLevel')
    
