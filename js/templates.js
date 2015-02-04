this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["filter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n      <li data-subject=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"left\" data-content=\"";
  if (stack1 = helpers.tooltip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.tooltip); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.showScenarioGroup), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

function program4(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.threatsName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.threatsName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  return escapeExpression(stack1);
  }

function program6(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  return escapeExpression(stack1);
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showScenarioSelector), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n    ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "ScenarioSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "ScenarioSelectorView", options)))
    + "\n  ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  ";
  options = {hash:{
    'filter': ((depth0 && depth0.filter))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "LensSelectorView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "LensSelectorView", options)))
    + "\n";
  return buffer;
  }

function program13(depth0,data) {
  
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

  buffer += "<div class=\"results-number\">\n  ";
  options = {hash:{
    'resultsNumber': ((depth0 && depth0.resultsNumber))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "ResultsNumberView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "ResultsNumberView", options)))
    + "\n</div>\n\n<div class=\"subjects\">\n  <h1>Which results would you like to explore?</h1>\n\n  <ul>\n    ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.subjects), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </ul>\n</div>\n\n\n";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.showScenarioGroup), {hash:{},inverse:self.program(8, program8, data),fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.showLensSelector), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.showOtherSelectors), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["lens_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

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

  buffer += "<div class=\"selector\">\n	<h1>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.heading)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <i class=\"fa fa-info-circle\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-content=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.heading)),stack1 == null || stack1 === false ? stack1 : stack1.tooltip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></h1>\n\n	<select id=\"lens-select\" class='select-box'>\n	  ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.lenses), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n	</select>\n</div>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["level_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "Change";
  }

function program3(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isBiodiversity), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program4(depth0,data) {
  
  
  return "Biodiversity Importance";
  }

function program6(depth0,data) {
  
  
  return "EF Provision";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "View results for all watersheds or a subset based on change in the level of ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isBiodiversity), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "biodiversity importance";
  }

function program11(depth0,data) {
  
  
  return "ecosystem function provision";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "View results for all watersheds or a subset based on level of ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isBiodiversity), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }
function program16(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<h1>Level of ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isChangeTab), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <i class=\"fa fa-info-circle\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-content=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isChangeTab), {hash:{},inverse:self.program(13, program13, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i></h1>\n\n<select id=\"levels-select\" class='select-box'>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.levels), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n  ";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["level_selector_agr_comm_dev"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
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
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }

  buffer += "<h1>Agricultural commodity development</h1>\n\n<select id=\"agr-comm-select\" class='select-box'>\n  <option value=\"\" disabled ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['default']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Select a level</option>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.levels), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
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
  buffer += ">\n  <label class=\"for-checkbox\">Pressure</label>\n</h2>\n\n";
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

  buffer += "<div class=\"secondary-filter\">\n	<h2>\n    <input type=\"checkbox\" name=\"See watershed overlap with Protected Areas (PA)s\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.protection), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    <label class=\"for-checkbox\">Overlap with Protected Areas (PA)s</label>\n  </h2>\n</div>\n\n";
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

  buffer += "<header><h1>Welcome to the Watershed exploration tool</h1></header>\n<div class=\"region-copy\"><p>The watershed exploration tool allows watersheds to be compared for their biodiversity importance and ecosystem function provision for now and for future scenarios of change (2050) in three regions.<p><p><strong>Select a region to start exploring</strong></p></div>\n<ul class=\"regions\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.regions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["results_number"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <div class=\"highlight-section match-count\">\n    <p>loading... <span class=\"spin\"></span></p>\n  </div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRelevantNumber), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"highlight-section match-count\">\n      <span class=\"watershed-number\">";
  if (stack1 = helpers.number) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.number); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> watersheds match your selection\n    </div>\n  ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dataLoading), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["scale_chooser"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "i\n	    <li>\n	      <div class=\"scale-area scale-area-link scale-link\" data-scale-code=\"";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.code); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div><i class=\"fa fa-info-circle\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-content=\"";
  if (stack1 = helpers.tooltip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.tooltip); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></i>\n	    </li>\n	  ";
  return buffer;
  }

  buffer += "<header><h1>Welcome to the Watershed exploration tool</h1></header>\n<div class=\"scales\">\n	<div class=\"scale-copy\">\n		<p>You have chosen the <strong>";
  if (stack1 = helpers.regionName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.regionName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong> region.</p>\n		<p>Results are based on global and regional scenarios of change.<br>Which results would you like to explore?</p>\n	</div>\n	<div class=\"back\"><a href=\"\"><i class=\"fa fa-angle-left\"></i></a></div>\n	<ul class=\"scales\">\n	  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.scales), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n	<div class=\"scale-copy\">\n		<p><strong>Hover over the info buttons to find out more about each analysis</strong></p>\n	</div>\n</div>\n";
  return buffer;
  });
this["Handlebars"] = this["Handlebars"] || {};this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};this["Handlebars"]["templates"]["scenario_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return ": Future agriculture development";
  }

function program3(depth0,data) {
  
  
  return "selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"";
  if (stack1 = helpers.selector) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selector); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n  ";
  return buffer;
  }

  buffer += "<h1>Scenario of change";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isFutureTab), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\n\n<p class=\"scenario-help\">";
  if (stack1 = helpers.scenarioDescription) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.scenarioDescription); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + ". <a href=\"";
  if (stack1 = helpers.pdf) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.pdf); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">Learn more here <img src=\"../imgs/external-link-grey-light05.png\"></a></p>\n\n<select id=\"scenario-select\" class='select-box'>\n  <option value=\"\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultOption), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " disabled>Select a scenario</option>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.scenarios), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n\n\n\n";
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
  buffer += "\n</ul>\n\n<div class=\"tab-strapline\">\n  <p><i class=\"fa fa-info-circle\"></i>";
  if (stack1 = helpers.strapline) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.strapline); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n</div>\n\n<div class=\"scale-info\">\n  <p>Displaying results for ";
  if (stack1 = helpers.selectedScaleName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.selectedScaleName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " scenarios. To change to ";
  if (stack1 = helpers.unSelectedScaleName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.unSelectedScaleName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " scenario results, <a href=\"/\">Start Again</a>.</p>\n  <i class=\"fa fa-times\"></i>\n</div>\n\n";
  options = {hash:{
    'filter': ((depth0 && depth0.filter)),
    'resultsNumber': ((depth0 && depth0.resultsNumber))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.addSubViewTo || (depth0 && depth0.addSubViewTo)),stack1 ? stack1.call(depth0, (depth0 && depth0.thisView), "FilterView", options) : helperMissing.call(depth0, "addSubViewTo", (depth0 && depth0.thisView), "FilterView", options)))
    + "\n";
  return buffer;
  });