window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.LevelSelectorAgrCommDevView extends Backbone.Views.BaseSelectorView
  template: Handlebars.templates['level_selector_agr_comm_dev']

  events:
    'change #agr-comm-select': "setLevel"

  initialize: (options) ->
    super
    @config = _.cloneDeep(MacArthur.CONFIG.agrCommDevLevels)
    @levelType = 'agrCommDevLevel'
    unless @filter.get(@levelType)?
      @default = yes
    @render()

  render: ->
    levels = _.map(@config, (level) => 
      if @filter.get(@levelType) is level.selector
        level.selected = yes
        @default = no
      else
        level.selected = no
      level
    )
    @$el.html(@template(
      levels: levels
      default: @default
      isChangeTab: @isChangeTab
    ))
    
    # SORRY
    theSelect = @$el.find('.select-box')
    setTimeout(=>
      theSelect.customSelect()
      @$el.find('.customSelectInner').css({'width': '100%'})
    , 20)
    # /SORRY
    
