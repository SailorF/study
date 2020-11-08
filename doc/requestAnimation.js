var start = null;
var element = document.getElementById("SomeElementYouWantToAnimate");
element.style.position = "absolute";

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  // element.style.left = Math.min(progress / 100, 3000) + 'px';
  document.body.innerHTML = new Date().toISOString();
  if (progress < 100000000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
// function coutDown(timestamp) {
//   if (!start) start = timestamp;
//   setInterval(() => {
//     document.body.innerHTML = new Date().toISOString();
//   }, 1000);
// }
// window.requestAnimationFrame(coutDown);

// var left = 0;
// var timer = setInterval(() => {
//   // document.body.innerHTML = new Date().toISOString();
//   left += 10;
//   if (left >= 1000) {
//     clearInterval(timer)
//   }
//   element.style.left = left + 'px';
// }, 1000);

function bigLoop() {
  console.time("loop start");
  for (let i = 0; i < 10; i++) {
    forLoop();
  }
  console.timeEnd("loop start");
}

function forLoop() {
  // time used: 100+ms;
  let arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr.push(i);
  }
  while (arr.length) {
    arr.pop();
  }
}
// bigLoop()
