window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ProtectionSelectorView extends Backbone.View
  template: Handlebars.templates['protection_selector']

  initialize: (options) ->
    @filter = options.filter
    @render()

  render: ->
    @$el.html(@template())
    return @

  onClose: ->
    
