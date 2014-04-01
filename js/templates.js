this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["filter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-subject=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  <div class=\"scenario-container\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showScenarioSelector), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "LevelSelectorAgrCommDevView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "LevelSelectorAgrCommDevView", options)))
    + "\n  </div>\n";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n    ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "ScenarioSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "ScenarioSelectorView", options)))
    + "\n  ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showScenarioSelector), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "LensSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "LensSelectorView", options)))
    + "\n";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "LevelSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "LevelSelectorView", options)))
    + "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "ProtectionOptionView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "ProtectionOptionView", options)))
    + "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "PressureOptionView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "PressureOptionView", options)))
    + "\n";
  return buffer;
  }

  buffer += "<div class=\"subjects\">\n  <ul>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subjects), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showAgrCommDevSelector), {hash:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showLensSelector), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showOtherSelectors), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["lens_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n	  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<div class=\"selector\">\n	<h1>";
  if (stack1 = helpers.subject) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.subject); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " Lens</h1>\n\n	<select id=\"lens-select\" class='select-box'>\n	  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.lenses), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</select>\n</div>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["level_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<h1>Level of Importance</h1>\n\n<select id=\"levels-select\" class='select-box'>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.levels), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["level_selector_agr_comm_dev"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<h1>Agricultural commodity development</h1>\n\n<select id=\"agr-comm-select\" class='select-box'>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.levels), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["map"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Map View</h1>\n";
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["pressure_option"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "PressureSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "PressureSelectorView", options)))
    + "\n";
  return buffer;
  }

  buffer += "<h2><input type=\"checkbox\" name=\"pressure\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pressure), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Pressure</h2>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pressure), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["pressure_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<select id=\"pressure-select\" class='select-box'>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.levels), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["protection_option"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "ProtectionSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "ProtectionSelectorView", options)))
    + "\n";
  return buffer;
  }

  buffer += "<div class=\"secondary-filter\">\n	<h2><input type=\"checkbox\" name=\"See overlap with Protected Areas (PA)s\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.protection), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">See overlap with Protected Areas (PA)s</h2>\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.protection), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["protection_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<select id=\"protection-select\" class='select-box'>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.levels), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["region_chooser"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <div class=\"region-area\" data-region-code=\"";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.code); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"background-image: url(/imgs/";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.code); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + ".png);\"></div>\n      <div class=\"region-area region-area-link region-link\" data-region-code=\"";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.code); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    </li>\n  ";
  return buffer;
  }

  buffer += "<h1>Welcome to the Watershed exploration tool</h1>\n<ul class=\"regions\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.regions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["scenario_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "selected";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }

  buffer += "<h1>Scenario of change</h1>\n<p><a href=\"http://www.unep.org/geo/geo4.asp\">Learn more about these Global Environment Outlook 4 scenarios</a></p>\n\n<select id=\"scenario-select\" class='select-box'>\n  <option value=\"\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultOption), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " disabled>Select a scenario</option>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.scenarios), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["tab"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <li data-subject=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "-tab ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

  buffer += "<ul class=\"tabs\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tabs), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "FilterView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "FilterView", options)))
    + "\n";
  return buffer;
  });