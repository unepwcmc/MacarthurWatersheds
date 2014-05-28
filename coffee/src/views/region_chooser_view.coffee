window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.RegionChooserView extends Backbone.View
  template: Handlebars.templates['region_chooser']
  className: 'modal region-chooser'

  events:
    "click .regions .region-area": "triggerChooseRegion"

  initialize: (options) ->
    @regions = options.regions
    @render()

  render: ->
    @$el.html(@template(
      regions: @regions.toJSON()
    ))
    return @

  triggerChooseRegion: (event) =>
    regionCode = $(event.target).attr('data-region-code')
    Backbone.appRouter.navigate("region:" + regionCode, {trigger: true})
    @$el.addClass('slip-out')

  onClose: ->
    
