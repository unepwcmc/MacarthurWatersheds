window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LevelSelectorView extends Backbone.Views.BaseSelectorView
  template: Handlebars.templates['level_selector']

  events:
    "change #levels-select": "setLevel"

  initialize: (options) ->
    super
    @config = _.cloneDeep(MacArthur.CONFIG.levels)
    @levelType = 'level'
    unless @filter.get('level')?
      @setDefaultLevel()
    @render()
