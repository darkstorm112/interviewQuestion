
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

