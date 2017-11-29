# MacarthurWatersheds

Mapping Watershed data

# Stack
The application is a client side JS application, with no server component.
CartoDB is used for persistence.

## Installation
You will need node.js and NPM installed for the compilation and bower. Install libs with:

```sh
npm install
npm install -g gulp bower
```

## DB Configuration

All the data is stored in [CartoDB](https://www.cartodb.com). Our login details for carto can be found in the organisation LastPass account.

You will also need to create a YAML file with the account name and the api-key in config directory. You can see an exemple in `config/cartodb_config_example.yml`

## Creating or Updating the data

1. You will need to create the following empty tables in CartoDB manually, as Carto currently does not display tables created using their API. (Assuming your prefix is macarthur)

```
macarthur_region          (3 regions)
macarthur_watershed       (watershed geometries)
macarthur_datapoint       (watershed data)
macarthur_lens            (name and type)
macarthur_pressure
macarthur_protection
macarthur_agriculture_development
```

2. Upload the raw watershed csv data to carto in the following tables... (These csv's should be provided by the Science team)

```
macarthur_bd_original_data_broadscale
macarthur_bd_original_data_regional
macarthur_ef_original_data_broadscale
macarthur_ef_original_data_regional

macarthur_original_lakes
macarthur_original_pressure_broadscale
macarthur_original_pressure_regional
macarthur_original_protection_broadscale
macarthur_original_protection_regional
macarthur_original_agdevelopment_global
macarthur_original_agdevelopment_regional
```

Make sure to uncheck the _Let CARTO automatically guess data types and content on import_ checkbox on import as carto may error at trying to guess the datatypes.

3. Run the migrations script. This will add all the necessary columns to the blank tables you created, and set them to the correct datatypes, ready for the import process. Pass in the names of the tables you want to migrate without the prefix. See the 'Testing the Import' section for more information on the prefix and how to run these scripts on test data.

```sh
ruby ./db/migrations.rb region watershed datapoint lens pressure protection agriculture_development
```

4. Run the import script to populate the four tables using the original data. This will also regenerate the topojson files, but the node env must be set.

```sh
ruby ./db/update_tables.rb all # Look at the file to see which other arguments can be passed to run isolated sections of the script
```

5. Done! Your data has been imported and the JSON files have been downloaded.

## Exporting / Backing up Carto

There is a script to download everything related to the Macarthur watershed datasets from Cartodb in the `db` folder called `download.rb`. This contains an array of the table names to download along with the prefix, and just iterates through this downloading each via the API in csv format. The csvs will be exported to `data/exports`.

To run...

```
ruby ./db/download.rb
```

Carto uses an invisible column called, `the_geom_webmercator`. This will appear in the exports but not in the tables on the interface. You can safely remove this column if you wish.

## Prefix / Testing the Import

There is a constant in the import scripts called `PREFIX = "macarthur"`. This is responsible for building the table names by concatenating them with an underscore between them like `macarthur_regions`. If you wish to test the import without overwriting the original tables, you can follow the import process with a different prefix like `macarthur_test` to create tables like `macarthur_test_region`

## Exporting watershed geometries
These are currently saved in [data](https://github.com/unepwcmc/MacarthurWatersheds/tree/master/data), but presently one needs to regenerate them every time the data changes on cartodb:

  * export one geojson file per watershed from the [macarthur_watershed table](https://carbon-tool.cartodb.com/tables/macarthur_watershed/table) into [data/json](https://github.com/unepwcmc/MacarthurWatersheds/tree/master/data/json) and name them with the corresponding watershed code.
  * if not installed: `npm install -g topojson`
  * then:

```sh
ruby ./db/update_tables.rb topojson
```

## Serving files
Althought we don't actually have a 'server' component, you still need to serve
files over http in development. We're using the npm lib 'serv', which you can
start with:

```
npm start
```

Then, just hit [http://localhost:8080](http://localhost:8080)

## Client side code
The application is written in Coffescript, and stores in the `coffee/src`
directory. It uses Backbone.js with [diorama](https://github.com/th3james/BackboneDiorama/), which means templates
are written in Handlebars.

### Compilation
We're using gulp for compiling coffeescript and handlebars. To run this task,
do:

```
gulp
```

or leave this running to compile as you go

```
gulp watch
```

### Tests
Tests are written in mocha with chai and sinon, and stored in coffee/tests. Run them by opening [/tests.html](http://localhost:8080/tests.html) in your browser

### Deployment

The app is deployed to a EC2 ubuntu instance. You will need to add to your .ssh/config, like this:

	Host ec2-46-51-154-19.eu-west-1.compute.amazonaws.com
	User ubuntu
	HostName ec2-46-51-154-19.eu-west-1.compute.amazonaws.com
	IdentityFile <- EC2 pem key location ->

  ```sh
    git checkout production
    git merge master
    gulp minify
  ```

Then run `cap deploy`.


### d3.js dependency

The app relies a bare-bones d3 custom build. If, in the future, some more d3 dependent code is added and things brake, it could mean a new build is needed!
