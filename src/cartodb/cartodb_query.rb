class CartodbQuery
  require 'yaml'
  require 'open-uri'

  def self.run(sql, format=nil)
    cartodb_config = YAML::load(File.open('config/cartodb_config.yml'))
    api_key = cartodb_config["api_key"]
    host = cartodb_config["host"]

    if format.nil?
      encoded_url = URI::encode("#{host}/api/v2/sql?q=#{sql}&api_key=#{api_key}")
    else
      encoded_url = URI::encode("#{host}/api/v2/sql?format=#{format}&q=#{sql}&api_key=#{api_key}")
    end

    puts encoded_url
    result = open(encoded_url).read
  end
end
