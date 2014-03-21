window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LevelSelectorView extends Backbone.View
  template: Handlebars.templates['level_selector']

  events:
    "change #levels-select": "setLevel"

  initialize: (options) ->
    @config = _.cloneDeep(MacArthur.CONFIG.levels)
    @filter = options.filter
    unless @filter.get('level')?
      @setDefaultLevel()
    @render()

  render: ->
    levels = _.map(@config, (level) => 
      if @filter.get('level') is level.selector
        level.selected = true
      else
        level.selected = false
      level
    )
    @$el.html(@template(
      levels: levels
    ))
    return @

  setLevel: (event) ->
    levelName = $(event.target).find(':selected').attr('value')
    @filter.set('level', levelName)

  onClose: ->

  setDefaultLevel: =>
    @filter.set('level', @getDefaultFilter().selector)

  getDefaultFilter: ->
    _.find(@config, (obj) -> 
      return obj.default?
    )
    
