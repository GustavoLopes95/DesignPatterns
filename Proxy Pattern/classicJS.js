(function() { 
var Bank = function() {
  this.money = 9000;
};

Bank.prototype = {
  getBalance: function() {
    return this.money;
  },

  doMove: function(value) {
    var money = this.getBalance();
    var move = money + parseInt(value);
    this.money = move;
  }
}

var BankProxy = function() {
  this.bank = null;
} 

BankProxy.prototype = {

  _init: function() {
    if(this.bank == null) {
      this.bank = new Bank();
    }
  },
  
  getBalance: function() {
    this._init();
    return this.bank.getBalance();
  },
  
  doMove: function(value) {
    this._init() 
    this.bank.doMove(value);
  }
}
  
  window.BankProxy = BankProxy;
  
  window.Bank = BankProxy;
}());

var James = new BankProxy();
console.log(James.getBalance());