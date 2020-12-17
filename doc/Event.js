class myEvent {
  constructor(maxlength = 10) {
    this.eventList = {};
    this.maxlength = maxlength;
  }

  on(name, fn) {
    this.eventList[name] || (this.eventList[name] = []);
    this.eventList[name].push(fn);
  }

  emit(name) {
    this.eventList[name].forEach((fn) => {
      fn.apply(this, [].slice.call(arguments, 1));
    });
  }
}

var a = new myEvent();
a.on("fire", function (name) {
  console.log(name);
});
a.emit("fire", 1);
