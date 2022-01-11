// 防抖函数的封装
function debounce (fn,ms) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this,...args),ms)
  }
}

// 节流
function throttle (fn,ms) {
  let timer = null
  return function(...args){
    if(timer)return
    timer = setTimeout(()=>{
      fn.call(this,...args)
      timer = null
    },ms)
  }
}

window.addEventListener(
  "scroll",
  debounce(() => {
    console.log(111);
  }, 1000)
);

window.addEventListener(
  "scroll",
  throttle(() => {
    console.log(2222);
  }, 1000)
);