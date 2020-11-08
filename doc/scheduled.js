const GLOBAL_TIME_OUT = 25;

function array2list(ary) {
  if (ary.length === 0) {
    return null;
  }
  var nodes = [];

  for (var i = 0; i < ary.length; i++) {
    var node = {};
    node.value = ary[i];
    node.next = null;
    nodes.push(node);
  }

  for (var i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  return nodes[0];
}
let t0 = performance.now();
const time0 = new Date().getTime();
let index = 0;
function scheduled() {
  while (queue.next !== null) {
    let t1 = performance.now();
    const difftime = t1 - t0;
    if (difftime > 25) {
      t0 = t1;
      console.log("超时第", ++index, " 次");
      break;
    }
    queue = queue.next;
  }
  if (queue.next) {
    requestIdleCallback(scheduled);
  } else {
    console.log("我已经没了", new Date().getTime() - time0, "ms");
  }
}
console.time("queue");
let queue = array2list(new Array(10000000).fill(0));
console.timeEnd("queue");
requestIdleCallback(scheduled);
