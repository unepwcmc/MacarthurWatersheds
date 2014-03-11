#!/usr/bin/env ruby
require '../src/cartodb/cartodb_query.rb'



SUBJECT = ["bd", "ef"]
TYPE_DATA = ["value", "rank"]
METRIC = ["imp", "change"]
BD_LENS = ["allsp", "crenvu", "amphibia", "mammalia", "aves"]
EF_LENS = ["totef", "comprov", "wildprov", "regprov"]
SCENARIO = ["bas", "mf2050", "secf2050", "pf2050", "susf2050"]
CONSERVATION = ["cons", "nocons"]
REGIONS = ["WAN", "MEK", "GLR"]


def self.geometry_data
  REGIONS.each do |region|
    sql = <<-SQL
      INSERT INTO macarthur_region(name)
      VALUES ('#{region}')
    SQL
    puts sql
    CartodbQuery.run(sql)
    sql = <<-SQL 
        INSERT INTO macarthur_watershed(the_geom, name,region_id)
          SELECT ws.the_geom, ws_id, mr.cartodb_id 
            FROM #{region} ws, macarthur_region mr
            WHERE mr.name = '#{region}'
        SQL
    puts sql
    CartodbQuery.run(sql)
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



def self.bd
  column = ""
  TYPE_DATA.each do |td|
    METRIC.each do |met|
      SCENARIO.each do |scen|
        CONSERVATION.each do |cons|
           BD_LENS.each do |lens|
            column = "bd_#{td}_#{met}_#{scen}_#{cons}_#{lens}"
            cons_boolean = cons == cons ? 'true' : 'false'
              sql = <<-SQL
                INSERT INTO macarthur_datapoint(watershed_id, type_data, metric, lens_id, scenario, conservation, value) \
                SELECT ws.cartodb_id, '#{td}', '#{met}', ls.cartodb_id, '#{scen}', #{cons_boolean}, cast(od.#{column} as double precision) \
                  FROM macarthur_bd_original_data od \
                  LEFT JOIN
                  macarthur_watershed ws \
                  ON od.field_name = ws.name \
                  left join macarthur_lens ls 
                  on ls.name = 'bd' AND type = '#{lens}'
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



ARGV.each do|action|
  if action == 'geometry_data'
    geometry_data
  elsif action == 'bd'
    bd
  elsif action == 'lens'
    lens
  end
end
