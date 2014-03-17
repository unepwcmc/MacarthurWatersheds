suite("QueryBuilder")

test("When initialized it takes a Filter instance and stores it as an attribute", ->

  filter = new Backbone.Models.Filter()

  queryBuilder = new window.MacArthur.QueryBuilder(filter)

  assert.property queryBuilder, 'filter'
  assert.strictEqual queryBuilder.filter.cid, filter.cid, 
    "Expected filter attribute to be equal to the filter passed to the constructor"

)

test("When the Filter changes, buildQuery is called only once", ->

  count = 0

  filter = new Backbone.Models.Filter()

  queryBuilder = new window.MacArthur.QueryBuilder(filter)
  buildQueryStub = sinon.stub(queryBuilder, 'buildQuery', ->
    # to prevent possible infinite loop
    if count < 5
      count += 1
    'foo'
  )
  filter.set('subject', 'xxx')

  assert.strictEqual buildQueryStub.callCount, 1,
    "Expected filter attribute to be called once"

)

test(".updateFilterQuery updates the filter.query with the return value of buildQuery", ->

  filter = new Backbone.Models.Filter()
  queryBuilder = new window.MacArthur.QueryBuilder(filter)

  buildQueryResult = "FooBar"
  buildQueryStub = sinon.stub(queryBuilder, 'buildQuery', ->
    return buildQueryResult
  )
  filter.set('subject', 'xxx')

  assert.strictEqual filter.get('query'), buildQueryResult,
    "Expected the filter.query attribute to be updated"
)