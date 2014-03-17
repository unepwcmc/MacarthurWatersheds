window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.RegionChooserView extends Backbone.View
  template: Handlebars.templates['region_chooser']
  className: 'modal region-chooser'

  events:
    "click .regions li": "triggerChooseRegion"

  initialize: (options) ->
    @regions = new Backbone.Collections.RegionCollection MacArthur.CONFIG.regions
    @render()

  render: ->
    @$el.html(@template(
      regions: @regions.toJSON()
    ))
    return @

  triggerChooseRegion: (event) =>
    regionCode = $(event.target).attr('data-region-code')
    region = @regions.find( (region) -> region.get('code') == regionCode )
    @trigger('regionChosen', region)

  onClose: ->
    
