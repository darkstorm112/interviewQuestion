// 都是指针对基础数据
// 数组去重
// Set相关用法 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set
function noRepeat (arr) {
  return [...new Set(arr)]
}
// 去重加排序
function noRepeat (arr) {
  let obj = {}
  arr.forEach(i=>obj[i]=i)
  return Object.values(obj)
}

let arr = [11,2,4,9,'22','sjdh',2,4]
console.log(noRepeat(arr))

// 数组扁平化 最简单实用的
function  flat (arr) {
  return arr.flat(Infinity)
}
// console.log(flat([[[[1]]],2,3,[[[[[[8]]]]]]]))

// 先用for循环实现下
function flat (arr) {
  let newArr = []
  function fn (arr) {
    if(arr instanceof Array){
      arr.forEach(fn)
    }else{
      return newArr.push(arr)
    }
  }
  fn(arr)
  return newArr
}

console.log(flat([[[[1]]],2,3,[[[[[[8]]]]]]]))
console.log(flat([1, 2, [1, [2, 3, [4, 5, [6]]]]]));


// 用reduce方法实现
function flat (arr) {
  return arr.reduce(
    (pre,cur)=>{  
      if(cur instanceof Array){
        pre = [...pre,...flat(cur)]
      }else{
        pre.push(cur)
      }
      return pre
    },
    []
  )
}

// 这个思路===运用扩展运算符来实现  还是很巧妙的
function flatter(arr) {
  if (!arr.length) return;
  return arr.reduce(
    (pre, cur) =>
      Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur],
    []
  );
}
console.log(flat([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

