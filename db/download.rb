#!/usr/bin/env ruby
require_relative '../src/cartodb/cartodb_query.rb'
require 'open-uri'

cartodb_config = YAML::load(File.open('config/cartodb_config.yml'))

API_KEY = cartodb_config["api_key"]
HOST    = cartodb_config["host"]

# Prefix for table names

PREFIX = "macarthur"

# A list of the tables to download from CartoDB without their prefix

table_names = [
  "agdevelopment_global",
  "agdevelopment_regional",
  "agriculture_development",
  "agdevelopment_regional_cons",
  "agdevelopment_broadscale_cons",
  "ef_original_data_regional",
  "original_protection_regional",
  "original_pressure_regional",
  "bd_original_data_regional",
  "bd_original_data_regional_old",
  "original_protection_regional_old",
  "original_pressure_regional_old",
  "ef_original_data_regional_old",
  "bd_original_data_broadscale",
  "protection",
  "ef_original_data_broadscale",
  "original_lakes",
  "original_pressure_broadscale",
  "original_protection_broadscale",
  "lens",
  "pressure",
  "region",
  "watershed",
  "datapoint"
]

def self.download_table(table_name)
  url = URI::encode("#{HOST}/api/v2/sql?format=csv&q=SELECT+*+FROM+#{PREFIX}_#{table_name}&api_key=#{API_KEY}")
  IO.copy_stream(open(url), "data/exports/#{PREFIX}_#{table_name}.csv")
  puts "Finished #{PREFIX}_#{table_name} download"
end

# Create the exports directory if it doesn't exist

Dir.mkdir("exports") unless File.exists?("exports")

table_names.each do |table_name|
  puts "Downloading #{PREFIX}_#{table_name}..."
  self.download_table(table_name)
end

puts "🤘 Finished downloading #{table_names.count} datasets"
