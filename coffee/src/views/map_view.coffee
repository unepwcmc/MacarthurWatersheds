window.Backbone ||= {}
window.Backbone.Views ||= {}

class Backbone.Views.MapView extends Backbone.View
  template: Handlebars.templates['map']

  initialize: (options) ->
    @map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 2)
    @queryUrlRoot = 'https://carbon-tool.cartodb.com/tiles/macarthur_watershed/{z}/{x}/{y}.png?'
    L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
    }).addTo(@map)
    @css = '#macarthur_datapoint{ polygon-opacity: 0.8; line-color: #FFF; line-width: 1; line-opacity: 1macarthur_datapoint [ value <= 0.6177211398] {  polygon-fill: #005824macarthur_datapoint [ value <= 0.0007393294] {  polygon-fill: #238B45macarthur_datapoint [ value <= -0.000997682] {  polygon-fill: #41AE76macarthur_datapoint [ value <= -0.0109500099] {  polygon-fill: #66C2A4macarthur_datapoint [ value <= -0.0235889656] {  polygon-fill: #CCECE6macarthur_datapoint [ value <= -0.0845306143] {  polygon-fill: #D7FAF4macarthur_datapoint [ value <= -0.2292566377] {  polygon-fill: #EDF8FB;'
    @filter = options.filter
    @listenTo(@filter, 'change', @updateQueryLayer)
    ##@filter.on('change:query', )


  updateQueryLayer: (model, event) ->
    query = model.get('query')
    L.tileLayer("#{@queryUrlRoot}sql=#{query}").addTo(@map)

  onClose: ->
    
