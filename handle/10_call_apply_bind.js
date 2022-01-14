// 题目描述:手写 call apply bind 实现

function call (fn,context,...args) {
  if(context instanceof Object){
    // 这里可能会和context上的原有属性名冲突，可以考虑使用symbol
    let f = Symbol()
    context[f] = fn
    context[f](...args)
    delete context[f]
  }else {
    fn(...args)
  }
}

function apply (fn,context,args) {
  if(context instanceof Object){
    context.fn = fn
    context.fn(args)
    delete context.fn
  }else {
    fn(args)
  }
}

function bind (fn,context) {
  return function(...args) {
    if(context instanceof Object){
      context.fn = fn
      context.fn(...args)
      delete context.fn
    }else {
      fn(...args)
    }
  }
}
let a = {
  b:2,
  c:3
}
let b = 'ss',
    c = 'dd'
function test () {
  console.log(this)
  console.log(this.c)
  console.log(...arguments)
}
// call(test,a,'ddd')
// apply(test,a,[1,2,3,4,5])
bind(test,a)('jj','kk')
console.log(a)

test.call(1,2)

// 写一写构造函数的方式
Function.prototype.newCall = function (context,...args) {
  if(context instanceof Object){
    // 这里可能会和context上的原有属性名冲突，可以考虑使用symbol
    let f = Symbol()
    context[f] = this
    let res = context[f](...args)
    delete context[f]
    return res
  }else {
    return this(...args)
  }
}

// 没怎么看懂这里为什么要这么复杂
Function.prototype.myCall = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this; //this指向调用call的函数
  // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
  return context[fn](...args);
};

// apply原理一致  只是第二个参数是传入的数组
Function.prototype.myApply = function (context, args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  // 执行函数并返回结果
  return context[fn](...args);
};

//bind实现要复杂一点  因为他考虑的情况比较多 还要涉及到参数合并(类似函数柯里化)

Function.prototype.myBind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  let _this = this;
  //  bind情况要复杂一点
  const result = function (...innerArgs) {
    // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
    // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
    // this.__proto__ === result.prototype   //this instanceof result =>true
    // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      context[fn](...[...args, ...innerArgs]);
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用contextect.create
  result.prototype = contextect.create(this.prototype);
  return result;
};

//用法如下

// function Person(name, age) {
//   console.log(name); //'我是参数传进来的name'
//   console.log(age); //'我是参数传进来的age'
//   console.log(this); //构造函数this指向实例对象
// }
// // 构造函数原型的方法
// Person.prototype.say = function() {
//   console.log(123);
// }
// let context = {
//   contextName: '我是context传进来的name',
//   contextAge: '我是context传进来的age'
// }
// // 普通函数
// function normalFun(name, age) {
//   console.log(name);   //'我是参数传进来的name'
//   console.log(age);   //'我是参数传进来的age'
//   console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的context
//   console.log(this.contextName); //'我是context传进来的name'
//   console.log(this.contextAge); //'我是context传进来的age'
// }

// 先测试作为构造函数调用
// let bindFun = Person.myBind(context, '我是参数传进来的name')
// let a = new bindFun('我是参数传进来的age')
// a.say() //123

// 再测试作为普通函数调用
// let bindFun = normalFun.myBind(context, '我是参数传进来的name')
//  bindFun('我是参数传进来的age')
