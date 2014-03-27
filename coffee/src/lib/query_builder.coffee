window.MacArthur ||= {}

class window.MacArthur.QueryBuilder

  constructor: (@filter)->
    @filter.on('change', @updateFilterQuery)

  buildQuery: ->
    if @hasRequiredFilters()
      regionCode = @filter.get('region').get('code')
  
      """
        SELECT d.watershed_id, d.value, percentage as protection_percentage,
        pressure.value as pressure_index #{@includeComprovValueClause()}
        FROM macarthur_region r 
        RIGHT JOIN macarthur_watershed w on r.cartodb_id = w.region_id 
        LEFT JOIN macarthur_datapoint d on d.watershed_id = w.cartodb_id 
        LEFT JOIN macarthur_lens lens on lens.cartodb_id = d.lens_id 
        LEFT JOIN macarthur_protection p on p.watershed_id = w.cartodb_id 
        LEFT JOIN macarthur_pressure pressure on pressure.watershed_id = w.cartodb_id 
        #{@buildComprovValueClause()} 
        WHERE r.code = '#{regionCode}' 
        AND #{@buildSubjectClause()} 
        AND #{@buildLensClause()}
        AND #{@buildMetricClause()} 
        AND #{@buildScenarioClause()} 
        AND type_data = 'value'
      """
    else
      @filter.get('query')
  
  includeComprovValueClause: ->
    if @filter.get('tab') == 'future_threats'
      ", comprov_value "
    else
      " "

  buildComprovValueClause: ->
    if @filter.get('tab') == 'future_threats'
      """
        LEFT JOIN (
        SELECT d.watershed_id, d.value AS comprov_value FROM 
        macarthur_datapoint d LEFT JOIN macarthur_lens lens on lens.cartodb_id = d.lens_id 
        WHERE lens.type = 'comprov' AND metric = 'change' 
        AND #{@buildScenarioClause()} AND type_data = 'value' ) s 
        ON s.watershed_id = d.watershed_id 
      """
    else
      ""

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

  buildMetricClause: ->
    tab = @filter.get('tab')
    if tab == 'future_threats' or tab == 'change'
      "metric = 'change' "
    else
      "metric = 'imp' "

  hasLens: (subjectCode, lensCode) ->
    if @filter.get('tab') == 'future_threats'
      return yes
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

  tabLacksSelections: ->
    tab = @filter.get('tab')
    if tab == 'now' then return no
    scenarioCode = @filter.get('scenario')
    subjectCode = @filter.get('subject')
    lensCode = @filter.get('lens')
    if subjectCode? and lensCode? and scenarioCode?
      return no
    yes

  updateFilterQuery: (model, event) =>
    unless @filter.changedAttributes().query? or 
    @isFromProtection() or @isFromPressure() or @tabLacksSelections()
      @filter.set( 'query', @buildQuery(@filter) )
