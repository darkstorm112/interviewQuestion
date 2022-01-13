// compose  组成构成
// 题目描述:实现一个 compose 函数
// 用法如下:
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
// console.dir(a)
// console.log(a(1)); // 1+4+3+2+1=11

// 我的实现 --1
function compose(...fn) {
  if(!fn.length)throw '请传入初始化函数'
  return function (num) {
    fn.forEach(item=>{
      num = item(num)
    })
    return num
  }
}

// 实现2--通过reduce实现
function compose (...fn) {
  if(!fn.length)throw '请传入初始化函数'
  return function (num) {
    return fn.reduce(
      (acc,fn)=>fn(acc),
      num
    )
  }
  // 极致简洁写法
  return num => fn.reduce((acc,f)=>f(acc),num)
}

// 作者的实现
function compose(...fn) {
  if (!fn.length) return (v) => v;
  if (fn.length === 1) return fn[0];
  return fn.reduce(
    (pre, cur) =>
      (...args) =>
        pre(cur(...args))

        // cur(pre(...args))  // TODO 这种写法也是可以的  区别 函数逆序调用（pre(cur())） =》函数顺序调用(cur(pre()))
  );
}




// 解析reduce方法
// fn1	fn2	fn3	fn4
    
//     第一次		fn1-2		
            
//     第二次			fn12-3	
            
//     第三次				fn123-4

//     解析：	最终返回的是fn123-4函数；args=[1]；先执行fn4函数，然后将fn4返回的值作为fn123函数的入参				




// 复习  返回一个promise实例
function newCompose (...fns) {

  return (value) =>{
    return fns.reduce(
      (pro, cur)=>{
        // console.log(pro)
        return pro.then(res=>{
          // console.log(cur(res))
          return cur(res)
        })
      }
      ,Promise.resolve(value))
  }
}



const b = newCompose(fn1, fn2, fn3, fn4);
// console.dir(b)
// b(1).then(res=>{console.log(res)})

// 这两种写法有啥区别呢
function newCompose (...fns) {
  return fns.reduce(
    (pre,cur)=>
      (...args)=>
        cur(pre(...args))
  )
}
function newCompose (...fns) {
  return (...args)=>{
    return fns.reduce(
      (pre,cur)=>{
        if(typeof pre === 'function'){
          return cur(pre(...args))
        }else{
          return cur(pre)
        }
      },
    )
  }
}
console.log('---',b(1))
