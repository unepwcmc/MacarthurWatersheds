class CartodbQuery
  require 'net/http'
  require 'yaml'

  def query(sql)
    cartodb_config = YAML.load_file('config/cartodb_config.yml')
    api_key = cartodb_config["api_key"]
    host = cartodb_config["host"]
    url = URI.parse("#{host}/api/v2/sql?q=#{sql}")

    req = Net::HTTP::Get.new(url.path)
    res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
    }
    puts res.body
  end



