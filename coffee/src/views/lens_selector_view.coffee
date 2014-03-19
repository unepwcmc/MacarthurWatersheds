window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LensSelectorView extends Backbone.View
  template: Handlebars.templates['lens_selector']
  config: MacArthur.CONFIG.lenses

  events:
    "change #lens-select": "setLens"

  initialize: (options) ->
    @filter = options.filter
    unless @filter.get('lens')?
      @filter.set('lens', @getDefaultFilter().selector)
    @render()

  render: ->
    lenses = _.map(@config[@filter.get('subject')], (lens) => 
      if @filter.get('lens') is lens.selector
        lens.selected = true
      lens
    )
    @$el.html(@template(
      lenses: lenses
    ))
    return @

  setLens: (event) ->
    lensName = $(event.target).find(':selected').attr('value')
    @filter.set('lens', lensName)

  onClose: ->

  getDefaultFilter: ->
    _.find(@config[@filter.get('subject')], (obj) -> 
      return obj.default?
    )
