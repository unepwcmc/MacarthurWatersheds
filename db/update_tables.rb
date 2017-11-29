#!/usr/bin/env ruby
require_relative '../src/cartodb/cartodb_query.rb'
require 'open-uri'

PREFIX = "macarthur_test" # Allows us to build macarthur_region tables or other tables for testing like macarthur_test_region

SUBJECT = ['bd', 'ef']
TYPE_DATA = ['value']
METRIC = ['imp', 'change']
BD_LENS = ['allsp', 'crenvu', 'amphibia', 'mammalia', 'aves', 'crenvu']
EF_LENS = ['totef', 'comprov', 'wildprov', 'regprov']
CONSERVATION = ['nocons']
REGIONS = ['WAN', 'MEK', 'GLR']
BROADSCALE_SCENARIO = ['bas', 'mf2050', 'secf2050', 'polf2050', 'susf2050']
REGIONAL_SCENARIO = ['bas', 's1_2050', 's2_2050', 's3_2050', 's4_2050']



def self.geometry_data
  REGIONS.each do |region|
    sql = <<-SQL
      INSERT INTO #{PREFIX}_region(code)
      VALUES ('#{region}')
    SQL
    puts sql
    CartodbQuery.run(sql)
    sql = <<-SQL
      INSERT INTO #{PREFIX}_watershed(the_geom, name,region_id, is_broadscale)
      SELECT ws.the_geom, ws_id, mr.cartodb_id, true
      FROM #{region} ws, #{PREFIX}_region mr
      WHERE mr.code = '#{region}'
    SQL
    puts sql
    CartodbQuery.run(sql)
    sql = <<-SQL
      INSERT INTO #{PREFIX}_watershed(the_geom, name, region_id, is_broadscale)
      SELECT ws.the_geom, cell_id, mr.cartodb_id, false
      FROM regional_ws_#{region} ws, #{PREFIX}_region mr
      WHERE mr.code = '#{region}'
    SQL
    puts sql
    CartodbQuery.run(sql)
  end
  sql = <<-SQL
      UPDATE #{PREFIX}_watershed w
      SET lake = true
      FROM #{PREFIX}_original_lakes l
      WHERE w.name = l.cell_id AND l.lake = '1'
  SQL
  puts sql
  CartodbQuery.run(sql)
end

def self.download_geometries
  REGIONS.each do |region|
    ['broadscale', 'regional'].each do |scale|
      is_broadscale = scale == 'broadscale'
      query = download_query(region, is_broadscale)
      query.gsub!("\n","")
      puts query
      encoded_url = URI::encode(query)
      geojson_geometry = open(encoded_url).read
      File.open("./data/json/#{region}_#{scale}.geojson", 'w+') do |file|
        puts file.write(geojson_geometry)
      end
    end
  end
end

def self.lens
  BD_LENS.each do |lens|
    lens_insert(lens, 'bd')
  end

  EF_LENS.each do |lens|
    lens_insert(lens, 'ef')
  end
end

def self.lens_insert lens,subject
  sql = <<-SQL
    INSERT INTO #{PREFIX}_lens(name, type)
    VALUES ('#{subject}', '#{lens}')
  SQL
  CartodbQuery.run(sql)
end

def datapoint
  datapoint_query BROADSCALE_SCENARIO, 'true'
  datapoint_query REGIONAL_SCENARIO, 'false'
end

def self.datapoint_query scenario, is_broadscale
  table_suffix = is_broadscale == 'true' ? 'broadscale' : 'regional'
  begin
    column = ""
    SUBJECT.each do |subject|
      lens = subject == 'bd' ? BD_LENS : EF_LENS
      TYPE_DATA.each do |td|
        METRIC.each do |met|
          scenario.each do |scen|
            puts scen
            unless scen == 'bas' && met == 'change'
              CONSERVATION.each do |cons|
                lens.each do |this_lens|
                  column = "#{subject}_#{td}_#{met}_#{scen}_#{cons}_#{this_lens}"
                  cons_boolean = cons == 'cons' ? 'true' : 'false'
                  sql = <<-SQL
                    INSERT INTO #{PREFIX}_datapoint(watershed_id, type_data, metric, lens_id, scenario, conservation, value) \
                    SELECT ws.cartodb_id, '#{td}', '#{met}', ls.cartodb_id, '#{scen}', #{cons_boolean}, cast(od.#{column} as double precision) \
                    FROM #{PREFIX}_#{subject}_original_data_#{table_suffix} od \
                    LEFT JOIN
                  #{PREFIX}_watershed ws \
                    ON od.field_name = ws.name \
                    AND ws.is_broadscale = #{is_broadscale} \
                    left join #{PREFIX}_lens ls
                    on ls.name = '#{subject}' AND type = '#{this_lens}'
                  SQL
                  puts column
                  puts sql
                  CartodbQuery.run(sql)
                end
              end
            end
          end
        end
      end
    end
  end
end

def pressure_protection
  protection = {table_preffix: 'protection', type: 'percentage', column: 'percent_wdpa_filter'}
  pressure = {table_preffix: 'pressure', type: 'value', column: 'value'}
  tables_to_populate = [pressure, protection]
  region = {broadscale: true, regional: false}
  region.each do |k,v|
    tables_to_populate.each do |table|
      other_values table[:table_preffix], table[:type], table[:column], k, v
    end
  end
end

def other_values table_preffix, type, column, table_suffix, is_broadscale
  sql = <<-SQL
      INSERT INTO #{PREFIX}_#{table_preffix}(watershed_id, #{type})
      SELECT w.cartodb_id, cast(#{column} as double precision)
      FROM #{PREFIX}_original_#{table_preffix}_#{table_suffix} p
      LEFT JOIN #{PREFIX}_watershed w
      ON p.field_name = w.name
      WHERE is_broadscale = #{is_broadscale}
  SQL
  puts sql
  CartodbQuery.run(sql)
end

def agriculture_development
  BROADSCALE_SCENARIO[1..-1].each do |scenario|
    import_scenario scenario, 'global'
  end

  REGIONAL_SCENARIO[1..-1].each do |scenario|
    import_scenario scenario, 'regional'
  end
end

def import_scenario scenario, scale
  quoted_scenario = "'#{scenario}'"
  sql = <<-SQL
        INSERT INTO #{PREFIX}_agriculture_development(value,scenario,watershed_id)
        SELECT #{scenario}, #{quoted_scenario}, w.cartodb_id
          FROM #{PREFIX}_agdevelopment_#{scale} a
          INNER JOIN #{PREFIX}_watershed w
          ON cell_id = w.name
  SQL
  puts sql
  CartodbQuery.run(sql)
end

def download_query region, is_broadscale
  cartodb_config = YAML::load(File.open('config/cartodb_config.yml'))
  api_key = cartodb_config["api_key"]
  host = cartodb_config["host"]

  "#{host}/api/v2/sql?q=SELECT w.* FROM #{PREFIX}_watershed w LEFT JOIN #{PREFIX}_region r ON w.region_id = r.cartodb_id WHERE r.code = '#{region}' AND is_broadscale = #{is_broadscale} &format=geojson&api_key=#{api_key}"
end

def delete_all_data
  tables = ['region', 'pressure', 'lens', 'protection', 'watershed', 'datapoint']
  tables.each do |table|
    sql = <<-SQL
      DELETE FROM #{PREFIX}_#{table}
    SQL
    CartodbQuery.run(sql)
  end
end

def topojson
  REGIONS.each do |region|
    ['broadscale', 'regional'].each do |scale|
      system "topojson -o ./data/#{region}_#{scale}.topo.json -p -q 20000 -- ./data/json/#{region}_#{scale}.geojson"
    end
  end
end

ARGV.each do|action|
  if action == 'geometry_data'
    geometry_data
  elsif action == 'lens'
    lens
  elsif action == 'datapoint'
    datapoint
  elsif action == 'pressure_protection'
    pressure_protection
  elsif action ==  'agriculture_development'
    agriculture_development
  elsif action == 'download'
    download_geometries
  elsif action == 'delete'
    delete_all_data
  elsif action == 'topojson'
    topojson
  elsif action == 'all'
    delete_all_data
    geometry_data
    lens
    datapoint
    pressure_protection
    agriculture_development
    download_geometries
    topojson
  end
end

puts "Update complete! 🎉"
