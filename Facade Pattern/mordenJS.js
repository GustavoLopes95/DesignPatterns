/**
 * Facade Pattern
 * 
 * The Facade Pattern is used for provide the user with a unified and simple interface to easily use
 * complex system feature
 */

const VENDORS = {
  GOOGLE: 'Google',
  APPLE: 'Apple',
}

//Vendor Plugin
class GooglePlugin {

  get resources() {
    return [
      {id: 1, data: 'Google content resource one'},
      {id: 2, data: 'Google content resource two'},
      {id: 3, data: 'Google content resource three'},
      {id: 4, data: 'Google content resource four'},
    ]
  }

  getData(id) {
    return this.resources.find(data => data.id === id);
  }
}

//Vendor Plugin
class ApplePlugin {
  constructor() {
    /**
     * @public
     */
    this.data = [
      {id: 1, data: 'Apple content resource one'},
      {id: 2, data: 'Apple content resource two'},
      {id: 3, data: 'Apple content resource three'},
      {id: 4, data: 'Apple content resource four'}
    ]
  }

  retriveResource(id) {
    return this.data.find(data => data.id === id);
  }
}

//Adpter Interface
class GoogleImplementation {
  constructor() {
    if(!GoogleImplementation.instance) {
      const _ = new GooglePlugin();
      this.resources = _.resources || [];
      this.fetch = _.getData.bind(_);
      GoogleImplementation.instance = this;
    }

    return GoogleImplementation.instance;
  }
}

//Adpter Interface
class AppleImplementation {
  constructor() {
    if(!AppleImplementation.instance) {
      const _ = new ApplePlugin();
      this.resources = _.data || [];
      this.fetch = _.retriveResource.bind(_);
      AppleImplementation.instance = this;
    }

    return AppleImplementation.instance;
  }
}

class VendorAccess {
  constructor(vendor) {
    let _;
    switch (vendor) {
      case VENDORS.GOOGLE:
        _ =  new GoogleImplementation();
        break;
      case VENDORS.APPLE:
        _ = new AppleImplementation();
        break;
      default:
        throw `The vendor ${vendor} does not exists`;
    }

    //Make access to property read-only
    Object.defineProperties(this, {
      resources: {
        get: () => _.resources
      },
      fetch: {
        value: _.fetch
      }
    });

    
    //Preserve object integration
    Object.seal(this);
    Object.freeze(this);
  }

  get(id) {
    return this._tryGet(this.fetch, id);
  }

  _tryGet(func, id) {
    const result = func.call(this.fetch, id);

    return new Promise((resolve, reject) => !!result
      ? resolve(result)
      : reject(this._error));
  }

  get _error() {
    return { status: 404, mensage: 'Nothing resource find with this id' };
  }
}

class Main {
  constructor() {
    this.init();
  }

  init() {
    const vendorResource = new VendorAccess('Apple', 1);

    vendorResource.get(4)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }
}

const run = new Main();