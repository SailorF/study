// 继续线程占用
setInterval(function () {
  var n = 0;
  while (n++ < 1000000000);
}, 0);

// 倒计时
var interval = 1000,
  ms = 50000, // 从服务器和活动开始时间计算出的时间差，这里测试用50000ms
  timer = null,
  start = new Date().getTime(),
  count = 0;

if (ms >= 0) {
  timer = setTimeout(countDownStart, interval);
}

function countDownStart() {
  var offset, nextTime;
  count++;
  offset = new Date().getTime() - (start + count * interval);
  nextTime = interval - offset;

  if (nextTime < 0) {
    nextTime = 0;
  }

  ms -= interval;

  console.log(
    "误差: " +
      offset +
      "ms, 下一次执行: " +
      nextTime +
      "ms后，离活动开始还有: " +
      ms +
      "ms"
  );

  if (ms < 0) {
    clearTimeout(timer);
  } else {
    timer = setTimeout(countDownStart, nextTime);
  }
}
