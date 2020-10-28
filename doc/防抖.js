/**
 * 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定时间到来之前，又触发了事件，就重新开始延时
 * @param {*} fn 
 * @param {*} delay 
 */
function debounce(fn, delay) {
  var timer = null;
  return function() {
    if (timer !== null) {
      clearTimeout(timer);
    } 
    timer = setTimeout(fn, delay);
  }
}
// 处理函数
function handle() {
  console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));