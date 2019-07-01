function TextFilter(text) {
  this.text = text;
}

// Return the raw text by default. 
// This function will be overridden by the decorator.
TextFilter.prototype.apply = function() {
  return this.text;
};

// Create a new namespacing
TextFilter.Decorator = {};

// Add new function to our original TextFilter
// Define the Cursing decorator.
TextFilter.Decorator.Cursing = function() {
  // Save the previous apply definition.
  var apply = this.apply;

  var regex = /fuck|shit|cunt|asshole|motherfucker|son of a bitch/gim;

  // Override the original apply function with Cursing's filtering.
  this.apply = function() {
    var text = apply.call(this);
    return text.replace(regex, "");
  };
};

TextFilter.Decorator.escapeForRegex = function() {
  // Save the old apply definition, cause we need use it after
  var apply = this.apply;

  var regex = /[-\/\^$*+?.()|[\]{}]/g; 

  // Override the original apply function with Escape For Regex filtering
  this.apply = function() {
    var text = apply.call(this);
    return text.replace(regex, "\$&");
  };
};

TextFilter.prototype.decorate = function(name) {
  // Retrieve the decorator by its name.
  var decorator = TextFilter.Decorator[name];

  // Create a new object because we're going to modify it.
  var filter = Object.create(this);

  // Apply the decorator behavior.
  decorator.call(filter);

  // Return the decorated filter.
  return filter;
};

var text = "Oh Shit!! I was catch by closures again :/";
var filter = new TextFilter(text);

filter = filter.decorate("Cursing");
filter = filter.decorate("escapeForRegex");

console.log(filter.apply());
