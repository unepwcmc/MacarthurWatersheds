#!/usr/bin/env ruby
require_relative '../src/cartodb/cartodb_query.rb'
require 'open-uri'

cartodb_config = YAML::load(File.open('config/cartodb_config.yml'))

API_KEY = cartodb_config["api_key"]
HOST    = cartodb_config["host"]

# A list of the tables to download from CartoDB
table_names = [
  "macarthur_agdevelopment_global",
  "macarthur_agdevelopment_regional",
  "macarthur_agriculture_development",
  "macarthur_agdevelopment_regional_cons",
  "macarthur_agdevelopment_broadscale_cons",
  "macarthur_ef_original_data_regional",
  "macarthur_original_protection_regional",
  "macarthur_original_pressure_regional",
  "macarthur_bd_original_data_regional",
  "macarthur_bd_original_data_regional_old",
  "macarthur_original_protection_regional_old",
  "macarthur_original_pressure_regional_old",
  "macarthur_ef_original_data_regional_old",
  "macarthur_bd_original_data_broadscale",
  "macarthur_protection",
  "macarthur_ef_original_data_broadscale",
  "macarthur_original_lakes",
  "macarthur_original_pressure_broadscale",
  "macarthur_original_protection_broadscale",
  "macarthur_lens",
  "macarthur_pressure",
  "macarthur_region",
  "macarthur_watershed",
  "macarthur_datapoint"
]

def self.download_table(table_name)
  url = URI::encode("#{HOST}/api/v2/sql?format=csv&q=SELECT+*+FROM+#{table_name}&api_key=#{API_KEY}")
  IO.copy_stream(open(url), "data/exports/#{table_name}.csv")
  puts "#{table_name} downloaded"
end

table_names.each do |table_name|
  self.download_table(table_name)
end

puts "Downloads complete!"
