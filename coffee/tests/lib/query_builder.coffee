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

test('.buildSubjectClause constructs an SQL clause for filter.subject', ->
  filter = new Backbone.Models.Filter(
    subject: MacArthur.CONFIG.subjects[0].selector
  )
  queryBuiler = new MacArthur.QueryBuilder(filter)

  query = queryBuiler.buildSubjectClause()

  assert.strictEqual query, "lens.name = 'bd' "
)

test('.buildSubjectClause with no subject set throws an error', ->
  filter = new Backbone.Models.Filter()

  queryBuiler = new MacArthur.QueryBuilder(filter)

  assert.throws((->
    queryBuiler.buildSubjectClause()
  ), "Error building query, unknown subject 'undefined'")
)

test('.buildSubjectClause with unknown subject throws an error', ->
  filter = new Backbone.Models.Filter(
    subject: 'wofjefhsdjkgh'
  )

  queryBuiler = new MacArthur.QueryBuilder(filter)

  assert.throws((->
    queryBuiler.buildSubjectClause()
  ), "Error building query, unknown subject '#{filter.get('subject')}'")
)

test('.buildLensClause constructs an SQL clause for filter.lens', ->
  filter = new Backbone.Models.Filter(
    subject: MacArthur.CONFIG.subjects[1].selector
    lens: MacArthur.CONFIG.lenses.ecosystem[0].selector
  )
  queryBuiler = new MacArthur.QueryBuilder(filter)

  query = queryBuiler.buildLensClause()

  assert.strictEqual query, "lens.type = 'totef' "
)

test('.buildLensClause when no lens is specified sets the default to all species')

test('if the filter lens is set with the wrong subject,
  hasRequiredFilters returns false', ->

  filter = new Backbone.Models.Filter(
    subject: MacArthur.CONFIG.subjects[1].selector
    lens: MacArthur.CONFIG.lenses.biodiversity[0].selector
  )
  queryBuiler = new MacArthur.QueryBuilder(filter)

  query = queryBuiler.buildLensClause()

  assert.isFalse queryBuiler.hasRequiredFilters()
)

test('if the filter lens is set with the correct subject,
  hasRequiredFilters returns true', ->

  filter = new Backbone.Models.Filter(
    subject: MacArthur.CONFIG.subjects[1].selector
    lens: MacArthur.CONFIG.lenses.ecosystem[0].selector
  )
  queryBuiler = new MacArthur.QueryBuilder(filter)

  query = queryBuiler.buildLensClause()

  assert.isTrue queryBuiler.hasRequiredFilters()
)