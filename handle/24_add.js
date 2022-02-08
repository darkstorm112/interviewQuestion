// 实现一个 add 方法

// 题目描述:实现一个 add 方法 使计算结果能够满足如下预期：
//  add(1)(2)(3)()=6 add(1,2,3)(4)()=10
// 其实就是考函数柯里化

function add (...args) {
  const res = (...newArgs)=>{
    args = [...args,...newArgs]
    if(newArgs.length)return res
    return args.reduce((pre,curent)=>pre+curent)
  }
  return res
}
console.log(add(1)(2)(3)())   //=6 
console.log(add(1,2,3)(4)())  //=10

// 
function add(...args) {
  let allArgs = [...args];
  function fn(...newArgs) {
    allArgs = [...allArgs, ...newArgs];
    return fn;
  }
  fn.toString = function () {
    if (!allArgs.length) {
      return;
    }
    return allArgs.reduce((sum, cur) => sum + cur);
  };
  return fn;
}





























// test
function test (...args) {

  return ()=>{

  }
}