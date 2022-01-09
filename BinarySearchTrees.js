class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    let next;

    while (true) {
      if (val === current.val) return undefined;

      next = val < current.val ? 'left' : 'right';
      
      if (!current[next]) {
        current[next] = newNode; 
        return this;
      }

      current = current[next];
    }
  }

  find(val) {
    if (!this.root) return false;

    let current = this.root;
    let next;

    while (current) {
      if (current.val === val) return current;

      next = val < current.val ? 'left' : 'right';
      current = current[next];
    }

    return false;
  }

  breadthFirstSearch() {
    const queue = [this.root];
    const visited = [];
    let current;

    while (queue.length) {
      current = queue.shift();
      
      if (current.left) queue.push(current.left);

      if (current.right) queue.push(current.right);

      visited.push(current.val);
    }

    return visited;
  }

  depthFirstSearchPreOrder() {
    const visited = [];

    const traverse = node => {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return visited;
  }

  depthFirstSearchPostOrder() {
    const visited = [];

    const traverse = node => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }

    traverse(this.root);
    return visited;
  }

  depthFirstSearchInOrder() {
    const visited = [];

    const traverse = node => {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return visited;

  }

}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(2);
tree.insert(7);
tree.insert(13);
tree.insert(20);
tree.insert(2);
tree.insert(11);
