#!/usr/bin/env ruby
require_relative '../src/cartodb/cartodb_query.rb'
require 'open-uri'

cartodb_config = YAML::load(File.open('config/cartodb_config.yml'))

API_KEY = cartodb_config["api_key"]
HOST    = cartodb_config["host"]
PREFIX  = "macarthur"

table_names = [
  "#{PREFIX}_bd_original_data_broadscale",
  "#{PREFIX}_bd_original_data_regional",
  "#{PREFIX}_ef_original_data_broadscale",
  "#{PREFIX}_ef_original_data_regional",

  "#{PREFIX}_original_lakes",
  "#{PREFIX}_original_pressure_broadscale",
  "#{PREFIX}_original_pressure_regional",
  "#{PREFIX}_original_protection_broadscale",
  "#{PREFIX}_original_protection_regional",
  "#{PREFIX}_agdevelopment_global",
  "#{PREFIX}_agdevelopment_regional"

  # "#{PREFIX}_agdevelopment_regional_cons",
  # "#{PREFIX}_agdevelopment_broadscale_cons",
  # "#{PREFIX}_bd_original_data_regional_old",
  # "#{PREFIX}_original_protection_regional_old",
  # "#{PREFIX}_original_pressure_regional_old",
  # "#{PREFIX}_ef_original_data_regional_old",
]

table_names.each do |table_name|
  puts "Clearing data from #{PREFIX}_#{table_name}..."
  sql = <<-SQL
    DELETE FROM #{PREFIX}_#{table}
  SQL
  CartodbQuery.run(sql)
end

puts "Data clear complete!"
