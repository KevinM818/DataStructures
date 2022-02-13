class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  hash(key) {
    let total = 0;
    let weirdPrime = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total + weirdPrime + value) % this.keyMap.length;
    }

    return total;
  }

  set(key, value) {
    const index = this.hash(key);

    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }

    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);

    if (this.keyMap[index]) {
      return this.keyMap[index].find(([hashKey]) => hashKey === key);
    }

    return undefined;
  }

  keys() {
    const keysArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }

    return keysArr;
  }

  values() {
    const valuesArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }

    return valuesArr;
  }
} 

const hashTable = new HashTable(17);
hashTable.set('olive', 'test');
hashTable.set('yellow', 'swser');
hashTable.set('maroon', 'wer');
hashTable.set('d', 'jojo');
hashTable.set('green', 'grn');
hashTable.set('blue', 'blu');
hashTable.set('red', 'red');

const test = hashTable.keys();

console.log(test);

