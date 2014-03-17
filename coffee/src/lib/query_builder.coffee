window.MacArthur ||= {}

class window.MacArthur.QueryBuilder

  constructor: (@filter)->
    @filter.on('change', @updateFilterQuery)

  buildQuery: ->

  updateFilterQuery: (model, event) =>
    unless model.changedAttributes().query?
      @filter.set( 'query', @buildQuery() )