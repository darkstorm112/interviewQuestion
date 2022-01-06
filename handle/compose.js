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
console.dir(a)
console.log(a(1)); // 1+4+3+2+1=11

// 我的实现
function compose(...fn) {
  if(!fn.length)throw '请传入初始化函数'
  return function (num) {
    fn.forEach(item=>{
      num = item(num)
    })
    return num
  }
}

// 作者的实现
function compose(...fn) {
  if (!fn.length) return (v) => v;
  if (fn.length === 1) return fn[0];
  return fn.reduce(
    (pre, cur) =>
      (...args) =>
        pre(cur(...args))
  );
}

// 解析reduce方法
    // fn1	fn2	fn3	fn4
				
    //     第一次		fn1-2		
                
    //     第二次			fn12-3	
                
    //     第三次				fn123-4
    
    //     解析：	最终返回的是fn123-4函数；args=[1]；先执行fn4函数，然后将fn4返回的值作为fn123函数的入参				
    
    


// 插一个mdn上面看到的比较有意思的 栗子
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() 没有初始值
[ { x: 2 }, { x: 22 }, { x: 42 } ].reduce( maxCallback ); // NaN
[ { x: 2 }, { x: 22 }            ].reduce( maxCallback ); // 22
[ { x: 2 }                       ].reduce( maxCallback ); // { x: 2 }
[                                ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行  mdn给的方案
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );


// 改进
var maxCallback = ( acc, cur ) => Math.max( acc.x||acc, cur.x );  //自己改进的  比较有意思

