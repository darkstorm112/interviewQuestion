// 选择排序
// 选择排序（Selection sort）是一种简单直观的排序算法。它的工作原理是：
// 第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，
// 然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。
// 以此类推，直到全部待排序的数据元素的个数为零。选择排序是不稳定的排序方法。

// 实现效果
function selectSort (arr) {

  let len = arr.length
  for (let i=0;i<len;i++) {
    for(let j=i+1;j<len;j++) {
      if(arr[i]>arr[j]){
        [arr[i],arr[j]] = [arr[j],arr[i]]
      }
    }
  }
  return arr
}

let arr = [4,1,3,9,2,8,6,4]
// console.log(selectSort(arr))

// console.log(selectSort([3, 6, 2, 4, 1]));


// 这种写法性能更高
// 原因一次循环最多只操作一次
// 数组的写入操作
function selectSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex;
  // i 是当前排序区间的起点
  for (let i = 0; i < len - 1; i++) {
    // 初始化 minIndex 为当前区间第一个元素
    minIndex = i;
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for (let j = i; j < len; j++) {
      // 若 j 处的数据项比当前最小值还要小，则更新最小值索引为 j
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
// console.log(quickSort([3, 6, 2, 4, 1]));




// test
function test (arr) {
  let len = arr.length
  for (let i=0; i<len-1; i++) {
    let min = i
    for (let j=i+1; j<len; j++) {
      if(arr[min]>arr[j]) {
        min = j
      }
    }
    if(min !== i) {
      [arr[i],arr[min]] = [arr[min],arr[i]]
    }
  }

  return arr
}

console.log(test(arr))

console.log(test([3, 6, 2, 4, 1]));
