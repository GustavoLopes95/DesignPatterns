/**
 * Adpter Pattern
 * 
 * A pattern used to connect incompatible classes through an interface compatible with 
 * the two classes
 */

var Warrior = function(){
  this.atkBase = 5;
  this.hp = 300;
}  

Warrior.prototype.attack = function() {
    return this.atkBase * 10;
}

Warrior.prototype.defense = function() {
  return 'All damage received was absorbed';
}

var Magic = function(){
  this.atkBase = 15;
  this.hp = 250;
}

Magic.prototype.fira = function() {
  return this.atkBase * 5;
}

Magic.prototype.heal = function() {
  this.hp += 50;
  return 'Recover more 50 HP';
}

var AdpterMagic = function(magic) {
  this.magic = magic;
}

AdpterMagic.prototype.attack = function() {
  return this.magic.fira();
}

AdpterMagic.prototype.defense = function() {
  return this.magic.heal();
}

var Main = function() {
  this.init();
}

Main.prototype.init = function() {
  const jin = new Warrior();
  const kamy = new AdpterMagic(new Magic());

  console.log(`Jin attack:  ${jin.attack()} damage`);
  console.log(`Kamy attack: ${kamy.attack()} damage`);
}

const test = new Main();




