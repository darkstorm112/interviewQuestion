// 插入排序
// 插入排序，一般也被称为直接插入排序。对于少量元素的排序，它是一个有效的算法 。
// 插入排序是一种最简单的排序方法，它的基本思想是将一个记录插入到已经排好序的有序表中，
// 从而一个新的、记录数增1的有序表。在其实现过程使用双层循环，
// 外层循环对除了第一个元素之外的所有元素，内层循环对当前元素前面有序表进行待插入位置查找，并进行移动。


// 这种写法 算不得插入排序，有点像冒泡
function insertSort (arr) {
  let len = arr.length
  for(let i=0; i<len; i++){
    for(let j=i+1; j>0; j--){
      if(arr[j]<arr[j-1]){

        [arr[j],arr[j-1]] = [arr[j-1],arr[j]]
      }
    }
  }
  return arr
}
console.log(insertSort([3, 6, 2, 4, 1]))

let arr = [4,1,3,9,2,8,6,4]
console.log(insertSort(arr))


// 另外一种实现方式  更高效相比上面那种
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let target = arr[j];
    while (j > 0 && arr[j - 1] > target) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = target;
  }
  return arr;
}
// console.log(insertSort([3, 6, 2, 4, 1]));


function insert (arr) {

  for(let i=1; i<arr.length; i++) {
    // 记录循环的位置
    let j = i
    // 记录当前的值
    let current = arr[j]
    while (j>0&&arr[j-1]>current) {
      // 当前值小于上一个值时，将上一个值插入当前值
      arr[j] = arr[j-1]
      j--
    }
    arr[j] = current
  }
  return arr
}
console.log(insert([3, 6, 2, 4, 1]));
