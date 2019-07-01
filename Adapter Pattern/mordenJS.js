/**
 * Adpter Pattern
 * 
 * A pattern used to connect incompatible classes through an interface compatible with 
 * the two classes
 */

class Warrior {
  constructor() {
    this.atkBase = 5;
    this.hp = 300;
  }
  

  attack() {
    return this.atkBase * 10;
  }

  defense() {
    return 'All damage was absorved';
  }
}

class Magic {
  constructor() {
    this.atkBase = 15;
    this.hp = 250;
  }
  
  fira() {
    return this.atkBase * 5;
  }

  heal() {
    this.hp += 50;
    return 'Recover more 50 HP';
  }
}

class AdpterMagic {
  constructor(magic) {
    this.magic = magic;
  }

  attack() {
    return this.magic.fira();
  }

  defense() {
    return this.magic.heal();
  }
  
}

class Main {
  constructor() {
    this.init();
  }

  init() {
    const Jin = new Warrior();
    const Kamy = new AdpterMagic(new Magic());

    console.log(`Jin attack:  ${Jin.attack()} damage`);
    console.log(`Kamy attack: ${Kamy.attack()} damage`);
  }
  
}

const test = new Main();




