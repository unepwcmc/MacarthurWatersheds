window.Backbone.Models || = {}

class window.Backbone.Models.Filter extends Backbone.Model

  buildQuery: () ->
    #SELECT ws.cartodb_id, ST_tRANSFORM(ws.the_geom, 900913) AS the_geom_webmercator, value FROM macarthur_watershed ws left join macarthur_datapoint dp on ws.cartodb_id = dp.watershed_id where conservation = false AND lens_id = 10 and metric = 'change' and scenario = 'mf2050' and type_data = 'value'
