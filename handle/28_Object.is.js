// Object.is 实现
// Object.is不会转换被比较的两个值的类型，这点和===更为相似，他们之间也存在一些区别。
//     1. NaN在===中是不相等的，而在Object.is中是相等的
//     2. +0和-0在===中是相等的，而在Object.is中是不相等的

Object.is = function(x, y) {
  // 判断NaN
  if(typeof x === 'number'&&isNaN(x))return typeof y === 'number'&&isNaN(y)

  // 判断+0和-0
  if(x===0&&y===0)return (1/x) === (1/y)
  return x===y
}

let a = {}
let b = a
console.log(Object.is(a,b))
console.log(Object.is(1,2))
console.log(Object.is(0,-0))
console.log(Object.is(+0,0))
console.log(Object.is(NaN,'JJ'))


Object.is = function (x, y) {
  if (x === y) {
    // 当前情况下，只有一种情况是特殊的，即 +0 -0
    // 如果 x !== 0，则返回true
    // 如果 x === 0，则需要判断+0和-0，则可以直接使用 1/+0 === Infinity 和 1/-0 === -Infinity来进行判断
    return x !== 0 || 1 / x === 1 / y;
  }

  // x !== y 的情况下，只需要判断是否为NaN，如果x!==x，则说明x是NaN，同理y也一样
  // x和y同时为NaN时，返回true
  return x !== x && y !== y;
};




