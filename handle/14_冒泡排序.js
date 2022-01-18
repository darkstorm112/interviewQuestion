// 冒泡排序--时间复杂度 n^2
// 题目描述:实现一个冒泡排序

function paopao (arr) {
  for(let i=0,len=arr.length;i<len;i++){
    for(let j=0,len=arr.length;j<len-i-1;j++){
      if(arr[j]>arr[j+1]){
        // let temp = arr[j]
        // arr[j] = arr[j+1]
        // arr[j+1] = temp
        // 结构
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr
}

let arr = [4,1,3,9,2,8,6,4]

console.log(paopao(arr))
console.log(arr)

function bubbleSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 外层循环用于控制从头到尾的比较+交换到底有多少轮
  for (let i = 0; i < len; i++) {
    // 内层循环用于完成每一轮遍历过程中的重复比较+交换
    for (let j = 0; j < len - 1; j++) {
      // 若相邻元素前面的数比后面的大
      if (arr[j] > arr[j + 1]) {
        // 交换两者
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // 返回数组
  return arr;
}
console.log(bubbleSort([3, 6, 2, 4, 1]));

// 复习下冒泡
function bubble (arr) {
  let len = arr.length
  for(let i=0; i<len-1; i++) {
    for(let j=0; j<len-i; j++) {
      if(arr[j]>arr[j+1]) {
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr
}
console.log(bubble([3, 6, 2, 4, 1]))

