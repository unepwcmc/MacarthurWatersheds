#!/usr/bin/env ruby
require_relative '../src/cartodb/cartodb_query.rb'
require 'open-uri'

cartodb_config = YAML::load(File.open('config/cartodb_config.yml'))

API_KEY = cartodb_config["api_key"]
HOST    = cartodb_config["host"]
PREFIX  = "macarthur"

# Table names without prefix

table_names = [
  "bd_original_data_broadscale",
  "bd_original_data_regional",
  "ef_original_data_broadscale",
  "ef_original_data_regional",

  "original_lakes",
  "original_pressure_broadscale",
  "original_pressure_regional",
  "original_protection_broadscale",
  "original_protection_regional",
  "agdevelopment_global",
  "agdevelopment_regional"

  # "agdevelopment_regional_cons",
  # "agdevelopment_broadscale_cons",
  # "bd_original_data_regional_old",
  # "original_protection_regional_old",
  # "original_pressure_regional_old",
  # "ef_original_data_regional_old",
]

table_names.each do |table_name|
  puts "Emptying data from #{PREFIX}_#{table_name}..."
  sql = <<-SQL
    DELETE FROM #{PREFIX}_#{table_name}
  SQL
  CartodbQuery.run(sql)
end

puts "🤘 Data clear complete!"
