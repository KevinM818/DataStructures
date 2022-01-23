class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);
    this.bubbleUp(this.values.length - 1);
    return this;
  }
  
  bubbleUp(index) {
    if (index === 0) return;
    const parentIndex = Math.floor((index - 1) / 2);
    const parentValue = this.values[parentIndex];
    const currentValue = this.values[index];
    
    if (currentValue > parentValue) {
      this.values[parentIndex] = currentValue;
      this.values[index] = parentValue;
      return this.bubbleUp(parentIndex);
    }

    return;
  }

  extractMax() {
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
    let leftValue;
    let rightValue;
    let swap = null;

    if (leftIndex < length) {
      leftValue = this.values[leftIndex];

      if (leftValue > currentValue) {
        swap = leftIndex;
      }
    }

    if (rightIndex < length) {
      rightValue = this.values[rightIndex];

      if (
        (swap === null && rightValue > currentValue) ||
        (swap !== null && rightValue > leftValue)
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


const heap = new MaxBinaryHeap();
heap.insert(10);
heap.insert(20);
heap.insert(15);
heap.insert(2);
heap.insert(3);
heap.insert(7);
heap.insert(8);
heap.insert(13);
heap.insert(50);
heap.extractMax();

for (let i = 0; i < heap.values.length; i++) {
  console.log(heap.values[i]);
}
// console.log(heap.values)

