suite  "Query Builder integration"

test("When a filter model has its attributes changed,
the 'query' attribute is updated and change:query event is fired", ->
  filter = new Backbone.Models.Filter()

  queryBuilder = new MacArthur.QueryBuilder(filter)

  oldQuery = filter.get('query')

  changeQuerySpy = sinon.spy()
  filter.on('change:query', changeQuerySpy)

  newQuery = "SELECT BLAH BLAH BVLAH"
  sinon.stub(queryBuilder, 'buildQuery', ->
    return newQuery
  )

  filter.set('subject', MacArthur.CONFIG.subjects[0].selector)

  updatedQuery = filter.get('query')

  assert.notEqual updatedQuery, oldQuery,
    "Expected filter.query to be modified"

  assert.strictEqual updatedQuery, newQuery,
    "Expected filter.query set to the result of QueryBuilder.buildQuery"

  assert.isTrue changeQuerySpy.calledOnce,
    "Expected filter to fire a change:query event once, but fired
    #{changeQuerySpy.callCount} times"
)