// 题目描述:手写 instanceof 操作符实现

function myInstanceof (left, right) {
  // while(left?.__proto__) {
  while(left&&left.__proto__) {
    left = left.__proto__
    // if(left?.constructor === right)return true
    if(left&&left.constructor === right)return true

  }
  return false
}

let a = {b:3}

console.log(myInstanceof(a,Object))

// 为啥node不支持这个写法===TODO版本太低了吗？
// const test = a?.b;
// console.log(test)

// 另外一种写法
function myInstanceof(left, right) {
  while (true) {
    if (left === null) {
      return false;
    }
    if (left.__proto__ === right.prototype) {
      return true;
    }
    left = left.__proto__;
  }
}


// 用递归的方式写一写
function ins (left,right) {
  if(left) {
    left = left.__proto__
    if(left === right.prototype)return true
    return ins(left,right)
  }
  return false
}


console.log(ins(Function,Function))
