#!/usr/bin/env ruby
require '../src/cartodb/cartodb_query.rb'
require 'open-uri'



SUBJECT = ['bd', 'ef']
TYPE_DATA = ['value', 'rank']
METRIC = ['imp', 'change']
BD_LENS = ['allsp', 'crenvu', 'amphibia', 'mammalia', 'aves', 'crenvu']
EF_LENS = ['totef', 'comprov', 'wildprov', 'regprov']
SCENARIO = ['bas', 'mf2050', 'secf2050', 'polf2050', 'susf2050']
CONSERVATION = ['nocons']
REGIONS = ['WAN', 'MEK', 'GLR']



def self.geometry_data
 REGIONS.each do |region|
    sql = <<-SQL
      INSERT INTO macarthur_region(code)
      VALUES ('#{region}')
      SQL
    puts sql
    CartodbQuery.run(sql)
    sql = <<-SQL 
      INSERT INTO macarthur_watershed(the_geom, name,region_id)
      SELECT ws.the_geom, ws_id, mr.cartodb_id 
      FROM #{region} ws, macarthur_region mr
      WHERE mr.code = '#{region}'
    SQL
    puts sql
    CartodbQuery.run(sql)
  end
  sql = <<-SQL 
      UPDATE macarthur_watershed w
      SET lake = true
      FROM macarthur_original_lakes l
      WHERE w.name = l.cell_id AND l.lake = '1'
    SQL
    puts sql
    CartodbQuery.run(sql)
end

def self.download_geometries
  REGIONS.each do |region|
    query = download_query(region)
    query.gsub!("\n","")
    puts query
    encoded_url = URI::encode(query)
    geojson_geometry = open(encoded_url).read
    File.open("../lib/geometries/#{region}.geojson", 'w+') do |file|
      puts file.write(geojson_geometry)
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
    INSERT INTO macarthur_lens(name, type)
    VALUES ('#{subject}', '#{lens}')
  SQL
  CartodbQuery.run(sql)
end



def self.datapoint
  begin
   column = ""
    SUBJECT.each do |subject|
      lens = subject == 'bd' ? BD_LENS : EF_LENS
      TYPE_DATA.each do |td|
        METRIC.each do |met|
          SCENARIO.each do |scen|
            puts scen
            unless scen == 'bas' && met == 'change'
              CONSERVATION.each do |cons|
                lens.each do |lens|
                  column = "#{subject}_#{td}_#{met}_#{scen}_#{cons}_#{lens}"
                  cons_boolean = cons == 'cons' ? 'true' : 'false'
                  sql = <<-SQL
                    INSERT INTO macarthur_datapoint(watershed_id, type_data, metric, lens_id, scenario, conservation, value, is_broadscale) \
                    SELECT ws.cartodb_id, '#{td}', '#{met}', ls.cartodb_id, '#{scen}', #{cons_boolean}, cast(od.#{column} as double precision), false \
                    FROM macarthur_#{subject}_original_data od \
                    LEFT JOIN
                    macarthur_watershed ws \
                    ON od.field_name = ws.name \
                    left join macarthur_lens ls 
                    on ls.name = '#{subject}' AND type = '#{lens}'
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
  rescue sql = <<-SQL
    DELETE FROM macarthur_datapoint
    SQL
    CartodbQuery.run(sql)
 end
end

def pressure
  other_values('pressure', 'value', 'value')
end


def protection
  other_values('protection', 'percentage', 'percent_wdpa_filter')
end

def other_values filter, type, column
    sql = <<-SQL 
      INSERT INTO macarthur_#{filter}(watershed_id, #{type})
      SELECT w.cartodb_id, cast(#{column} as double precision)
      FROM macarthur_original_#{filter} p
      LEFT JOIN macarthur_watershed w
      ON p.field_name = w.name
    SQL
    puts sql
    CartodbQuery.run(sql)
end

def download_query region
  cartodb_config = YAML.load_file('../config/cartodb_config.yml')
  api_key = cartodb_config["api_key"]
  host = cartodb_config["host"]
  "#{host}/api/v2/sql?q=SELECT w.* FROM macarthur_watershed w LEFT JOIN macarthur_region r ON w.region_id = r.cartodb_id WHERE r.code = '#{region}' &format=geojson&api_key=#{api_key}"
end

ARGV.each do|action|
  if action == 'geometry_data'
    geometry_data
  elsif action == 'lens'
    lens
  elsif action == 'datapoint'
    datapoint
  elsif action == 'protection'
    protection 
  elsif action == 'pressure'
    pressure
  elsif action == 'download'
    download_geometries
  end
end
