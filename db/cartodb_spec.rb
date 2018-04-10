require 'rspec'
require_relative '../src/cartodb/cartodb_query.rb'
require 'json'

describe 'On MacArthur region' do
  it 'Gets 3 rows' do
    sql = 'SELECT COUNT(*) FROM macarthur_region'
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["rows"][0]
    Integer(check['count']).should ==(3)
  end
  it 'Gets 6 columns' do
    sql = "SELECT * FROM MacArthur_region limit 0"
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["fields"]
    Integer(check.count).should ==(6)
  end
end


describe 'On MacArthur pressure' do
  it 'Gets 456 rows' do
    sql = 'SELECT COUNT(*) FROM macarthur_pressure'
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["rows"][0]
    Integer(check['count']).should ==(456)
  end
  it 'Gets 7 columns' do
    sql = "SELECT * FROM MacArthur_pressure limit 0"
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["fields"]
    Integer(check.count).should ==(7)
  end
end

describe 'On MacArthur protection' do
  it 'Gets 456 rows' do
    sql = 'SELECT COUNT(*) FROM macarthur_protection'
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["rows"][0]
    Integer(check['count']).should ==(456)
  end
  it 'Gets 7 columns' do
    sql = "SELECT * FROM MacArthur_protection limit 0"
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["fields"]
    Integer(check.count).should ==(7)
  end
end

describe 'On MacArthur watershed' do
  it 'Gets 456 rows' do
    sql = 'SELECT COUNT(*) FROM macarthur_protection'
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["rows"][0]
    Integer(check['count']).should ==(456)
  end
  it 'Gets 8 columns' do
    sql = "SELECT * FROM MacArthur_watershed limit 0"
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["fields"]
    Integer(check.count).should ==(8)
  end
end

describe 'On MacArthur datapoint' do
  it 'Gets 98496 rows' do
    sql = 'SELECT COUNT(*) FROM macarthur_datapoint'
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["rows"][0]
    Integer(check['count']).should ==(98496)
  end
  it 'Gets 12 columns' do
    sql = "SELECT * FROM MacArthur_datapoint limit 0"
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["fields"]
    Integer(check.count).should ==(12)
  end
end

describe 'On MacArthur lens' do
  it 'Gets 10 rows' do
    sql = 'SELECT COUNT(*) FROM macarthur_lens'
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["rows"][0]
    Integer(check['count']).should ==(10)
  end
  it 'Gets 12 columns' do
    sql = "SELECT * FROM MacArthur_lens limit 0"
    query = CartodbQuery.run(sql)
    check = JSON.parse(query)["fields"]
    Integer(check.count).should ==(7)
  end
end


