// 二叉搜索树：二叉搜索树（BST）是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大（或者等于）的值。
function BinarySearchTree() {
    // 键（节点），包含两个指针
    const Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    let root = null;  // 根元素
    
    // 向树中插入一个新的键
    this.insert = (key) => {
        console.log(`insert ${key}`);
        // 不是根节点的时候插入
        const insertNode = (node, newNode) => {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            }
        };

        let newNode = new Node(key);
        // 根节点就直接插入
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    };
    // 通过中序遍历方式遍历所有节点。从小到大遍历
    this.inOrderTraverse = (cb) => {
        const inOrderTraverseNode = (node, cb) => {
            if (node !== null) {
                // 按左->自身->右的调用顺序，因为在插入的时候，小的在左，大的在右。遍历的时候按左中右的顺序，得到的结果就会是从小到大的顺序。这也是二叉搜索树的特性
                inOrderTraverseNode(node.left, cb);
                cb(node.key);
                inOrderTraverseNode(node.right, cb);
            }
        };
        inOrderTraverseNode(root, cb);
    };
    // 通过前序遍历方式遍历所有节点
    this.preOrderTraverse = (cb) => {
        const preOrderTraverseNode = (node, cb) => {
            if (node !== null) {
                cb(node.key);
                preOrderTraverseNode(node.left, cb);
                preOrderTraverseNode(node.right, cb);
            }
        };
        preOrderTraverseNode(root, cb);
    };
    // 通过后序遍历方式遍历所有节点
    this.postOrderTraverse = (cb) => {
        const postOrderTraverseNode = (node, cb) => {
            if (node !== null) {
                postOrderTraverseNode(node.left, cb);
                postOrderTraverseNode(node.right, cb);
                cb(node.key);
            }
        };
        postOrderTraverseNode(root, cb);
    };
    // 返回树中最小的值/键。最左侧的叶节点
    this.min = () => {
        const minNode = (node) => {
            if (node) {
                if (node.left === null) {
                    return node.key;
                }
                return minNode(node.left);
            }
            return null;
        };
        return minNode(root);
    };
    // 返回树中最大的值/键。最右侧的叶节点
    this.max = () => {
        const maxNode = (node) => {
            if (node) {
                if (node.right === null) {
                    return node.key;
                }
                return maxNode(node.right);
            }
            return null;
        };
        return maxNode(root);
    };
    // 在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false
    this.search = (key) => {
        const searchNode = (node, key) => {
            if (node === null) {
                return false;
            }
            if (key < node.key) {
                return searchNode(node.left, key);
            } else if (key > node.key) {
                return searchNode(node.right, key);
            } else { // 相等则查找到，返回 ture
                return true;
            }
        };
        return searchNode(root, key);
    };
    // 从树中移除某个键
    this.remove = (key) => {
        console.log(`remove ${key}`);
        const findMinNode = (node) => {
            if (node.left === null) {
                return node;
            }
            return minNode(node.left);
        };
        // 移除一个节点，返回这个节点移除后的新树
        const removeNode = (node, key) => {
            if (node === null) {
                return null;
            }
            if (key < node.key) {
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = removeNode(node.right, key);
                return node;
            } else {  // 相等，即找到了要移除的节点。会删除这个节点，将结果返回给上层节点的 left 或 right
                // 第一种情况——一个叶节点。直接删除，设置为 null
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                // 第二种情况——一个只有一个子节点的节点
                if (node.left === null) {
                    node = node.right;
                    return node; // 返回整个右侧的子树
                } else if (node.right === null) {
                    node = node.left;
                    return node;  // 返回整个左侧的子树
                }
                // 第三种情况——一个有两个子节点的节点
                // 找到右侧子树中最小的节点，这个节点即为所有子节点中大于等于自身的节点中，与自身相邻的那个节点。
                const aux = findMinNode(node.right);
                // 将找到的这个节点与自身值替换。找到的这个节点必然比左子树的所有节点大，比所有右子树的所有节点小。
                node.key = aux.key;
                // 最后从右子树中将找到的这个节点删除，将删除后的树赋值给这个节点的 right
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        };
        root = removeNode(root, key);
    };
};

const tree = new BinarySearchTree();

tree.insert(10);
tree.insert(2);
tree.insert(19);
tree.insert(3);
tree.insert(-1);
console.log('inOrderTraverse-----------------------------------');
tree.inOrderTraverse((val) => {console.log(val)});
console.log('preOrderTraverse-----------------------------------');
tree.preOrderTraverse((val) => {console.log(val)});
console.log('postOrderTraverse-----------------------------------');
tree.postOrderTraverse((val) => {console.log(val)});
console.log('min-----------------------------------');
console.log(tree.min());
console.log('max-----------------------------------');
console.log(tree.max());
console.log('search-----------------------------------');
console.log(tree.search(3));
console.log('remove-----------------------------------');
tree.remove(2);
tree.inOrderTraverse((val) => {console.log(val)});