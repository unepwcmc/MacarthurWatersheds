window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.SpinView extends Backbone.View
  template: _.template("<p>Loading...</p>")
  className: 'modal spin'

  initialize: (options) ->
    @render()

  render: ->
    @$el.html(@template())
    return @
    
