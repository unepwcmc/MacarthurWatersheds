this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["filter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h1>Filter View</h1>\n\n<div class=\"subjects\">\n  <ul>\n    <li data-subject=\"biodiversity\">Biodiversity</li>\n    <li data-subject=\"ecosystem\">Ecosystem</li>\n  </ul>\n</div>\n\n";
  options = {hash:{
    'lenses': ((depth0 && depth0.lenses))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "LensSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "LensSelectorView", options)))
    + "\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["lens_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>LensSelector View</h1>\n";
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["region_chooser"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-region-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n  ";
  return buffer;
  }

  buffer += "<h1>RegionChooser View</h1>\n<ul class=\"regions\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.regions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });