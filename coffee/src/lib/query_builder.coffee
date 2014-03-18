window.MacArthur ||= {}

class window.MacArthur.QueryBuilder

  constructor: (@filter)->
    @filter.on('change', @updateFilterQuery)

  buildQuery: ->
    if @filter.get('subject')
      regionCode = @filter.get('region').get('code')
  
      """
        SELECT watershed_id, value 
        FROM macarthur_region r 
        RIGHT JOIN macarthur_watershed w on r.cartodb_id = w.region_id 
        LEFT JOIN macarthur_datapoint d on d.watershed_id = w.cartodb_id 
        LEFT JOIN macarthur_lens lens on lens.cartodb_id = d.lens_id 
        WHERE r.code = '#{regionCode}' 
        AND #{@buildSubjectClause()} 
        AND lens.type = 'allsp' 
        AND metric = 'imp' 
        AND scenario = 'bas' 
        AND type_data = 'value'
      """
    else
      @filter.get('query')

  buildSubjectClause: ->
    subjectCode = @filter.get('subject')
    subjectsMap = {
      'biodiversity': 'bd',
      'ecosystem': 'ef'
    }
    name = subjectsMap[subjectCode]
    unless name?
      throw new Error("Error building query, unknown subject '#{subjectCode}'")
    "lens.name = '#{name}' "

  updateFilterQuery: (model, event) =>
    unless model.changedAttributes().query?
      @filter.set( 'query', @buildQuery(model) )