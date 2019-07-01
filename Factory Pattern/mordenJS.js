/**
 * Factory Pattern
 * 
 * Using for handling object creational mechanisms. Using a interface/class to handle with
 * the object instantiation
 */

const player = {
  name: 'Jin',
}

const monsterType = {
  SLIME: 'SILME',
  WOLF:  'WOLF'
}

class MonsterFactory {
 
  createMonster(type) {    
    switch (type) {
      case monsterType.SLIME:
        return new Slime();
      case monsterType.WOLF:
        return new Wolf();
      default:
        throw "The monster does not exists";
    }
  }
}

class Slime {
  
  constructor() {
    const _type = monsterType.SLIME;
    const _grow = 'sblosh sblosh';

    this.getType = function() {
        return _type;
    }
    
    this.getGrow = function () {
        return _grow;
    }
  }
}

class Wolf {
  constructor() {
    const _type = monsterType.WOLF;
    const _grow = 'A-woooooooooo!';

    this.getType = function() {
        return _type;
    }
    
    this.getGrow = function() {
        return _grow;
    }
  }
}

class Main {

  constructor() {
    this.init();
  }

  init() {
    console.log(`${player.name} walks randomly through the forest when...`);

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

    console.log(`A ${monster.getType()} appeared ${monster.getGrow()}`);
  }

}

const game = new Main();

