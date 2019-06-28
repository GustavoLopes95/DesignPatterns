/**
 * Factory Pattern
 * 
 * Using for handling object creational mechanisms. Using a interface/class to handle with
 * the object instantiation
 */

var player = {
  name: 'Jin',
}

var monsterType = {
  SLIME: 'SLIME',
  WOLF: 'WOLF'
}

var Slime = function() {
  this._type = monsterType.SLIME;
  this._grow = 'sblosh sblosh';
}

Slime.prototype = {
  getType: function() {
    return this._type;
  },

  getGrow: function () {
    return this._grow;
  }
}

var Wolf = function() {
  this._type = monsterType.WOLF;
  this._grow = 'A-woooooooooo!';
}

Wolf.prototype = {
  getType: function() {
    return this._type;
  },

  getGrow: function () {
    return this._grow;
  }
}

var MonsterFactory = function () {
};

MonsterFactory.prototype = {
  createMonster: function(type) {
    switch (type) {
      case monsterType.SLIME:
        return new Slime();
      case monsterType.WOLF:
        return new Wolf();
      default:
          console.log("The monster don't exists");
        break;
        
    }
  }
}

var Main = function () {
  this.init();
}

Main.prototype = {
  init: function() {
    console.log(player.name + ' walks randomly through the forest when...');

    const monsterFactory = new MonsterFactory();
    let _monsterType;
    if(Math.floor(Math.random() * 100)  > 50 &&  Math.floor(Math.random() * 100)  < 60) {
      _monsterType = monsterType.SLIME;
    } else if(Math.floor(Math.random() * 100)  > 60) {
      _monsterType = monsterType.WOLF;
    } else {
      _monsterType = 'Nothing';
    }

    const monster = monsterFactory.createMonster(_monsterType);
    
    if(monster) {
      console.log('A ' + monster.getType() + ' appeared ' + monster.getGrow());
    }
  }
}

var game = new Main();