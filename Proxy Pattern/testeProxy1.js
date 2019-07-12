function moveProperty(source, property, target) {
  target[property] = source[property];
  delete source[property];
}

function traceMethodCalls(obj) {
  const handler = {
    get(target, property, receiver) {
      const originalMethod = target[property];
      return function(...args) {
        const result = originalMethod.apply(this, args);
        console.log(property + JSON.stringify(args) + ' => ' + JSON.stringify(result));
      }
    }
  };
  return new Proxy(obj, handler);
}

const calc = {
  multiple(x, y) {
    return x * y;
  },
  square(x) {
    return this.multiple(x, x);
  }
}

const traceObj = traceMethodCalls(calc);
traceObj.square(2);


//Mega handler to get all operation in a object
const handler = new Proxy({}, {
  get(target, trapMethod, receiver) {    
    return function(...args) {
      const trapName = trapMethod.toUpperCase();
      const zeroParameter = args.slice(1);
      console.log(trapName);
      return Reflect[trapMethod](...args);
    }
  }
});

const objProxy = new Proxy({}, handler);

objProxy.foo = 'Cassandra';

const target2 = {
  testObject() {
    return {
      thisIsTarget: this === target2,
      thisIsProxy:this === proxy2,
    }
  }
}

const proxy2 = new Proxy(target2, {});

console.log(target2.testObject());
console.log(proxy2.testObject());

// Internal Slot examples


const proxyDate = new Proxy(new Date('06/07/2019'), {
  get(target, property, receive) {
    if(property == 'getDate') {
      return target[property].bind(target);
    }
    return Reflect.get(target, property, receive);
  }
});

console.log(proxyDate.getDate());

//Trace prop example

function tracePropAccessES5(obj, propKeys) {
  //Create a clean objecto to store of data
  const propData = Object.create(null);
  //Replace all getters and setters property
  propKeys.forEach(function (propKey) {
    propData[propKey] = obj[propKey];
    Object.defineProperty(obj, propKey, {
      get: function() {
        console.log(`GET ${propKey}`);
        return propData[propKey];
      },
      set: function(value) {
        console.log(`SET ${propKey}`);
        propData[propKey] = value;
      },
    })
  });
  return obj;
}

function tracePropAcessES6(obj, propKeys) {
  const propKeySet = new Set(propKeys);
  return new Proxy(obj, {
    get(target, property, receive) {
      if(propKeySet.has(property)) {
        console.log(`GET ${property}`);
      }

      return Reflect.get(target, property, receive);
    },
    set(target, property, value, receive) {
      if(propKeySet.has(property)) {
        console.log(`SET ${property}`);
      }

      return Reflect.set(target, property, value, receive);
    }
  })
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `Point(${this.x}, ${this.y})`;
  }
}

let p = new Point(2, 7);
p = tracePropAccessES5(p, ['x', 'y']);

let p2 = new Point(5, 7);
p2 = tracePropAcessES6(p, ['x', 'y']);

p.x
p.y
p.toString();

p2.x;
p2.y;
p2.toString();

//Property Checker
const propertyChecker = new Proxy({}, {
  get(target, property, receiver) {
    if(!(property in target)) {
      throw new ReferenceError(`Ops the ${property} property are in a galaxy far, far away...`);
    }
    return Reflect.get(target, property, receiver);
  }
});

const proxyPropertyChecker = new Proxy({}, propertyChecker);

//console.log(proxyPropertyChecker.foo);

//Databind example
const createObservableArray = (callback) => {
  const array = []
  return new Proxy(array, {
    set(target, property, value, receive) {
      callback(property, value);
      return Reflect.set(target, property, value, receive);
    }
  });
}

const observedArray = createObservableArray((key, value) => console.log(`${key} = ${value}`));
observedArray.push('a');