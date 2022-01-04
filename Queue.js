//Queue - FIFO
//Queue Linked List Implementation
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) {
    const newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }
    
    this.last = newNode;
    this.size++;
    return this;
  }

  dequeue() {
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

const queue = new Queue();
queue.enqueue('ONE');
queue.enqueue('TWO');
queue.enqueue('THREE');
queue.dequeue();

queue.traverse();
console.log(queue);


//Queue Array Implemtations
//push/shift
const pushQ = [];
pushQ.push(1);
pushQ.push(2);
pushQ.push(3);
pushQ.shift();

//unshift/pop
const unshiftQ = [];
unshiftQ.unshift(3);
unshiftQ.unshift(2);
unshiftQ.unshift(1);
unshiftQ.pop();
