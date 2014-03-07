class CartodbQuery
  require 'yaml'
  require 'open-uri'

  def self.run(sql)
    cartodb_config = YAML.load_file('../config/cartodb_config.yml')
    api_key = cartodb_config["api_key"]
    host = cartodb_config["host"]

    encoded_url = URI::encode("#{host}/api/v2/sql?q=#{sql}&api_key=#{api_key}")
    puts encoded_url
    result = open(encoded_url).read
  end
end
