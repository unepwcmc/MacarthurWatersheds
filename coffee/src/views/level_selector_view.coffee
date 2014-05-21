window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LevelSelectorView extends Backbone.Views.BaseSelectorView
  template: Handlebars.templates['level_selector']

  events:
    "change #levels-select": "setLevel"

  initialize: (options) ->
    super
    @listenTo(@filter, 'change:tab', @setConfig)
    @setConfig()
    @levelType = 'level'
    unless @filter.get('level')?
      @setDefaultLevel()
    @render()

  setConfig: =>
    l = MacArthur.CONFIG.levels[@filter.get('tab')] or 
      MacArthur.CONFIG.levels['default']
    @config = _.cloneDeep(l)
