function dfs(node, nodeList = []) {
  if (node) {
    nodeList.push(node);
    var children = node.children;
    for(let i = 0; i < children.length; i++) {
      dfs(children[i], nodeList);
    }
  }
  return nodeList
}


var root = document.getElementById('root');
var list = dfs(root)
console.log(list);