class Implementation {
    constructor() {
        /**
         * @private
         */

        this.myPrivateProp1 = false;

        /**
         * @private
         */

        this.myPrivateProp2 = -1;

        /**
         * @public
         */

        this.myPublicProp1 = '';

        /**
         * @public
         */

        this.myPublicProp2 = null;

        Object.seal(this);
    }

    /**
     * @private
     */

    myPrivateMethod1() {
        // Do something private
    }

    /**
     * @private
     */

    myPrivateMethod2() {
        // Do something private
    }

    /**
     * @public
     */

    myPublicMethod1() {
        // Do something public
        return 'Hello';
    }

    /**
     * @public
     */

    myPublicMethod2() {
        // Do something public
    }
}

class Facade {
    constructor() {
        // A private instance of the implemetation is created
        // within the facade's closure

        const _ = new Implementation();

        // Members are then exposed one by one:

        // Methods are lexically bound to the implementation instance

        this.myPublicMethod1 = _.myPublicMethod1.bind(_);
        this.myPublicMethod2 = _.myPublicMethod2.bind(_);

        // Properties can be made read-only by only exposing
        // "getter" functions

        Object.defineProperties(this, {
            myPublicProp1: {
                get: () => _.myPublicProp1
            },
            myPublicProp2: {
                get: () => _.myPublicProp2
            }
        });
        
        // NB: Rather than using the ES6 `get()/set()` syntax on the
        // prototype, we must define getters within the constructor closure
        // using `Object.defineProperties()` to provide access to the private
        // implentation instance variable (`_`)

        // The facade is always stateless and can be frozen for an extra
        // layer of robustness.

        Object.freeze(this);
        
        // If monkey patching or spies are expected, Object.seal(this)
        // will suffice
    }
}

class Main {
  constructor() {
    this.init();
  }

  init() {
    const vendorResource = new Facade();
    vendorResource.myPublicProp2 = 'abacaxi';
    console.log(vendorResource.myPublicProp2);
    
    
  }
}

const run = new Main();