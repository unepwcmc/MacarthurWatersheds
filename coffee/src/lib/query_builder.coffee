window.MacArthur ||= {}

class window.MacArthur.QueryBuilder

  constructor: (@filter)->
    @filter.on('change', @updateFilterQuery)

  buildQuery: ->
    if @hasRequiredFilters()
      regionCode = @filter.get('region').get('code')
      scaleCode = @filter.get('scale').get('code')
  
      """
        SELECT DISTINCT d.watershed_id, d.value, percentage as protection_percentage,
        pressure.value as pressure_index #{@includeComprovValueClause()},
        w.name, w.lake 
        FROM macarthur_region r 
        RIGHT JOIN macarthur_watershed w ON r.cartodb_id = w.region_id 
        LEFT JOIN macarthur_datapoint d ON d.watershed_id = w.cartodb_id 
        LEFT JOIN macarthur_lens lens ON lens.cartodb_id = d.lens_id 
        LEFT JOIN macarthur_protection p ON p.watershed_id = w.cartodb_id 
        LEFT JOIN macarthur_pressure pressure 
        ON pressure.watershed_id = w.cartodb_id 
        #{@buildComprovValueClause()} 
        WHERE r.code = '#{regionCode}' 
        AND d.is_broadscale = '#{@isBroadscale(scaleCode)}' 
        AND #{@buildSubjectClause()} 
        AND #{@buildLensClause()}
        AND #{@buildMetricClause()} 
        AND #{@buildScenarioClause()} 
        AND type_data = 'value'

      """
    else
      @filter.get('query')
  
  isBroadscale: (scale) ->
    if scale not in ['broadscale', 'global']
      throw new Error("'#{scale}': wrong scale name!")
    if scale == 'broadscale' then yes else no

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
        macarthur_datapoint d 
        LEFT JOIN macarthur_lens lens ON lens.cartodb_id = d.lens_id 
        WHERE lens.type = 'comprov' AND metric = 'change' 
        AND #{@buildScenarioClause('comprov')} AND type_data = 'value' ) s 
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

  buildScenarioClause: (originSelect) ->
    scenario = @filter.get('scenario')
    tab = @filter.get('tab')
    if tab == 'future_threats'
      if originSelect == 'comprov'
        return "scenario = '#{scenario}' "
      else 
        return "scenario = 'bas' "
    else
      if scenario?
        return "scenario = '#{scenario}' "
      else 
        return "scenario = 'bas' "

  buildLensClause: ->
    lensCode = @filter.get('lens')
    "lens.type = '#{lensCode}' "

  buildMetricClause: ->
    tab = @filter.get('tab')
    if tab == 'change'
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
    if tab == 'now' or tab == 'future_threats' then return no
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
