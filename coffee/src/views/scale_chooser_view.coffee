window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.ScaleChooserView extends Backbone.View
  template: Handlebars.templates['scale_chooser']
  className: 'modal scale-chooser'

  events:
    "click .scales li": "triggerChooseScale"
    "click .back a": "goBack"

  initialize: (options) ->
    @scales = options.scales
    @render()

  render: ->
    @$el.html(@template(
      scales: @scales.toJSON()
      regionName: @getRegionName()
    ))
    #@$el.find("[data-toggle=\"popover\"]").popover({ trigger: "hover" })


    @$el.find("[data-toggle=\"popover\"]").popover(
      trigger: "manual"
      animation: false
      html: true
    ).on("mouseenter", ->
      _this = this
      $(this).popover "show"
      $('.popover').on("mouseleave", ->
        $(_this).popover "hide"
        return
      )
      return
    ).on "mouseleave", ->
      _this = this
      setTimeout (->
        $(_this).popover "hide"  unless $(".popover:hover").length
        return
      ), 100
      return

    return @

  getRegionName: ->
    regionCode = Backbone.history.fragment.split(':')[1]
    regionOptions = MacArthur.CONFIG.regions
    _.find(regionOptions, (o) -> o.code == regionCode).name

  triggerChooseScale: (event) =>
    scaleCode = $(event.target).attr('data-scale-code') or 
      $(event.target).find('.scale-link').attr('data-scale-code')
    Backbone.appRouter.navigate(
      "#{Backbone.history.fragment}/scale:#{scaleCode}", {trigger: true}
    )

  goBack: (e) ->
    e.preventDefault()
    Backbone.appRouter.navigate('/', {trigger: true})

  onClose: ->
    $('.popover[role="tooltip"]').remove()     
