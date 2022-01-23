class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const node = new Node(val, priority);
    this.values.push(node);
    this.bubbleUp(this.values.length - 1);
    return this;
  }
  
  bubbleUp(index) {
    if (index === 0) return;
    const parentIndex = Math.floor((index - 1) / 2);
    const parentValue = this.values[parentIndex];
    const currentValue = this.values[index];
        
    if (currentValue.priority < parentValue.priority) {
      this.values[parentIndex] = currentValue;
      this.values[index] = parentValue;
      return this.bubbleUp(parentIndex);
    }

    return;
  }

  dequeue() {
    const root = this.values[0];
    const end = this.values.pop();
    
    if (this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }

    return root;
  }

  bubbleDown(index = 0) {
    const length = this.values.length;
    const leftIndex = (2 * index) + 1;
    const rightIndex = (2 * index) + 2;
    const currentValue = this.values[index];
    const currentPriority = currentValue.priority
    let leftValue;
    let rightValue;
    let swap = null;

    if (leftIndex < length) {
      leftValue = this.values[leftIndex].priority;

      if (leftValue < currentPriority) {
        swap = leftIndex;
      }
    }

    if (rightIndex < length) {
      rightValue = this.values[rightIndex].priority;

      if (
        (swap === null && rightValue < currentPriority) ||
        (swap !== null && rightValue < leftValue)
      ) {
        swap = rightIndex;
      }
    }

    if (swap === null) return;

    this.values[index] = this.values[swap];
    this.values[swap] = currentValue;
    
    return this.bubbleDown(swap);
  }

}



const erQueue = new PriorityQueue();
erQueue.enqueue('Low Fever', 3);
erQueue.enqueue('Concussion', 2);
erQueue.enqueue('Drunk', 3);
erQueue.enqueue('Exploded Head', 1);
erQueue.enqueue('Flu', 2);
erQueue.dequeue();

for (let i = 0; i < erQueue.values.length; i++) {
  const test = erQueue.values[i];
  console.log(test.priority, test.val);
}