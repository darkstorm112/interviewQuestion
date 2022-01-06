// mdn中看到的有意思的例子
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// 插一个mdn上面看到的比较有意思的 栗子
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() 没有初始值
[ { x: 2 }, { x: 22 }, { x: 42 } ].reduce( maxCallback ); // NaN
[ { x: 2 }, { x: 22 }            ].reduce( maxCallback ); // 22
[ { x: 2 }                       ].reduce( maxCallback ); // { x: 2 }
// [                                ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行  mdn给的方案
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );


// 改进
var maxCallback = ( acc, cur ) => Math.max( acc.x||acc, cur.x );  //自己改进的  比较有意思




// 按顺序执行promise
/**
 * Runs promises from array of functions that can return promises
 * in chained manner
 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
 function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
 return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10)
  .then(console.log);   // 1200



// 管道型函数
// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// Function composition enabling pipe functionality
const pipe = (...functions) => input => functions.reduce(
    (acc, fn) => fn(acc),
    input
);
// TODO  改一下上面的函数 改成比较容易看懂的形式
const myPipe = function(...functions) {
  return function(...args) {
    return functions.reduce(
      (acc, fn) => fn(acc),
      ...args
    )
  } 
}

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240


const multiply61 = myPipe(double, triple);
const multiply91 = myPipe(triple, triple);
const multiply161 = myPipe(quadruple, quadruple);
const multiply241 = myPipe(double, triple, quadruple);

// Usage
console.log(multiply61(6)); // 36
console.log(multiply91(9)); // 81
console.log(multiply161(16)); // 256
console.log(multiply241(10)); // 240
