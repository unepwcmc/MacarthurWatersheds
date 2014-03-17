window.MacArthur ||= {}

class window.MacArthur.QueryBuilder

  constructor: (@filter)->
    @filter.on('change', @updateFilterQuery)

  buildQuery: ->
    "SELECT watershed_id, value, w.the_geom_webmercator FROM macarthur_region r right join macarthur_watershed w on r.cartodb_id = w.region_id left join macarthur_datapoint d on d.watershed_id = w.cartodb_id left join macarthur_lens l on l.cartodb_id = d.lens_id   where r.code = 'WAN' AND l.name = 'bd' AND l.type = 'allsp' and metric = 'imp' and scenario = 'bas' and type_data = 'value'"

  updateFilterQuery: (model, event) =>
    unless model.changedAttributes().query?
      @filter.set( 'query', @buildQuery() )