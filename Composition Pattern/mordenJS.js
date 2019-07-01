/**
 * Composition Pattern
 * 
 * Pattern used for compose object into tree-like structure to represent whole-part hierarchives.
 * Each node in the tree-like structure can be either a individual node or a composed collection
 * of collection. Regardless, each node is treated uniformly.
 * 
 */

/** Component */
let Menu = (function(){
  const _private = new WeakMap();
  return class Menu {
    constructor(name){
      _private.set(this, { _name: name });
    }


    getName() { return _private.get(this)._name };
  }
})();

/** Composite */
let MenuContent = (function(Menu){
  const _private = new WeakMap();
  return class MenuContent extends Menu {
    constructor(name) {
      super(name);
      _private.set(this, { _type: 'MC', _nodes: [] });
    }


    addNode(node) {      
      _private.get(this)._nodes = [..._private.get(this)._nodes, node];
    }

    removeNodeByName(nodeName) {
      const nodes = _private.get(this)._nodes;
      const filteredNodes = [...nodes].filter(node => nodeName !== node.getName());
      _private.get(this)._nodes = filteredNodes;
    }

    removeNodeByIndex(index) {
      const nodes = _private.get(this)._nodes;
      const filteredNodes = [...nodes.slice(0, index), ...nodes.slice(index + 1)];
      _private.get(this)._nodes = filteredNodes;
    }

    getNodeByName(nodeName) {
      const nodes = _private.get(this)._nodes;
      return nodes.find(node => nodeName === node.getName());
    }

    getNodeByIndex(index) {
      return _private.get(this)._nodes[index];
    }

    show(indentation = 0) {
      const nodes = _private.get(this)._nodes;
      let treeStructure = '';
      
      nodes.forEach((node, k) => {
        treeStructure += `${'--'.repeat(indentation)}${node.getName()}\n`;  

        if(node.noOfChildren() > 0) {
          indentation++;
          treeStructure += node.show(indentation);
        }
      });

      return treeStructure;
    }

    noOfChildren() {
      return _private.get(this)._nodes.length;
    }
  }

})(Menu);

/** Leaf */
let MenuItem = (function(Menu) {
  const _private = new WeakMap();
  return class MenuItem extends Menu {
    constructor(name){
      super(name);
      _private.set(this, { _type: 'MI'});
    }

    show() { 
      return this.getName();
    }
  
    noOfChildren() {
      return 0;
    }
  }
})(Menu);

class Main {
  constructor(){
    this.init();
  }

  init() {
    const menu = new MenuContent('Main Menu');
    menu.addNode(new MenuItem('Copy'));
    menu.addNode(new MenuItem('Paste'));
    
    const newMenu = new MenuContent('New');
    newMenu.addNode(new MenuItem('Folder'));
    newMenu.addNode(new MenuItem('ShortCut'));
    menu.addNode(newMenu);
    
    console.log(menu.show());
    // Copy
    // Paste
    // New
    // --Folder
    // --ShortCut
  }
}

const run = new Main();