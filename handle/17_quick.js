// 快速排序
// 快速排序，外文名Quicksort，计算机科学，适用领域Pascal，c++等语言，
// 是对冒泡排序算法的一种改进。

// 快速排序算法通过多次比较和交换来实现排序，其排序流程如下：
// (1)首先设定一个分界值，通过该分界值将数组分成左右两部分。
// (2)将大于或等于分界值的数据集中到数组右边，小于分界值的数据集中到数组的左边。
//    此时，左边部分中各元素都小于或等于分界值，而右边部分中各元素都大于或等于分界值。
// (3)然后，左边和右边的数据可以独立排序。对于左侧的数组数据，又可以取一个分界值，
//    将该部分数据分成左右两部分，同样在左边放置较小值，右边放置较大值。
//    右侧的数组数据也可以做类似处理。
// (4)重复上述过程，可以看出，这是一个递归定义。通过递归将左侧部分排好序后，
//    再递归排好右侧部分的顺序。当左、右两个部分各数据排序完成后，整个数组的排序也就完成了。

function quickSort (arr) {
  let len  = arr.length

  let boundary = arr[0]
  let bIdx = 0
  let j = len-1
  for(let i=0; i<len; i++) {
    
    // while(arr[j]<boundary){

    // }
    for( ; j>=i; ){
      if(boundary>arr[j]){
        [arr[bIdx], arr[j]] = [[arr[j], arr[bIdx]]]
        bIdx = j
        j--
        break
      }
    }
  }

  // function

  return arr
}

// 忘记了


// 好贱--取巧的写法 
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const cur = arr[arr.length - 1];
  const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1)
  const right = arr.filter((v) => v > cur)
  return [...quickSort(left), cur, ...quickSort(right)]
}
// console.log(quickSort([3, 6, 2, 4, 1]));


// test
function quic (arr) {
  if(arr.length<2)return arr
  let cur = arr[0]
  let left = arr.filter((i,idx)=>i<=cur&&idx!==0)
  let right = arr.filter(i=>i>cur)
  return [...quic(left),cur,...quic(right)]
}
console.log('-----------',quic([3, 6, 2, 4, 1]))


