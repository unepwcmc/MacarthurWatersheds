window.Backbone ||= {}
window.Backbone.Views ||= {}

regions = [
  {id: 1, name: "Andes"},
  {id: 2, name: "African Great Lakes"},
  {id: 3, name: "Mekong"}
]

class Backbone.Views.RegionChooserView extends Backbone.View
  template: Handlebars.templates['region_chooser']
  className: 'modal region-chooser'

  events:
    "click .regions li": "triggerChooseRegion"

  initialize: (options) ->
    @regions = new Backbone.Collections.RegionCollection regions
    @render()

  render: ->
    @$el.html(@template(
      regions: @regions.toJSON()
    ))
    return @

  triggerChooseRegion: (event) =>
    regionId = $(event.target).attr('data-region-id')
    @trigger('regionChosen', @regions.get(regionId) )

  onClose: ->
    
