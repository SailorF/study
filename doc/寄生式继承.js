// 继承o原型对象的方法和属性
// 需要注意o的引用类型属性在F实例对象中共享同一个物理空间（需要避免使用引用类型属性值）
// 当然o的方法在F实例对象中共享
function objectCreate(o) {
  // F类没有实例方法和实例属性
  function F() {}
  F.prototype = o
  // o是F类的原型对象
  // 返回F类的实例对象
  // new F().__proto__ = o
  // F类实例对象共享o的属性和方法
  // true
  console.log(new F().__proto__ === o)
  return new F()
}


// SubClass实现对于SuperClass原型对象的方法和属性的继承
function inheritPrototype(SubClass, SuperClass) {
  // prototype是一个实例对象
  // prototype不是SuperClass的实例对象而是另一个类F类的实例对象
  // SuperClass类和objectCreate函数中的F类的原型对象都是SuperClass.prototype
  // 这里没有调用SuperClass构造函数
  // prototype继承了SuperClass类的原型对象的方法和属性
  var prototype = objectCreate(SuperClass.prototype)
  // 使prototype实例对象的constructor属性指向SubClass子类
  // 因为重写SuperClass的原型对象时会修改constructor属性
  // SubClass.prototype.constructor = SubClass
  prototype.constructor = SubClass
  // 使SubClass类的原型对象指向prototype实例对象
  // 类似于SubClass.prototype = new SuperClass()
  // 只是这里是SubClass.prototype = new F()
  // F类本身没有实例方法和实例属性
  SubClass.prototype = prototype
}



function Father(name, age) {
  this.name = name
  this.age = age
}

Father.prototype.getName = function() {
  return this.name
}

function Son1(name, age, job) {
  // 借用构造函数
  Father.apply(this, arguments)
  this.job = job
}

function Son2(name, age, job) {
  // 借用构造函数
  Father.apply(this, arguments)
  this.job = job
}



// 组合继承的写法
Son1.prototype = new Father()
Son1.prototype.constructor = Son1
// age : undefined
// constructor : ƒ Son1(name, age, job)
// name : undefined
// __proto__ : { getName:ƒ () constructor : ƒ Father(name, age) }
console.log(Son1.prototype)

// 寄生组合式继承的写法
// 借用构造函数实现构造函数的方法和属性的继承
// inheritPrototype函数实现原型对象的方法和属性的继承
inheritPrototype(Son2, Father)
// constructor : ƒ Son2(name, age, job)
// __proto__ : { getName:ƒ () constructor : ƒ Father(name, age) }
console.log(Son2.prototype)


var son1 = new Son1('ziyi2', 28, 'web')
var son2 = new Son2('ziyi3', 28, 'hardware')
son1.getName()
son2.getName()