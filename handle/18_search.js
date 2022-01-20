// 二分查找--时间复杂度 log2(n)
// 题目描述:如何确定一个数在一个有序数组中的位置


// 写法有问题  那里出了故障？TODO=>22.01.20  递归的写法是没啥问题的，计算的时候有点问题
// function search (target,arr) {
//   if(!arr.length)throw '数组不能为空'
//   let targetIdx = 0
//   function computed (type,num) {
//     switch (type) {
//       case 'add':
//         targetIdx += num
//         break
//       case 'sub':
//         targetIdx -= num
//         break
//     }
//     return targetIdx
//   }
//   function innerSearch (target,arr,type) {
//     console.log(arr)
//     console.log(targetIdx)
//     if(arr.length===1&&arr[0] === target){
//       return computed(type,1)
//     }else if(arr.length===1){
//       return -1
//     }
//     let idx = Math.floor(arr.length/2)
//     computed(type,idx+1)
//     if(target===arr[idx])return targetIdx
  
//     if(target<arr[idx])return innerSearch(target,arr.slice(0,idx),'sub')

//     if(target>arr[idx])return innerSearch(target,arr.slice(idx+1),'add')
//   }
//   let res =  innerSearch(target,arr,'add')
//   return res===-1?-1:res-1
// }

// const dataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const position = search(6,dataArr,)
// console.log(position)
// if (position !== -1) {
//   console.log(`目标元素在数组中的位置:${position}`);
// } else {
//   console.log("目标元素不在数组中");
// }


// 看看别人怎么写的
function search(arr, target, start, end) {
  let targetIndex = -1;

  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    targetIndex = mid;
    return targetIndex;
  }

  if (start >= end) {
    return targetIndex;
  }

  if (arr[mid] < target) {
    return search(arr, target, mid + 1, end);
  } else {
    return search(arr, target, start, mid - 1);
  }
}
// const dataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const position = search(dataArr, 6, 0, dataArr.length - 1);
// if (position !== -1) {
//   console.log(`目标元素在数组中的位置:${position}`);
// } else {
//   console.log("目标元素不在数组中");
// }


// test
function search (arr,target) {
  function inSearch(arr,target,start,end) {
    let mid = Math.floor((start+end)/2)
    if(target===arr[mid])return mid

    // 出口 
    if(start>=end)return -1
    if(target>arr[mid])return inSearch(arr,target,mid+1,end)
    if(target<arr[mid])return inSearch(arr,target,start,mid-1)
  }
  return inSearch(arr,target,0,arr.length-1)
}

const dataArr = [0,1, 2, 3, 4, 5, 6, 7, 8, 9];
const position = search(dataArr, 9)
if (position !== -1) {
  console.log(`目标元素在数组中的位置:${position}`);
} else {
  console.log("目标元素不在数组中");
}
