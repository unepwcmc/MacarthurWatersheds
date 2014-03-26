window.MacArthur ||= {}

class window.MacArthur.QueryBuilder

  constructor: (@filter)->
    @filter.on('change', @updateFilterQuery)

  buildQuery: ->
    if @hasRequiredFilters()
      regionCode = @filter.get('region').get('code')
  
      """
        SELECT d.watershed_id, d.value, percentage as protection_percentage,
        pressure.value as pressure_index 
        FROM macarthur_region r 
        RIGHT JOIN macarthur_watershed w on r.cartodb_id = w.region_id 
        LEFT JOIN macarthur_datapoint d on d.watershed_id = w.cartodb_id 
        LEFT JOIN macarthur_lens lens on lens.cartodb_id = d.lens_id 
        LEFT JOIN macarthur_protection p on p.watershed_id = w.cartodb_id 
        LEFT JOIN macarthur_pressure pressure on pressure.watershed_id = w.cartodb_id 
        WHERE r.code = '#{regionCode}' 
        AND #{@buildSubjectClause()} 
        AND #{@buildLensClause()}
        AND metric = 'imp' 
        AND #{@buildScenarioClause()} 
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

  buildScenarioClause: ->
    scenario = @filter.get('scenario')
    if scenario?
      return "scenario = '#{scenario}' "
    else 
      return "scenario = 'bas' "

  buildLensClause: ->
    lensCode = @filter.get('lens')
    "lens.type = '#{lensCode}' "

  hasLens: (subjectCode, lensCode) ->
    _.find(MacArthur.CONFIG.lenses[subjectCode], (lens) =>
      lens.selector == lensCode
    )?

  # This is to guard against unset variables in the query.
  hasRequiredFilters: ->
    subjectCode = @filter.get('subject')
    lensCode = @filter.get('lens')
    if subjectCode? and lensCode?
      return @hasLens(subjectCode, lensCode)
    false

  isFromProtection: ->
    @filter.changedAttributes().protection? or
    @filter.changedAttributes().protection_levels?

  isFromPressure: ->
    @filter.changedAttributes().pressure? or
    @filter.changedAttributes().pressure_levels?

  tabHasSelections: ->
    tab = @filter.get('tab')
    unless tab == 'change' then return no
    scenarioCode = @filter.get('scenario')
    subjectCode = @filter.get('subject')
    lensCode = @filter.get('lens')
    if subjectCode? and lensCode? and scenarioCode?
      return no
    yes

  updateFilterQuery: (model, event) =>
    unless @filter.changedAttributes().query? or 
    @isFromProtection() or @isFromPressure() or @tabHasSelections()
      @filter.set( 'query', @buildQuery(@filter) )
