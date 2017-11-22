class CartodbQuery
  require 'yaml'
  require 'open-uri'

  def self.run(sql)
    cartodb_config = YAML::load(File.open('config/cartodb_config.yml'))
    api_key = cartodb_config["api_key"]
    host = cartodb_config["host"]

    encoded_url = URI::encode("#{host}/api/v2/sql?q=#{sql}&api_key=#{api_key}")

    puts encoded_url

    #begin
      result = open(encoded_url).read
    #rescue OpenURI::HTTPError => error
      #response = error.io
      #puts response.status
    #end
  end
end
