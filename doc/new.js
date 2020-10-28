function myNew(fn) {

  const target = Object.create(fn.prototype);
  const args = [].slice.call(arguments, 1);
  const newFn = fn.apply(target, args)
  if (typeof newFn === 'function') {
    return newFn;
  }
  return target;
}

function myCall(context, ...args) {
  const fn = Symbol();
  context[fn] = this;
  const newFn = context[fn](...args);
  delete context[fn];
  return newFn;
}

function myBind(context, args) {
  const self = this;
  return function() {
    self.apply(context, args)
  }
}