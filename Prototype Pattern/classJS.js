/**
 * Prototype Pattern
 * 
 * A pattern used for copy any object reference into their out memory address space
 * so you can use theses objects in isolation of each other. This way the pattern resolve 
 * situation like class that takes a lot time to initially or needing complicated dependences for.
 * In Javascript we can use this pattern as a sort of a "skeleton" of existing object to create or
 * instantiate new objects.
 * 
 */

var BASE_URL = 'ec2-19-216-115-251.us-east-2.compute.amazonaws.com';

var api = {
  
  get() {
    console.log(`Do get to ${BASE_URL}/${this.resource}`);
  },

  post(data) {
    console.log(`Do post to ${BASE_URL}/${this.resource}`);
  },

  delete(id) {
    console.log(`Delete ${id} to resource ${BASE_URL}/${this.resource}/${id}`);
  },

  put(id, data) {
    console.log(`Replace data of ${id} resource of the resourcer ${BASE_URL}/${this.resource}/${id}`);
  }
}

var userService = Object.create(api, {
  'resource': {
    value: 'user',
    enumerable: false,
    writable: false,
  }
});

var vendorService = Object.create(api, {
  'resource': {
    value: 'vendor',
    enumerable: false,
    writable: false,
  }
});

var Main = function(){
  this.init();
}

Main.prototype.init = function() {
    userService.get();
    userService.delete(1);
    vendorService.put(1, {companyName: 'Google'});
    vendorService.post({companyName: 'Apple'});
}

const run = new Main();