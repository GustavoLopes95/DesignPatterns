var myApp = (function(){
  var instance;

  function createInstance(params) {
    //logic instance here
  }

  return {
    getInstance: function(params) {
      if(!instance){
        instance = createInstance(params);
      }
    }
  }
})();

var Main = function() {
  this.init();
}

Main.prototype.init = function() {
  //Lazy Singleton
  var instanceOne = myApp.getInstance({Name: 'ModuleA'}); // ModuleA
  var instanceTwo = myApp.getInstance({Name: 'ModuleB'}); // ModuleA

  console.log(instanceOne === instanceTwo);
}

var test = new Main();