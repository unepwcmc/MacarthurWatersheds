# MacarthurWatersheds

Mapping Watershed data

# Development
The application is a client side JS application, with no server component.
CartoDB is used for persistence.

## Installation
You will need node.js and NPM installed for the compilation and bower. Install
libs with:

    npm install
    npm install -g gulp bower

## DB Configuration

We have all the data stored in [CartoDB](https://www.cartodb.com). So you need to open an account there.

You will also need to create a YAML file with the account and the api-key in config directory. You can see an exemple in config/cartodb_config_example.yml


###Creating Tables

You will need to create the tables manually as CartoDB currently does not display tables created using their API.
The tables to create are:

	macarthur_region(3 regions)
	macarthur_watershed(watershed geometries)
	macarthur_datapoint(watershed data)
	macarthur_lens(name and type)

You will also need to upload to cartodb the watershed raw data creating two tables:

	macarthur_bd_original_data(BD columns)
	macarthur_ef_original_data(EF columns)

## Changing schema
We have created a tool to change the schema of the above tables.
You will need to run:

	ruby migrations.rb [table_name_without_prefix]

## Importing data
We have created a script that populates the tables using the original data.
You should run:

	ruby update_tables.rb [data_to_populate]

data_to_populate is:

	geometry_data(regions and watersheds)
	lens
	bd(bd datapoint)

## Exporting watershed geometries
These are currently saved in [data](https://github.com/unepwcmc/MacarthurWatersheds/tree/master/data), but if one needs to regenerate them:

  * export one geojson file per watershed from the [macarthur_watershed table](https://carbon-tool.cartodb.com/tables/macarthur_watershed/table) into [data/json](https://github.com/unepwcmc/MacarthurWatersheds/tree/master/data/json) and name them with the corresponding watershed code.
  * if not installed: `npm install -g topojson`
  * then, from within the `data` directory:
  ```sh
  topojson -o GLR.topo.json -p -q 20000 -- json/GLR.geojson

  topojson -o MEK.topo.json -p -q 20000 -- json/MEK.geojson 
  
  topojson -o WAN.topo.json -p -q 20000 -- json/WAN.geojson 
  ```


## Serving files
Althought we don't actually have a 'server' component, you still need to serve
files over http in development. We're using the npm lib 'serv', which you can
start with:

    npm start

Then, just hit [http://localhost:8080](http://localhost:8080) 

## Client side code
The application is written in Coffescript, and stores in the `coffee/src`
directory. It uses Backbone.js with [diorama](https://github.com/th3james/BackboneDiorama/), which means templates
are written in Handlebars.

### Compilation
We're using gulp for compiling coffeescript and handlebars. To run this task,
do:
  
  gulp


### Tests
Tests are written in mocha with chai and sinon, and stored in coffee/tests. Run them by opening [/tests.html](http://localhost:8080/tests.html) in your browser
