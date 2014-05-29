window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.PressureOptionView extends Backbone.Diorama.NestingView
  template: Handlebars.templates['pressure_option']

  events:
    'change [type="checkbox"]': "setPressure"
    'click .for-checkbox': "toggleCheckbox"

  initialize: (options) ->
    @filter = options.filter
    @pressure = @filter.get('pressure')
    @render()

  render: ->
    @$el.html(@template(
      thisView: @
      filter: @filter
      pressure: !!@pressure
    ))
    @attachSubViews()
    return @

  setPressure: (event) ->
    @filter.set('pressure', $(event.target).is(':checked'))
    @unsetPressureLevel()

  unsetPressureLevel: ->
    if @filter.get('pressure') == no
      @filter.unset('pressureLevel')

  toggleCheckbox: (event) ->
    checkBox = $(event.target).parent().find('input')
    isChecked = checkBox.prop("checked")
    checkBox.prop("checked", !isChecked)
    @filter.set('pressure', !isChecked)
    @unsetPressureLevel()

  onClose: ->
    @closeSubViews()
    @stopListening()
    
