// 都是指针对基础数据
// 数组去重
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

// 