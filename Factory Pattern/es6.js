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
        throw "The monster don't exists";
    }
  }
}

class Slime {
  constructor() {
    this._type = monsterType.SLIME;
    this._grow = 'sblosh sblosh';
  }

  getType() {
    return this._type;
  }

  getGrow() {
    return this._grow;
  }
}

class Wolf {
  constructor() {
    this._type = monsterType.WOLF;
    this._grow = 'A-woooooooooo!';
  }

  getType() {
    return this._type;
  }

  getGrow() {
    return this._grow;
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
    if(Math.floor(Math.random() * 100)  < 50) {
      _monsterType = monsterType.SLIME;
    } else {
      _monsterType = monsterType.WOLF;
    }

    const monster = monsterFactory.createMonster(_monsterType);

    console.log(`A ${monster.getType()} appeared ${monster.getGrow()}`);
  }

}

const game = new Main();

