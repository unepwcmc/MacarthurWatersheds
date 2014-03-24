window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.TabView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['tab']

  events:
    "click ul.tabs li": "setTab"

  initialize: (options) ->
    @filter = options.filter
    @render()

  render: ->
    @$el.html(@template(
      thisView: @
      filter: @filter
    ))
    @attachSubViews()
    return @

  onClose: ->

  setTab: (event) =>
    tabName = $(event.target).attr('data-subject')
    if tabName == @filter.get('tab') then return
    @resetFilters()
    @filter.set('tab', tabName)

  resetFilters: ->
    @filter.unset('subject')
    @filter.unset('lens')
    @filter.unset('level')
    
