// new 操作符
// 题目描述:手写 new 操作符实现

// 用法如下：
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.say = function() {
//   console.log(this.age);
// };
// let p1 = myNew(Person, "lihua", 18);
// console.log(p1.name);
// console.log(p1);
// p1.say();

function myNew (fn, ...args) {
  // 方式一
  // let obj = {}
  // obj.__proto__ = fn.prototype

  // 方拾二
  let obj = Object.create(fn.prototype)
  // 这两种方式达到的效果是一样的，但是第二种方式更简洁

  let res = fn.call(obj,...args)

  // 这一个操作是用作兼容吧 TODO=>2022/01/13
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res
  }
  return obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function() {
  console.log(this.age)
}
// let p1 = myNew(Person, "lihua", 18)
// console.log(p1.name)
// console.log(p1)
// p1.say()


function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  // 这一步的操作是什么原理
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}
// 用法如下：
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function() {
  console.log(this.age)
}
let p1 = myNew(Person, "lihua", 18)
console.log(p1.name)
console.log(p1)
p1.say()

