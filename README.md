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
