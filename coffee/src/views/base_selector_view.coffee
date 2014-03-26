window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.BaseSelectorView extends Backbone.View

  initialize: (options) ->
    @filter = options.filter

  render: ->
    levels = _.map(@config, (level) => 
      if @filter.get(@levelType) is level.selector
        level.selected = true
      else
        level.selected = false
      level
    )
    @$el.html(@template(
      levels: levels
    ))
    
    # SORRY
    theSelect = @$el.find('.select-box')
    setTimeout(->
      theSelect.customSelect()
    , 100)
    # /SORRY

  setLevel: (event) ->
    level = $(event.target).find(':selected').attr('value')
    @filter.set(@levelType, level)

  setDefaultLevel: =>
    @filter.set(@levelType, @getDefaultFilter().selector)

  getDefaultFilter: ->
    _.find(@config, (obj) -> 
      return obj.default?
    )