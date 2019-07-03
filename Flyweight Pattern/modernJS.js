/**
 * Flyweight Pattern
 * 
 * The pattern is primarily used to reduce the number of objects created and to decrease
 * the used of memory and increase performance.
 */

class EPI {
  constructor({name, description}) {
    
    Object.freeze(this);
    Object.seal(this);
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }
}

const FactoryAPI =(function(){
  const _epis = [];
  return class FactoryAPI {
    createEPI({name, description}) {
      let epi = this.getEPI(name);
      if(epi) {
        return epi;
      } else {
        epi = new EPI(name, description);
        _epis.push(epi);
      }
    }
  
    getEPI(name) {
      return _epis.find(_epi => _epi.name === name);
    }
  }
})();

class Main {
  constructor() {
    this.init();
  }

  init() {
    const factoryAPI = new FactoryAPI();

    const epi1 = factoryAPI.createEPI({name:'capacete', description: 'protege a cabeça'});
    const epi2 = factoryAPI.createEPI({name:'capacete', description: 'protege a cabeça'});
    const epi3 = factoryAPI.getEPI('capacete');

    console.log(epi1 === epi2); //true
    console.log(epi2 === epi3); //true
  }
}

const run = new Main();