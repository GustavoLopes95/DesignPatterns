/**
 * Facade Pattern
 * 
 * The Facade Pattern is used for provide the user with a unified and simple interface to easily use
 * complex system feature
 */

class VendorPlugin {
  constructor() {}

  get resources() {
    return [
      {id: 1, data: 'content resource one'},
      {id: 2, data: 'content resource two'},
      {id: 3, data: 'content resource three'},
      {id: 4, data: 'content resource four'},
    ]
  }

  fetch(id) {
    return this.resources.find(data => data.id === id);
  }
}

class PluginFacade {

  get(id) {
    return this._tryGet(this._findResource, id);
  }

  _tryGet(func, id) {
    const result = func.call(this, id);

    return new Promise((resolve, reject) => !!result
      ? resolve(result)
      : reject(this._error));
  }

  get _error() {
    return { status: 404, mensage: 'Nothing resource find with this id' };
  }

  _findResource(id) {
    const vendorService = new VendorPlugin();
    return vendorService.fetch(id);
  }
}

class Main {
  constructor() {
    this.init();
  }

  init() {
    const vendorResource = new PluginFacade();
    vendorResource.get(3)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }
}

const run = new Main();