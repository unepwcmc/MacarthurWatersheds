window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LensSelectorView extends Backbone.View
  template: Handlebars.templates['lens_selector']

  events:
    "change #lens-select": "setLens"

  initialize: (options) ->
    @config = _.cloneDeep(MacArthur.CONFIG.lenses)
    @filter = options.filter
    @listenTo(@filter, 'change:subject', @setDefaultLens)
    unless @filter.get('lens')?
      @setDefaultLens()
    @render()

  render: ->
    subject = @filter.get('subject')
    lenses = _.map(@config[@filter.get('subject')], (lens) => 
      if @filter.get('lens') is lens.selector
        lens.selected = true
      else
        lens.selected = false
      lens
    )
    @$el.html(@template(
      lenses: lenses
      subject: subject.charAt(0).toUpperCase() + subject.slice(1)
    ))

    # SORRY
    theSelect = @$el.find('.select-box')
    setTimeout(->
      theSelect.customSelect()
    , 100)
    # /SORRY
    
    return @

  setLens: (event) ->
    lensName = $(event.target).find(':selected').attr('value')
    @filter.set('lens', lensName)

  onClose: ->
    @remove()

  setDefaultLens: =>
    if @filter.get('subject')?
      @filter.set('lens', @getDefaultFilter().selector)

  getDefaultFilter: ->
    _.find(@config[@filter.get('subject')], (obj) -> 
      return obj.default?
    )
