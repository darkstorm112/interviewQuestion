// setinterval 模拟实现 settimeout(带清除定时器的版本)

function myTimeout  (cb, time=0) {
  let timer = setInterval(() => {
    cb()
    clearInterval(timer)
  }, time)
  return {
    cancel:()=>{
      clearInterval(timer)
    }
  }
}

let a = myTimeout(()=>{
  console.log(1);
},1000)
a.cancel()


// 非本人实现（掘金上面看到的）
const mySetTimeout = (fn, time) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, time);
};
// mySetTimeout(()=>{
//   console.log(1);
// },1000)

// 扩展思考：为什么要用 settimeout 模拟实现 setinterval？setinterval 的缺陷是什么？
