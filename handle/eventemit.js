// 发布订阅模式
// 题目描述:实现一个发布订阅模式拥有 on emit once off 方法
// 解析：
// 实例有on/emit/once/off方法
// 1.on(event,fn):监听event事件,事件触发时调用fn函数;
// 2.once(event,fn):为指定事件注册一个单次监听器,单次监听器最多只触发一次,触发后立即解除监听器;
// 3.emit(event,arg1,arg2,arg3…):触发event事件,并把参数arg1,arg2,arg3…传给事件处理函数;
// 4.off(event,fn):停止监听某个事件。
// 所以在原型链上先写上这些方法
function EventEmitter () {
  this.events = []
  this.eventfns = []
  this.offevents = []
}
EventEmitter.prototype.on = function (event,fn) {
  // 判断是否被停
  if(this.isoff(event))return

  this.eventfns.push({event,fn})
  this.filterEvent(event,'events').forEach(item => {
    fn.call(this,...item.args)
  })
}
EventEmitter.prototype.once = function (event,fn) {
  // this.oncefns.push[{event,fn}]
  this.on(event,(...args)=>{
    fn.call(this,...args)
    this.off(event)
  })
}
EventEmitter.prototype.emit = function (event,...args) {
  this.events.push({event,args})
  // 判断是否被停
  if(this.isoff(event))return
  this.filterEvent(event,'eventfns').forEach(item => {
    item.fn.call(this,...args)
  })
}
// 理解错了，尴尬
EventEmitter.prototype.off = function (event,fn) {
  this.offevents.push(event)
  if(typeof fn === 'function')fn()
  // fn&&fn()
}
EventEmitter.prototype.isoff = function (event) {
  return this.offevents.find(i=>i===event)
}
EventEmitter.prototype.filterEvent = function (event,type) {
  // let arr = []
  // switch (type) {
  //   case 'on':
  //     arr = this.eventfns.filter(item=>item.event===event)
  //     break
  //   case 'emit':
  //     arr = this.events.filter(item=>item.event===event)
  // }
  // return arr

  // 如果type规定传入值为 events/eventfns
  return this[type].filter(item=>item.event===event)
}

// let e = new EventEmitter()
// e.off('test')

// e.on('test',(a,b)=>{
//   console.log(a,b,'---------------')
// })
// e.on('test',(a,b)=>{
//   console.log(a,b,'++++++++++')
// })
// e.emit('test','测试','sj','000')
// e.emit('test1','测试','sj','000')
// e.emit('test2','测试','sj','000')
// e.on('test1',(a,b)=>{
//   console.log(a,b,'once444444')
// })
// e.once('test1',(a,b)=>{
//   console.log(a,b,'once1111111111')
// })
// e.once('test1',(a,b)=>{
//   console.log(a,b,'once222222222')
// })
// e.on('test1',(a,b)=>{
//   console.log(a,b,'on33333333')
// })
// e.off('test2')

// e.on('test',(a,b)=>{
//   console.log(a,b,'777777777')
// })
// e.on('test2',(a,b)=>{
//   console.log(a,b,'111777777777')
// })

// 总结：理解上面有些偏差，但是功能实现没啥大问题
// 所谓发布订阅，前提是要先订阅-》然后才能接收到发布的信息
// 不能出现这种情况 先发布-》后订阅  也能收到消息（这种思维是错误的）

// 修改 用对象的形式是比较合适的==>2.0
function EventEmitter () {
  this.events = {}
}

EventEmitter.prototype.on = function (type,fn) {
  if(!this.events[type]){
    this.events[type] = [fn]
  }else{
    this.events[type].push(fn)
  }
}
EventEmitter.prototype.once = function (type,fn) {
  function newfn (...args) {
    fn.call(this,...args)
    this.off(type,newfn)
  }
  this.on(type,newfn)
}
EventEmitter.prototype.emit = function (type,...args) {
  if(!this.events[type])return
  this.events[type].forEach(item=>item.call(this, ...args))
}
EventEmitter.prototype.off = function (type,fn) {
  if(!this.events[type])return
  this.events[type] = this.events[type].filter(i=>i!==fn)
}

// 使用如下
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);
event.on("click", ()=>{
  console.log('222')
});


event.emit("click", 1, 2, 3, 4);
event.emit("click", 1, 2, 3, 4,5);


event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");



// class写法
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 实现订阅
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack];
    } else {
      this.events[type].push(callBack);
    }
  }
  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack;
    });
  }
  // 只执行一次订阅事件
  once(type, callBack) {
    function fn() {
      callBack();
      this.off(type, fn);
    }
    this.on(type, fn);
  }
  // 触发事件
  emit(type, ...rest) {
    this.events[type] &&
      this.events[type].forEach((fn) => fn.apply(this, rest));
  }
}
// 使用如下
// const event = new EventEmitter();

// const handle = (...rest) => {
//   console.log(rest);
// };

// event.on("click", handle);

// event.emit("click", 1, 2, 3, 4);

// event.off("click", handle);

// event.emit("click", 1, 2);

// event.once("dbClick", () => {
//   console.log(123456);
// });
// event.emit("dbClick");
// event.emit("dbClick");

