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

const playerCommad = {

  toLeft() {
    console.log(`${this.name} walk to left`);
  },

  toRight() {
    console.log(`${this.name} walk to right`);
  },

  toUp() {
    console.log(`${this.name} walk to up`);
  },

  toDown() {
    console.log(`${this.name} walk to down`);
  },

  getName() {
    return this.name;    
  },

  getLvl() {
    return this.lv;
  },

  upLevel() {
    this.lv += 1;
  }
}

const createPlayer = (name, lvl) => {
  return Object.create(playerCommad, {
    'name': {
      value: name,
      enumerable: false,
      writable: false,
    },
    'lv': {
      value: lvl,
      enumerable: true,
      writable: true,
    }
  });
}

class Main {
  constructor() {
    this.init();
  }

  init() {
    const person = createPlayer('Jin', 1);

    console.log(`The player ${person.getName()} born with the lvl ${person.getLvl()}`);
    person.toUp();
    person.toRight();
    person.upLevel();

    console.log(`Congratulations ${person.getName()} now you are lvl ${person.getLvl()}`);
  }
}

const game = new Main();