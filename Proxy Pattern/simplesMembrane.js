/**
 * Proxy Pattern Membranes implementation
 * 
 * Membranes is used for limit access to the entiered object graph, using the feature Object.freeze
 * the properties of the objectes inside of the mebrane are prevent modifications, also retrict read
 * access to a object.
 * 
 */

function createMembrane(initTarget) {

  const isPrimitive = (obj) => {
    return Object(obj) !== obj;
  }
  
  function isRevoked() {
    if(controller.revoked) {
      throw Error('The access has been revoked.');
    };
  }
  
  function wrapMetadata(property) {
    //If needing create a special rule to property descriptor
    let wrappedDescription = {
      enumerable: property.enumerable,
      configurable: false//property.configurable
    }
    if('value' in property) { wrappedDescription.value = wrap(property.value); }
    if('writable' in property) { wrappedDescription.writable = property.writable; }
    if('get' in property) { wrappedDescription.get = wrap(property.get); }
    if('set' in property) { wrappedDescription.set = wrap(property.set); }
    return wrappedDescription;
  }

  function wrap(target) {
    //Primitive property have irrevocable knowledge
    if(isPrimitive(target)) {
      return target;
    }

    const baseHandler = Object.create(null);
    baseHandler.get = function(fakeTarget, property, receiver) {
      isRevoked();

      const prop = Reflect.get(target, property);
      if(!isPrimitive(prop)) {
        return wrap(prop);
      }
      return prop;
    };
    baseHandler.getOwnPropertyDescriptor = function(fakeTarget, name) {
      isRevoked(); //Check if the proxy not been revoked
      //Check if property description exists in real object
      const propMetadata = Reflect.getOwnPropertyDescriptor(target, name);
      if(propMetadata !== undefined) {
        const wrappedMetadata = wrapMetadata(propMetadata);
        if(!propMetadata.configurable) {
          Object.defineProperty(fakeTarget, name, wrappedMetadata);
        }
        return wrappedMetadata;
      }
      return undefined;
    };
    baseHandler.defineProperty = function(fakeTarget, name, metadata) {
      isRevoked(); //Check if the proxy not been revoked
      //Check if property description exists
      const success = Reflect.defineProperty(target, name, wrapMetadata(metadata));
      if(success && !metadata.configurable) {
        Object.defineProperty(target, name, wrapMetadata(metadata));
      }
      return success;
    };
    baseHandler.deleteProperty = function(fakeTarget, name) {
      isRevoked(); //Check if the proxy not been revoked
      return wrap(Reflect.deleteProperty(target, name));
    };
    baseHandler.getOwnPropertyNames = function(fakeTarget) {
      isRevoked(); //Check if the proxy not been revoked
      return wrap(Reflect.getOwnPropertyNames());
    };
    baseHandler.apply = function(fakeTarget, receiver, args) {
      isRevoked(); //Check if the proxy not been revoked
      try {        
        return wrap(Reflect[tarpMethod](target, ...args.map(wrap)));
      } catch(e) {
        if(e instanceof StopIteration) { throw e; }
        throw wrap(e);
      }
    }    

    /* Use other variable instead real target to no expose the real proto */
    const fakeTarget = (typeof target === 'function') ?
    function() {} :
    Object.create(wrap(Object.getPrototypeOf(target)));

   
    Object.preventExtensions(fakeTarget);

    return new Proxy(fakeTarget, baseHandler);
  }
  
  const controller = {
    revoked: false
  };
  return {
    wrapper: wrap(initTarget),
    revoke: () => controller.revoked = true
  }
}

//User sensitive information
const user = {
  id: 1,
  name: 'Jonathan J.',
  lastName: 'Workman',
}

const getUser = ({id = null} = {}) => {  
  if(!id) return {};
  const DATABASE = [
    { userID: 1, salaray: 130000 },
    { userID: 2, salaray: 70000 },
    { userID: 3, salaray: 5500 },
  ]
  const  _user = DATABASE.find((row) => row.userID === user.id);
  return _user || {};
}

// Simulation database access
const getSalary = (user) => {
  const userData = getUser();  
  return userData && userData.salaray || null;
}

// User a membrane to prevent expose the information for a long time
const membrane = createMembrane(user);
const userSalary = getSalary(membrane.wrapper);
membrane.revoke();
console.log(userSalary); // 13000

// All access to the sensitive information has been revoked
membrane.wrapper.lastName;//Throw error access has been revoked