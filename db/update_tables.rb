#!/usr/bin/env ruby
require '../src/cartodb/cartodb_query.rb'

class UpdateTables

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



def self.bd
  column = ""
  TYPE_DATA.each do |td|
    METRIC.each do |met|
      BD_LENS.each do |lens|
        SCENARIO.each do |scen|
          CONSERVATION.each do |cons|
            column = "bd_#{td}_#{met}_#{lens}_#{scen}_#{cons}"
            puts column
          end
        end
      end
    end
  end
end

geometry_data
end