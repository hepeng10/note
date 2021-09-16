// 图。使用邻接表实现
function Graph() {
    let vertices = []; // 存储所有顶点的数组
    let adjList = { // 字典用来存储邻接表。两个相邻接的顶点也就是一条边
        // va: [vb, vc, vd]
    };

    // 添加顶点
    this.addVertex = (v) => {
        vertices.push(v);
        adjList[v] = [];  // adjList 的数据结构为
    }
    // 添加边。接收两个顶点
    this.addEdge = (v1, v2) => {
        adjList[v1].push(v2);
        adjList[v2].push(v1);
    }

    // 初始化颜色辅助函数。颜色有三种：白色-表示该顶点还没有被访问；灰色-表示该顶点被访问过，但并未被探索过；黑色-表示该顶点被访问过并且被完全探索过。
    const initColor = () => {
        let color = {};
        for (let i = 0; i< vertices.length; i++) {
            color[vertices[i]] = 'white'; // 初始化为白色
        }
        // console.log('color=>', color);
        return color;
    }
    // 广度优先搜索：一层一层的访问
    // 接收开始搜索的顶点和回调
    this.bfs = (v, cb) => {
        let color = initColor();  // 初始化，将所有顶点设置为白色
        let queue = [];  // 存储待访问和待探索的顶点
        queue.push(v);  // 将起始顶点加入队列
        while (queue.length) {
            const v1  = queue.shift();
            const neighbors = adjList[v1];
            color[v1] = 'gray';  // 标记顶点为访问过，表示我们发现了它，但还未完成对其的探索
            // 探索 v1 的邻接点
            for (let i = 0; i < neighbors.length; i++) {
                const neighbor = neighbors[i];
                // 如果这个邻接点未被访问过，则标记为我们已经发现了它，并加入待探索队列中
                if (color[neighbor] === 'white') {
                    color[neighbor] = 'gray';
                    queue.push(neighbor);
                }
            }
            // 经过上面的探索，v1 已经探索完成，标记为 black
            color[v1] = 'black';
            if (cb) {
                cb(v1);
            }
        }
    }
    // 深度优先搜索。从一个节点开始，递归访问它的邻接点
    this.dfs = (cb) => {
        let color = initColor();
        const dfsVisit = (v, color, cb) => {
            if (cb) {
                cb(v);
            }
            color[v] = 'gray';
            const neighbors = adjList[v];
            // 探索邻接点
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                if (color[neighbor] === 'white') {
                    // 找到了一个邻接点，递归访问
                    dfsVisit(neighbor, color, cb);
                }
            }
            color[v] = 'black';
        }
        // 遍历顶点，如果这个顶点未被访问过，则由它开始递归访问
        for (let i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                dfsVisit(vertices[i], color, cb);  // 如果这个图所有点都是连通的，则这里只会执行一次
            }
        }
    }

    // 重写 toString，优化输出格式
    this.toString = () => {
        let s = '';
        for (let i = 0; i < vertices.length; i++) {
            s += vertices[i] + '->';  // +的优先级比+=高
            let neighbors = adjList[vertices[i]];
            for (let j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + '';
            }
            s += '\n';
        }
        return s;
    }
}

var graph = new Graph();
var myVertices = ['A','B','C','D','E','F','G','H','I'];
for (var i=0; i<myVertices.length; i++){
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());
console.log('bfs::::::::::::::::::::::::::::::');
graph.bfs(myVertices[0], (val) => {console.log(`visited vertex:${val}`)});
console.log('dfs::::::::::::::::::::::::::::::');
graph.dfs((val) => {console.log(`visited vertex:${val}`)});