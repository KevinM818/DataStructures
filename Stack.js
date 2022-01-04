//Stack - LIFO
//Stack Linked List Implementation
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(val) {
    const newNode = new Node(val);

    if (!this.first) {
      this.last = newNode;
    } else {
      newNode.next = this.first;
    }

    this.first = newNode;
    this.size++;
    return this;
  }

  pop() {
    if (!this.first) return undefined;

    const removedNode = this.first;
    this.first = removedNode.next;
    this.size--;

    if (this.size === 0) {
      this.last = null;
    }

    return removedNode;
  }

  traverse() {
    let node = this.first;

    while (node) {
      console.log(node);
      node = node.next;
    }
  }
}

const stack = new Stack();
stack.push('ONE');
stack.push('TWO');
stack.push('THREE');
stack.pop();

stack.traverse();
console.log(stack);


//Stack Array Implementations
//push/pop -> more efficent array stack implementation
const pushArr = [];
pushArr.push(1);
pushArr.push(2);
pushArr.push(3);
pushArr.pop();

//shift/unshift
const shiftArr = [];
shiftArr.unshift(3);
shiftArr.unshift(2);
shiftArr.unshift(1);
shiftArr.shift();