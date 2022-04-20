class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (this.adjacencyList[vertex]) return;
    this.adjacencyList[vertex] = [];
  }

  removeVertex(vertex) {
    this.adjacencyList[vertex].forEach(v => this.removeEdge(vertex, v));
    delete this.adjacencyList[vertex];
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  dfsRecursive(vertex) {
    const vertices = [];
    const visited = {};

    const dfs = v => {
      visited[v] = true;
      vertices.push(v);

      for (let childVertex of this.adjacencyList[v]) {
        if (!visited[childVertex]) {
          dfs(childVertex);
        }
      }
    }

    dfs(vertex);
    return vertices;
  }

  dfsIterative(vertex) {
    const stack = [vertex]; 
    const vertices = [];
    const visited = {}; 
    let current;

    while (stack.length) {
      current = stack.pop();

      if (!visited[current]) {
        visited[current] = true;
        vertices.push(current);
        stack.push(...this.adjacencyList[current]);
      }
    }

    return vertices;
  }

  bfs(vertex) {
    const queue = [vertex]; 
    const vertices = []; 
    const visited = {}; 
    let current; 

    while (queue.length) {
      current = queue.shift();

      if (!visited[current]) {
        visited[current] = true;
        vertices.push(current);
        queue.push(...this.adjacencyList[current]);
      }
    }

    return vertices;
  }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');
graph.bfs('A');
console.log(graph)