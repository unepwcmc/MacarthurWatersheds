window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LensSelectorView extends Backbone.View
  template: Handlebars.templates['lens_selector']

  events:
    "change #lens-select": "setLens"

  initialize: (options) ->
    @config = _.cloneDeep(MacArthur.CONFIG.lenses)
    @filter = options.filter
    @filter.on('change:subject', @setDefaultLens)
    unless @filter.get('lens')?
      @setDefaultLens()
    @render()

  render: ->
    console.log '######################'
    lenses = _.map(@config[@filter.get('subject')], (lens) => 
      if @filter.get('lens') is lens.selector
        lens.selected = true
      else
        lens.selected = false
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

  setDefaultLens: =>
    if @filter.get('subject')?
      @filter.set('lens', @getDefaultFilter().selector)

  getDefaultFilter: ->
    _.find(@config[@filter.get('subject')], (obj) -> 
      return obj.default?
    )
