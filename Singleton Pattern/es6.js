/**
 * Singleton Pattern
 * 
 * This pattern is used when you want to have one, and only one, instance of an object 
 * and provide a global point of access to it. The class singleton are the responsible 
 * for creation, initialization, access, and enforcement.
 */

class ModuleA {

 constructor(data) {
  if(!ModuleA.instance) {
    ModuleA._content = data;
    ModuleA.instance = this;
  }

  return ModuleA.instance;
 }

 getContent() {
   return ModuleA._content;
 }

 //Logic/Function Module here
}

const instanceA = new ModuleA('An instance of module A');
console.log(instanceA.getContent()); //An instance of module A

const instanceB = new ModuleA('Other instance of module A');
console.log(instanceB.getContent()); //An instance of module A
