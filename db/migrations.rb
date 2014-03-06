#!/usr/bin/env ruby

ARGV.each do|table|
table_name = table
end

region_columns = {"name" => "charvar"}
lens_columns = {"name" => "charvar", 
                "type" => "charvar"}
watershed_columns = {"region_id" => "int"}
datapoint_columns = {"watershed_id" => "int",
                     "lens_id" => "int",
                     "type_data" => "charvar",
                     "metric" => "charvar",
                     "scenario" => "charvar",
                     "conservation" => "charvar"
                   }

def change_table table_name, columns
  add_column = ""
  columns.each |k,v|
    add_column << "ADD COLUMN #{k} #{v},"
  end
  add_column = add_column[0..-1]

  sql = <<-SQL
    ALTER TABLE macarthur_#{table_name}
      #{add_column}
  SQL
  sql
end



