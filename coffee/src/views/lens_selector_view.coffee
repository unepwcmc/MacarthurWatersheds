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
      heading: @getLensTitle()
      title: @getLensTitle()
      subject: subject.charAt(0).toUpperCase() + subject.slice(1)
    ))

    # SORRY
    theSelect = @$el.find('.select-box')
    setTimeout(=>
      theSelect.customSelect()
      @$el.find('.customSelectInner').css({'width': '100%'})
    , 20)
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

  getLensTitle: ->
    if @filter.get('subject') == 'biodiversity'
      return { title: "For Species", tooltip: "View results for total or a subset of species" }
    else if @filter.get('subject') == 'ecosystem'
      return { title: "By provision", tooltip: "View results for total or a subset of ecosystem functions" }
