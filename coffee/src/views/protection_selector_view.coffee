window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ProtectionSelectorView extends Backbone.View
  template: Handlebars.templates['protection_selector']
  config: _.cloneDeep(MacArthur.CONFIG.protectionLevels)

  events:
    'change #protection-select': "setProtectionLevel"

  initialize: (options) ->
    @filter = options.filter
    unless @filter.get('protectionLevel')?
      @setDefaultProtectionLevel()
    @render()

  render: ->
    protectionLevels = _.map(@config, (level) => 
      if @filter.get('protectionLevel') is level.selector
        level.selected = true
      else
        level.selected = false
      level
    )
    @$el.html(@template(
      protectionLevels: protectionLevels
    ))

  setProtectionLevel: (event) ->
    level = $(event.target).find(':selected').attr('value')
    @filter.set('protectionLevel', level)

  onClose: ->

  setDefaultProtectionLevel: =>
    @filter.set('protectionLevel', @getDefaultFilter().selector)

  getDefaultFilter: ->
    _.find(@config, (obj) -> 
      return obj.default?
    )
    
