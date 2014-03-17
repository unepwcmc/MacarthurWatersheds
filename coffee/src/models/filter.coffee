window.Backbone.Models ||= {}

class window.Backbone.Models.Filter extends Backbone.Model


 
  buildQuery: () ->
    #SELECT watershed_id, value FROM macarthur_region r right join macarthur_watershed w on r.cartodb_id = w.region_id left join macarthur_datapoint d on d.watershed_id = w.cartodb_id left join macarthur_lens l on l.cartodb_id = d.lens_id   where r.code = 'WAN' AND l.name = 'bd' AND l.type = 'allsp' and metric = 'imp' and scenario = 'bas' and type_data = 'value'  