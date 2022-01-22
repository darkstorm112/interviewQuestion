// LRU 算法

// 数组比较容易实现
// class LRUCache {
//   constructor(limit) {
//     this.limit = limit
//     this.count = 0
//     this.cache = {}
//   }

//   get (key) {
//     if(this.cache[key])return this.cache[key].value
//     return -1
//   }
// }

class LRUCache {
  constructor(limit) {
    this.limit = limit
    this.count = 0
    this.cache = []
  }
  get (key) {
    let index = this.cache.findIndex(i=>i[0]===key)
    if(index===-1)return -1
    let item = this.cache.splice(index,1)
    this.cache.push(...item)
    // console.log(item)
    return item[0][1]
  }
  put (key,value) {
    let index = this.cache.findIndex(i=>i[0]===key)
    if(index===-1){
      if(this.limit>this.count){
        this.cache.push([key,value])
        this.count ++
      }else{
        this.cache.push([key,value])
        this.cache.shift()
      }
    }else{
      this.cache.splice(index,1)
      this.cache.push([key,value]) 
    }
  }
}

let cache = new LRUCache(2)

cache.put(1,1)
cache.put(2,2)
console.log(cache.get(1))
cache.put(3,3)
console.log(cache.get(2))
cache.put(4,4)
cache.put(4,5)
console.log(cache.get(1))
console.log(cache.get(3))
console.log(cache.get(4))


// O(1)查询
//  一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看
class LRUCache {
  constructor(capacity) {
    this.secretKey = new Map();
    this.capacity = capacity;
  }
  get(key) {
    if (this.secretKey.has(key)) {
      let tempValue = this.secretKey.get(key);
      this.secretKey.delete(key);
      this.secretKey.set(key, tempValue);
      return tempValue;
    } else return -1;
  }
  put(key, value) {
    // key存在，仅修改值
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key);
      this.secretKey.set(key, value);
    }
    // key不存在，cache未满
    else if (this.secretKey.size < this.capacity) {
      this.secretKey.set(key, value);
    }
    // 添加新key，删除旧key
    else {
      this.secretKey.set(key, value);
      // 删除map的第一个元素，即为最长未使用的
      this.secretKey.delete(this.secretKey.keys().next().value);
    }
  }
}
// let cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// console.log("cache.get(1)", cache.get(1))// 返回  1
// cache.put(3, 3);// 该操作会使得密钥 2 作废
// console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
// cache.put(4, 4);// 该操作会使得密钥 1 作废
// console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
// console.log("cache.get(3)", cache.get(3))// 返回  3
// console.log("cache.get(4)", cache.get(4))// 返回  4
