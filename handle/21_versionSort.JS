// 写版本号排序的方法
// 题目描述:有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。
// 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

// 用Array内置排序函数
function versionSort (arr) {
  function fn (a,b) {
    a = a.split('.')
    b = b.split('.')
    let _a
    let _b
    while(a.length||b.length){
      _a = a.shift()
      _b = b.shift()
      if(_a===undefined)return 1
      if(_b===undefined)return -1
      if(_b - _a === 0)continue
      return _b - _a
    }
  }
  return arr.sort(fn)
}

console.log(versionSort(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5','0.1.1.1']))

let arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5','0.1.1.1']
arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }

    if (s1 === s2) continue;

    return s2 - s1;
  }
})
console.log(arr);

// test
function vSort (arr){
  return arr.sort((a,b)=>{
    a = a.split('.')
    b = b.split('.')
    let i = 0
    while (true) {
      if(a[i] === undefined || b[i] === undefined)return b.length - a.length
      if(a[i] === b[i])continue
      i++
      return b[i-1] - a[i-1]
    }
  })
}

console.log(vSort(arr))

