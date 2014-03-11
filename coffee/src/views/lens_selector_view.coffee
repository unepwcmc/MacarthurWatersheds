window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LensSelectorView extends Backbone.View
  template: Handlebars.templates['lens_selector']

  initialize: (options) ->
    @filter = options.filter
    @render()

  render: ->
    lenses = MacArthur.CONFIG.lenses[@filter.get('subject')]
    @$el.html(@template(
      lenses: lenses
    ))
    return @

  onClose: ->
    
