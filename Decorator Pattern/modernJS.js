/**
 * Decorator Pattern
 * 
 * The pattern is used for add in run-time new property or/and function to a exists class
 * dynamically.
 */

class Human {
  constructor({name, lastName}) {

    this.name = name;
    this.lastName = lastName;
  }

  say() {
    return `Hello I'm ${this.name} ${this.lastName}`;
  }
}

class SuperHero extends Human {
  constructor(human, power) {
    super(human);
    this.human = human;
    this.power = power;
  }

  usePower() {
    return `${this.human.name} ${this.human.lastName} use ${this.power}`;
  }

  doGoodThing() {
    return `${this.human.name} ${this.human.lastName} help a little cat trapped in a tree`;
  }
}


class SuperVillain extends Human {
  constructor(human, power) {
    super(human);
    this.human = human;
    this.power = power;
  }

  usePower() {
    return `${this.human.name} ${this.human.lastName} use ${this.power}`;
  }

  doBadThing() {
    return `${this.human.name} ${this.human.lastName} thew trash on the floor`;
  }
}

const person1 = new SuperHero(new Human({ name:'Clarck', lastName:'Kent'}), 'Heat Vision');
const person2 = new SuperVillain(new Human({ name:'Lex', lastName:'Luthor'}), 'Super Smart');


console.log(person1.say());
console.log(person1.usePower());
console.log(person1.doGoodThing());

console.log(person2.say());
console.log(person2.usePower());
console.log(person2.doBadThing());