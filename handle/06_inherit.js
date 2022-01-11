// 寄生组合继承
// 题目描述:实现一个你认为不错的 js 继承方式

// 考察 原型链
function Parent (name) {
  this.name = name
  this.getName = ()=>{
    console.log(this.name)
  }
}
Parent.prototype.test = function () {
  console.log(this.name)
}

function Child (name,age) {
  Parent.call(this,name)
  this.age = age
}
// Child.prototype = new Parent()     // 方法一  会多出来一些实例的东西
// Child.prototype = new Parent().__proto__  // 方法二 会污染父对象的原型
Child.prototype = Object.create(Parent.prototype)  // 解决上面的两个问题

Child.prototype.constructor = Child

let c = new Child('小明',18)
c.test()
console.log(c)



// 原始答案===原型的控制还是很棒的 
function Parent(name) {
  this.name = name;
  this.say = () => {
    console.log(111);
  };
}
Parent.prototype.play = () => {
  console.log(222);
};
function Children(name) {
  Parent.call(this);
  this.name = name;
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;
// let child = new Children("111");
// // console.log(child.name);
// // child.say();
// // child.play();
