window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ProtectionSelectorView extends Backbone.Views.BaseSelectorView
  template: Handlebars.templates['protection_selector']

  events:
    'change #protection-select': "setLevel"

  initialize: (options) ->
    super
    @config = _.cloneDeep(MacArthur.CONFIG.protectionLevels)
    @levelType = 'protectionLevel'
    unless @filter.get(@levelType)?
      @setDefaultLevel()
    @render()
