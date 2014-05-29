window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.SpinView extends Backbone.View
  template: _.template("<p>Loading...</p>")
  className: 'modal spin'

  initialize: (options) ->
    @render()

  render: ->
    @$el.html(@template())

#    opts =
#      lines: 13 # The number of lines to draw
#      length: 45 # The length of each line
#      width: 16 # The line thickness
#      radius: 69 # The radius of the inner circle
#      #corners: 1 # Corner roundness (0..1)
#      #rotate: 0 # The rotation offset
#      #direction: 1 # 1: clockwise, -1: counterclockwise
#      color: "#fff" # #rgb or #rrggbb or array of colors
#      speed: .8 # Rounds per second
#      #trail: 60 # Afterglow percentage
#      #shadow: false # Whether to render a shadow
#      #hwaccel: false # Whether to use hardware acceleration
#      #className: "spinner" # The CSS class to assign to the spinner
#      #zIndex: 2e9 # The z-index (defaults to 2000000000)
#      #top: "50%" # Top position relative to parent
#      #left: "50%" # Left position relative to parent
#    
#    #target = document.getElementById("foo")
#    #debugger
#    spinner = new Spinner(opts).spin(@$el[0])
#
#    #spinner = new Spinner().spin();
#    #@$el.appendChild(spinner.el);

    return @
    
