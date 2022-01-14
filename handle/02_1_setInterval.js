// settimeout 模拟实现 setinterval(带清除定时器的版本)
// setInterval(()=>{

// },2000)

// 需求分析
// 创建一个函数，接收两个入参
// 参数一是一个回调函数，参数二是一个数字
// 清除定时器待会考虑

// 成啦  想办法加上定时器
// function mySetinterval (cb, time=0) {
//   setTimeout(()=>{
//     cb()
//     mySetinterval(cb,time)
//   },time)
// }

// mySetinterval(()=>{
//   console.log('测试')
// },1000)

// 加定时器   失败了
// function mySetinterval (cb, time=0) {
//   let timer = setTimeout(()=>{
//     if(!timer)return null
//     cb()
//     return mySetinterval(cb,time)
//   },time)
//   return timer
// }

// function clearmyTimeout (timer) {
//   return clearTimeout(timer)
// }

// let timer = mySetinterval(()=>{
//   console.log('测试')
// },1000)

// setTimeout(()=>{
//   clearmyTimeout(timer)
//   console.log('执行了')
// },5100)

// 看一下settimeout mdn


// 作者实现  
function mySettimeout(fn, t) {
  let timer = null;
  function interval() {
    fn();
    timer = setTimeout(interval, t);
  }
  interval();
  return {
    cancel:()=>{
      clearTimeout(timer)
    }
  }
}

// let a = mySettimeout(()=>{
//   console.log(111);
// },1000)
// let b=mySettimeout(() => {
//   console.log(222)
// }, 1000)

// setTimeout(()=>{
//   a.cancel()
// },5000)



// setInterval(() => {
//   console.log('hello')
// }, 1000)


// 看了之后 重新写一下
function myTimeout (cb, time=0) {
  let timer = null
  function interval () {
    timer = setTimeout(()=>{
      cb()
      interval()
    }, time);
  }
  interval()
  return {
    timer,  // 这样返回已经固定了(错误的案例) 使用函数返回形成闭包=》 栗子：下面两种写法能够拿到最新的定时器
    timeId:function(){return timer},  // 可用
    clear: ()=>{                      // 可用
      clearTimeout(timer)
    }
  }
}
function clearTime (timer) {
  clearTimeout(timer.timeId())
  // timer.clear()
}

// let a = myTimeout(()=>{
//   console.log('------------',a.timer,a.timeId())
// },1000)

// setTimeout(()=>{
//   clearTime(a)
// },5020)

// setInterval(()=>{
//   console.log(a)
// },1100)
// setTimeout (()=>{
//   console.log(a.timer,'---------')
// },2000)




// 在知乎上面看到一种构造函数的写法，感觉也是很不错
// 其实还可以继续封装的，在初始化的时候就可以传入函数 和 时间也是可以的
function Interval () {
  this.fn = null
  this.timeId = null
}

Interval.prototype.repeat = function(fn,time=0) {
  if(this.fn===null){
    this.fn = fn
  }
  if(this.fn !== fn)return
  // clearTimeout(this.timeId)
  // console.log(this.timeId)
  this.timeId = setTimeout(() => {
    fn()
    this.repeat(fn,time)
  }, time)
}
Interval.prototype.clear = function(){
  console.log('会执行吗')
  console.log(this.timeId)
  clearTimeout(this.timeId)
}

const a = () => console.log('a')

const b = () => console.log('b')

const good = new Interval()

good.repeat(a, 1000)
// timer.repeat(b, 1000) // 不会定时执行 b

// 生效
// setTimeout(()=>{
//   console.log(good.timeId,'-------------------')
//   good.clear()
// },5051)

// 为啥上面的写法可以，下面这种写法不生效？=>函数中this指向undefined/window
setTimeout(good.clear,5051) // 不生效
setTimeout(good.clear.bind(good),5051)  // 生效




function test (fn,ms=300) {
  let timer = null
  function Interval () {
    timer = setTimeout(()=>{
      fn.call(this)
      Interval()
    },ms)
  }
  Interval()
  return {
    clean:()=>{
      clearTimeout(timer)
    }
  }
}

