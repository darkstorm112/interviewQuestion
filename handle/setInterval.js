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
    timer,  // 这样返回已经固定了 使用函数返回形成闭包=》 栗子：下面两种写法能够拿到最新的定时器
    timeId:function(){return timer},
    clear: ()=>{
      clearTimeout(timer)
    }
  }
}
function clearTime (timer) {
  clearTimeout(timer.timeId())
  // timer.clear()
  // clearTimeout(timer.timer)
}

let a = myTimeout(()=>{
  console.log('------------',a.timer,a.timeId())
},1000)

setTimeout(()=>{
  clearTime(a)
},5020)

// setInterval(()=>{
//   console.log(a)
// },1100)
// setTimeout (()=>{
//   console.log(a.timer,'---------')
// },2000)

