const timer = null;
let lastTime = null;
function updateCountDownTimer(timestamp) {
    lastTime = lastTime || timestamp;
    const tickInterval = timestamp - lastTime;
    if (tickInterval >= 1000) {
        const node = document.querySelector('#root');
        node.innerHTML = new Date().toISOString();
       lastTime = timestamp = tickInterval - 1000;
    }
    requestAnimationFrame(updateCountDownTimer.bind(this))
}
if (!timer) [
  timer = requestAnimationFrame(updateCountDownTimer.bind(this))
]