#!/usr/bin/env ruby

require '../src/cartodb/cartodb_query.rb'


def self.change_table table_name, columns
  add_column = ""
  columns.each do |k,v|
    add_column << "ADD COLUMN #{k} #{v}, "
  end
  add_column = add_column[0..-3]

  sql = <<-SQL
    ALTER TABLE macarthur_#{table_name} #{add_column}
  SQL
  CartodbQuery.run(sql)
end



tables_columns = {"region" => {"name" => "varchar"},
                  "lens" => {"name" => "varchar", 
                            "type" => "varchar"
                            },
                  "watershed" => {"region_id" => "int"},
                  "datapoint" => {"watershed_id" => "int",
                                  "lens_id" => "int",
                                  "type_data" => "varchar",
                                  "metric" => "varchar",
                                  "scenario" => "varchar",
                                  "conservation" => "varchar"
                                }
                  }

ARGV.each do|table|
  change_table(table, tables_columns[table])
end








