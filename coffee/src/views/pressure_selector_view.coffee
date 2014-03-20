window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.PressureSelectorView extends Backbone.View
  template: Handlebars.templates['pressure_selector']
  config: _.cloneDeep(MacArthur.CONFIG.pressureLevels)

  events:
    'change #pressure-select': "setPressureLevel"

  initialize: (options) ->
    @filter = options.filter
    unless @filter.get('pressureLevel')?
      @setDefaultPressureLevel()
    @render()

  render: ->
    pressureLevels = _.map(@config, (level) => 
      if @filter.get('pressureLevel') is level.selector
        level.selected = true
      else
        level.selected = false
      level
    )
    @$el.html(@template(
      pressureLevels: pressureLevels
    ))

  setPressureLevel: (event) ->
    level = $(event.target).find(':selected').attr('value')
    @filter.set('pressureLevel', level)

  onClose: ->

  setDefaultPressureLevel: =>
    @filter.set('pressureLevel', @getDefaultFilter().selector)

  getDefaultFilter: ->
    _.find(@config, (obj) -> 
      return obj.default?
    )