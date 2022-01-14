
// 深度克隆
function deepClone (data) {
  let obj = null
  if(data instanceof Function){
    return data
  }else if(data instanceof Array) {
    obj = []
    data.forEach(item=>{
      obj.push(deepClone(item))
    })
    return obj
  }else if(data instanceof Object){
    obj = {}
    Object.keys(data).forEach(item=>{
      obj[item] = deepClone(data[item])
    })
    return obj
  }else{
    return data
  }
}

var obj1 = {
  a:1,
  b:{a:2},
  c:function(){},
  d:[2,3,4,[3],{c:'dd'}]
};
var obj2 = deepClone(obj1);
console.log(obj1)
console.log(obj1===obj2)


// 深拷贝（考虑到复制 Symbol 类型）
function isObject(val) {
  return typeof val === "object" && val !== null;
}

function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj;
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let target = Array.isArray(obj) ? [] : {};
  hash.set(obj, target);
  Reflect.ownKeys(obj).forEach((item) => {
    if (isObject(obj[item])) {
      target[item] = deepClone(obj[item], hash);
    } else {
      target[item] = obj[item];
    }
  });

  return target;
}

// var obj1 = {
// a:1,
// b:{a:2}
// };
// var obj2 = deepClone(obj1);
// console.log(obj1);



// 深度拷贝
function deepClone(obj) {
  const rootObj = {} // 记录新的对象
  const cache = [obj] // 引用对象数组
  const cacheNewValues = [rootObj] // 记录对应引用的新值

  const assign = (innerObj) => {
    const newObj = innerObj === obj ? rootObj : {}
    Object.keys(innerObj).forEach(key => {
      const value = innerObj[key]
      const index = cache.indexOf(value)
      // 未缓存
      if (index === -1) {
        const type = Object.prototype.toString.call(value)
        if (typeof type === 'object') {
          newObj[key] = assign(value)
          // 记录引用的对象以及对应引用的新值
          cache.push(value)
          cacheNewValues.push(newObj[key])
        } else {
          newObj[key] = value
        }
      } else {
        // 已缓存，取对应缓存的新值
        newObj[key] = cacheNewValues[index]
      }
    })

    return newObj
  }

  return assign(obj);
}