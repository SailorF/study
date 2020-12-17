/**
 * 当持续触发事件时，保证在一定时间内只调用一次事件处理函数
 * 意思就是说，假设一个用户一直触发这个函数，且每次触发小于既定值，函数节流会每隔这个时间调用一次
 * @param {*} fn
 * @param {*} time
 */
function throttle(fn, delay) {
  let preTime = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    var now = Date.now();
    if (now - preTime > delay) {
      fn.apply(context, args);
      preTime = Date.now();
    }
  };
}

function handle() {
  console.log(Math.random());
}
window.addEventListener("scroll", throttle(handle, 1000));
