window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.PressureSelectorView extends Backbone.Views.BaseSelectorView

  events:
    'change #pressure-select': "setLevel"

  initialize: (options) ->
    super
    @config = _.cloneDeep(MacArthur.CONFIG.pressureLevels)
    @levelType = 'pressureLevel'
    unless @filter.get(@levelType)?
      @setDefaultLevel()
    @render()