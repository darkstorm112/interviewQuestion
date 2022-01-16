// 柯里化
// 题目描述:柯里化（Currying），又称部分求值（Partial Evaluation），
// 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数而且返回结果的新函数的技术。
// 核心思想是把多参数传入的函数拆成单参数（或部分）函数，
// 内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数。

// 简单版
// function currying (fn,...args) {
//   return (...reset)=>{
//     return fn(...args,...reset)
//   }
// }

// // 用法如下：
// const add = (a, b, c) => a + b + c;
// const a = currying(add, 1);
// console.log(a(2,3))


// 另外一种写法   length表示形参的个数
function currying(fn, ...args) {
  const length = fn.length;
  let allArgs = [...args];
  const res = (...newArgs) => {
    allArgs = [...allArgs, ...newArgs];
    if (allArgs.length === length) {
      return fn(...allArgs);
    } else {
      return res;
    }
  };
  return res;
}

// 用法如下：
const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2)(3))


function currying (fn,...args) {
  const len = fn.length
  let realargs = [...args]
  const res =  (...newargs) => {
    realargs = [...realargs,...newargs]
    if(len===realargs.length)return fn(...realargs)
    return res
  }
  return res
}






















// test
function curring (fn,...args) {

  return function newfn (...newargs) {
    args = [...args,...newargs]
    if(args.length===fn.length){
      return fn(...args)
    }else{
      return newfn
    }
  }
}