window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ScaleChooserView extends Backbone.View
  template: Handlebars.templates['scale_chooser']
  className: 'modal scale-chooser'

  events:
    "click .scales .scale-area": "triggerChooseScale"

  initialize: (options) ->
    @scales = options.scales
    @render()

  render: ->
    @$el.html(@template(
      scales: @scales.toJSON()
    ))
    return @

  triggerChooseScale: (event) =>
    scaleCode = $(event.target).attr('data-scale-code')
    scale = @scales.find( (scale) -> scale.get('code') == scaleCode )
    @trigger('scaleChosen', scale)

  onClose: ->
    
