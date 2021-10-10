"use strict";

const Node = require("./node");
const BinaryTree = require("./binaryTree");
class BinarySearchTree extends BinaryTree {
  constructor() {
    super();
    this.root = null;
  }
  add(value) {
    let node = new Node(value);
    let addValue = (current, node) => {
      if (node.value < current.value) {
        if (!current.left) {
          current.left = node;
        } else {
          addValue(current.left, node);
        }
      } else {
        if (!current.right) {
          current.right = node;
        } else {
          addValue(current.right, node);
        }
      }
    };

    if (!this.root) {
      this.root = node;
    } else {
      addValue(this.root, node);
    }
  }

  contains(value) {
    if (!this.root.value) {
      return false;
    }

    let searchValue = (current, value) => {
      if (current.value === value) {
        return true;
      } else if (current.value > value) {
        if (!current.left) {
          return false;
        }
        return searchValue(current.left, value);
      } else {
        if (!current.right) {
          return false;
        }
        return searchValue(current.right, value);
      }
    };

    return searchValue(this.root, value);
  }

  getMax() {
    let maxNode = this.root.value;
    const traverse = (node) => {
      if (node.value > maxNode) {
        maxNode = node.value;
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return maxNode;
  }

  getMin() {
    let minNode = this.root.value;
    const traverse = (node) => {
      if (node.value < minNode) {
        minNode = node.value;
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return minNode;
  }

  breadthFirst() {
    let result = [];
    let queue = [];
    queue.push(this.root);

    const traverse = (node) => {
      while (queue.length > 0) {
        node = queue.shift();
        result.push(node.value);

        if (node.right) queue.push(node.right);
        if (node.left) queue.push(node.left);
      }
    };
    traverse(this.root);
    return result;
  }

  fizzBuzz() {
    if (!this.root) throw new Error("the tree is empty");
    let result = [];

    const traverse = (node) => {
      if (node.value % 15 == 0) {
        node.value = "FizzBuzz";
        result.push(node.value);
      } else if (node.value % 5 === 0) {
        node.value = "Fizz";
        result.push(node.value);
      } else if (node.value % 3 === 0) {
        node.value = "Buzz";
        result.push(node.value);
      } else {
        node.value = `${node.value}`;
        result.push(node.value);
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  sumOfOEvenNodes() {
    let sum = 0;
    if (!this.root) throw new Error("the tree is empty");

    const traverse = (node) => {
      if (node.value % 2 == 0) sum += node.value;
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return sum;
  }

  sumOfOddNodes() {
    let sum = 0;
    if (!this.root) throw new Error("the tree is empty");

    const traverse = (node) => {
      if (node.value % 2 !== 0) sum += node.value;
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return sum;
  }

  lonlyNodes() {
    let lonlyNodes = [];
    if (!this.root) throw new Error("the tree is empty");

    const traverse = (node) => {
      if (node.left) {
        if (!node.right) {
          lonlyNodes.push(node.left.value);
        }
        traverse(node.left);
      }
      if (node.right) {
        if (!node.left) {
          lonlyNodes.push(node.right.value);
        }
        traverse(node.right);
      }
    };
    traverse(this.root);
    return lonlyNodes;
  }

  heightOfTree(node) {
    if (!node) {
      return 0;
    } else {
      let leftTraverse = this.heightOfTree(node.left);
      let rightTraverse = this.heightOfTree(node.right);
      if (leftTraverse > rightTraverse) {
        return leftTraverse + 1;
      } else {
        return rightTraverse + 1;
      }
    }
  }

  leavesNumber() {
    if (!this.root) throw new Error("the tree is empty");
    let numbers = [];
    const traverse = (node) => {
      if (!node.left && !node.right) {
        numbers.push(node.value);
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return numbers;
  }

  invert() {
    if (!this.root) throw new Error("the tree is empty");
    const traverse = (node) => {
      let temp = node.left;
      node.left = node.right;
      node.right = temp;
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
  }

  mergeTwoTrees(t1, t2) {
    if (!t1 && !t2) return null;
    let root = new Node((t1 ? t1.value : null) + (t2 ? t2.value : null));
    root.left = this.mergeTwoTrees(t1 ? t1.left : null, t2 ? t2.left : null);
    root.right = this.mergeTwoTrees(t1 ? t1.right : null, t2 ? t2.right : null);
    return root;
  }

  identicalNodes(a, b) {
    if (!a && !b) return true;
    if ((!a && b) || (a && !b) || (a && b && a.value !== b.value)) return false;
    if (a && b) {
      this.identical(a.left, b.left);
      this.identical(a.right, b.right);
      return true;
    }
  }

  balanced() {
    if (!this.root) throw new Error("the tree is empty");
    let isBalance = true;
    const traverse = (node) => {
      if (node === null) return 0;
      let leftTraverse = traverse(node.left);
      let rightTraverse = traverse(node.right);

      if (Math.abs(leftTraverse - rightTraverse) > 0) isBalance = true;
      return Math.max(leftTraverse, rightTraverse) + 1;
    };
    traverse(this.root);
    return isBalance;
  }

  mirror(node) {
    if (node === null) {
      return node;
    }
    let leftTraverse = this.mirror(node.left);
    let rightTraverse = this.mirror(node.right);

    if (node.left) {
      node.left = rightTraverse;
    }
    if (node.right) {
      node.right = leftTraverse;
    }
    return node;
  }

  minDepth(node) {
    if (!node) return 0;
    if (node.left == null && node.right === null) return 1;
    if (node.left === null) return this.minDepth(node.right) + 1;
    if (node.right === null) return this.minDepth(node.left) + 1;
    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1;
  }

  deepestRootSum() {
    if (!this.root) throw new Error("tree is empty");
    let sum = 0;
    const traverse = (node) => {
      if (!node.left && !node.right) {
        sum += node.value;
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return sum;
  }

  deepestNode() {
    if (!this.root) throw new Error("tree is empty");
    let deepestValue = null;
    const traverse = (node) => {
      if (!node.left && !node.right) {
        deepestValue = node.value;
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return deepestValue;
  }

  trim(root, L, R) {
    if (root === null) return root;
    if (root.value < L) return this.trim(root.right, L, R);
    if (root.value > R) return this.trim(root.left, L, R);
    root.right = this.trim(root.right, L, R);
    root.left = this.trim(root.left, L, R);
    return root;
  }

  rangeSum(L, R) {
    if (!this.root) return 0;
    let sum = 0;
    const traverse = (node) => {
      if (node.value > L && node.value < R) {
        sum += node.value;
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return sum;
  }

  lowestCommonAncestor(root, a, b) {
    if (!root) return null;
    if (root.value === a || root.value === b) return root.value;
    let leftTraversal = this.lowestCommonAncestor(root.left, a, b);
    let rightTraversal = this.lowestCommonAncestor(root.right, a, b);
    if (!leftTraversal) {
      return rightTraversal;
    } else if (!rightTraversal) {
      return leftTraversal;
    } else return root.value;
  }
}

let tree = new BinarySearchTree();
tree.add(20);
tree.add(31);
tree.add(11);
tree.add(3);
tree.add(9);
tree.add(62);
tree.add(57);
tree.add(72);
tree.add(14);
tree.add(90);
// ---------------------------------------------------
let tree2 = new BinarySearchTree();
tree2.add(50);
tree2.add(13);
tree2.add(2);
tree2.add(6);
tree2.add(98);
tree2.add(15);
tree2.add(19);
// ------------------------------------------------
const one = new Node(1);
const two = new Node(2);
const three = new Node(3);
const four = new Node(4);
const five = new Node(5);
const six = new Node(6);
const seven = new Node(7);
const eight = new Node(8);
const nine = new Node(9);
const ten = new Node(10);

one.right = two;
one.left = three;
two.left = four;
two.right = five;
five.right = six;
five.left = nine;
three.right = eight;
eight.right = ten;
four.left = seven;
// // ------------------------------------------------
let a = new Node(1);
let b = new Node(2);
let c = new Node(3);
let d = new Node(4);
let e = new Node(5);
let f = new Node(6);
let g = new Node(-8);
let h = new Node(8);

a.left = b;
a.right = c;
b.left = d;
c.right = e;
c.left = h;
e.right = f;
e.left = g;

// console.log(tree.preOrder());
// console.log(tree.getMax());
// console.log(tree.getMin());
// console.log(tree.breadthFirst());
// console.log(tree.fizzBuzz());
// console.log(tree.sumOfOEvenNodes());
// console.log(tree.sumOfOddNodes());
// console.log(tree.lonlyNodes());
// console.log(tree.heightOfTree(tree.root));
// console.log(tree.leavesNumber());
// console.log(tree.invert());
// console.log(tree.mergeTwoTrees(one, a));
// console.log(tree.identicalNodes(eight,e ));
// console.log(tree.balanced(tree2));
// console.log(tree.mirror(one));
// console.log(tree.minDepth(one));
// console.log(tree.deepestRootSum());
// console.log(tree.deepestNode());
// console.log(tree.trim(one,3,7));
// console.log(tree.rangeSum(1,10));
// console.log(tree.contains(14));
// console.log(tree.lowestCommonAncestor(one,4,6));

module.exports = BinarySearchTree;
