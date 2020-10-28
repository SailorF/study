// 组合继承
// 属性的继承使用借用构造函数方法，方法的继承使用原型链技术，
// 即解决了引用值类型共享的问题，又实现了方法的共享，但是子类的原型对象中还存在父类实例对象的实例属性
function Father(name,age) {
  this.name = name
  this.age = age
  // 引用类型的实例属性
  this.names = []
}

Father.prototype.getNames = function() {
  return this.names
}

function Son(name, age, job) {
  // 借用构造函数
  // this执行的过程中也会创建this.names实例属性
  Father.call(this, name, age)
  this.job = job
}

// 创建原型链
// 需要注意此时Son类的原型对象中还是有Father类的实例对象的属性和方法
Son.prototype = new Father()
// 调整Son原型对象的constructor指向
Son.prototype.constructor = Son

let son = new Son('ziyi2', 28, 'web')
son.names.push('ziyi2')
// { age:28 job:"web" name:"ziyi2" names:["ziyi2"] }
console.log(son)
let son1 = new Son('ziyi2', 28, 'web')
// [] son.name和son1.names是不同的指针，指向不同的物理空间
console.log(son1.names)


// 借用构造函数
// 解决了继承中的引用值类型共享物理空间的问题，但是没法实现方法的共享
function Father() {
  this.names = ['ziyi','ziyi1', 'ziyi2']
}
function Son() {
  // 使用new关键字执行的构造函数this指向实例对象
  // 注意如果不用new关键字执行this指向全局对象window
  // 这里的Father类当做一个普通的执行函数
  // 此时只是让Son类的实例对象创建了和Father类实例对象一样的实例属性和实例方法
  Father.call(this)

  // Father.call(this)类似于在Son构造函数中执行
  // this.names = ['ziyi','ziyi1', 'ziyi2']
}

let son = new Son()
son.names.push('ziyi3')
// ["ziyi", "ziyi1", "ziyi2", "ziyi3"]
console.log(son.names)

let son1 = new Son()
// ['ziyi','ziyi1', 'ziyi2']
console.log(son1.names)

function objectCreate(o) {
  function F() {}
  F.prototype = o;

  return new F();
}

function inheritPrototypev(SubType,SuperType) {
  var prototype = objectCreate(SuperType.prototype);
  sub.prototype.constructor = sub;
  SubType.prototype = prototype;
}