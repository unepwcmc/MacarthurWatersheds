window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LevelSelectorAgrCommDevView extends Backbone.Views.BaseSelectorView
  template: Handlebars.templates['level_selector_agr_comm_dev']

  events:
    'change #agr-comm-select': "setLevel"

  initialize: (options) ->
    super
    @config = _.cloneDeep(MacArthur.CONFIG.agrCommDevLevels)
    @levelType = 'agrCommDevLevels'
    unless @filter.get(@levelType)?
      @setDefaultLevel()
    @filter.set('lens', 'comprov')
    @render()
    
