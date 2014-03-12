this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["filter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-subject=\""
    + escapeExpression(((stack1 = (depth0 && depth0.selector)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "LensSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "LensSelectorView", options)))
    + "\n";
  return buffer;
  }

  buffer += "\n<h1>Filter View</h1>\n\n<div class=\"subjects\">\n  <ul>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subjects), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showLensSelector), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["lens_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.selector)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0['default']), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<h1>Lenses</h1>\n\n<select name=\"subject-select\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.lenses), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>";
  return buffer;
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