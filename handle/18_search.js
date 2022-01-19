// 二分查找--时间复杂度 log2(n)
// 题目描述:如何确定一个数在一个有序数组中的位置

function search (target,arr) {
  if(!arr.length)throw '数组不能为空'
  let targetIdx = 0
  function computed (type,num) {
    switch (type) {
      case 'add':
        targetIdx += num
        break
      case 'sub':
        targetIdx -= num
        break
    }
    return targetIdx
  }
  function innerSearch (target,arr,type) {
    console.log(arr)
    console.log(targetIdx)
    if(arr.length===1&&arr[0] === target){
      return computed(type,1)
    }else if(arr.length===1){
      return -1
    }
    let idx = Math.floor(arr.length/2)
    computed(type,idx)
    if(target===arr[idx])return targetIdx
  
    if(target<arr[idx])return innerSearch(target,arr.slice(0,idx),'sub')

    if(target>arr[idx])return innerSearch(target,arr.slice(idx),'add')
  }
  return innerSearch(target,arr,'add')
}

const dataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const position = search(8,dataArr,)
console.log(position)
if (position !== -1) {
  console.log(`目标元素在数组中的位置:${position}`);
} else {
  console.log("目标元素不在数组中");
}
