// https://juejin.cn/post/6983904373508145189
// 没写出来 忘记了 TODO--2022/01/17
// 后台返回一个扁平的数据结构，转成树。
let arr = [
  {id: 6, name: '部门6', pid: 5},
  {id: 5, name: '部门5', pid: 4},
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
]

[
  {
      "id": 1,
      "name": "部门1",
      "pid": 0,
      "children": [
          {
              "id": 2,
              "name": "部门2",
              "pid": 1,
              "children": []
          },
          {
              "id": 3,
              "name": "部门3",
              "pid": 1,
              "children": [
                  // 结果 ,,,
              ]
          }
      ]
  }
]


function tree ( arr ) {
  let newArr = []
  while(arr.length)  {
    let item = arr.shift()
    circle(newArr,item)
  }

  function circle (arr, item)  {
    
    // arr为空
    // 这一步也要抽出去
    if(!arr.length) {
      arr.push(item)
      return
    }

    let parent = arr.find(i=>i.id===item.pid)
    if(parent){
      if(parent.children){
        parent.children.push(item)
      }else{
        parent.children = [item]
      }
      continue
    }

    // 是否是父级
    // 这一步要抽出去
    let child = arr.find(i=>i.pid===item.id)
    if(child) {
      let idx = arr.findIndex(i=>i.pid===item.id)
      arr.splice(idx,1)
      item.children = [child]
      continue
    }

    
  }
  
  return newArr
}
 
