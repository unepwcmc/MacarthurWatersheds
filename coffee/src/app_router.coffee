window.Backbone ||= {}
window.Backbone.Router ||= {}

class Backbone.Router.AppRouter extends Backbone.Router

  routes: {
    ':region/': 'gotoRegion'
  }

  initialize: (options) ->
    @regions = options.regions

  gotoRegion: (region_code) =>
    region = @regions.find( (region) -> region.get('code') == region_code )
    console.log 'router.gotoRegion', region
    @trigger('regionChosen', region)