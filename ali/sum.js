// 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现

const addRemote = async (a, b) => new Promise(resolve => {
  setTimeout(() => resolve(a + b), 1000)
});

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  // 你的实现
}

// 请用示例验证运行结果:
add(1, 2)
  .then(result => {
    console.log(result); // 3
});


add(3, 5, 2)
  .then(result => {
    console.log(result); // 10
})

add(3, 5, 2, 6)
  .then(result => {
    console.log(result); // 10
})

// 常见两种方式 ==>60分版本

// 迭代的方式实现
async function add(...inputs) {
  if(!inputs.length)return 0
  async function  fn (a,b){
    return await addRemote(a,b)
  }
  while (inputs.length>1) {
    let c = await fn(inputs.shift(),inputs.shift())
    inputs.unshift(c)
  }
  return inputs[0]
}

// 递归的方式
async function add(...inputs) {
  if(!inputs.length)return 0
  if(inputs.length>1){
    let c = await addRemote(inputs.shift(),inputs.shift())
    return await add(c,...inputs)
  }
  return inputs[0]
}


// 骚操作来了
// Promise链式调用版本  ==>70分版本
async function add(...args) {
  return args.reduce((promiseChain, item) => {
    return promiseChain.then(res => {
      return addRemote(res, item);
    });
  }, Promise.resolve(0));
}

// 性能优化版本 非线性调用  ==>80分版本
function add(...args) {
  if (args.length <= 1) return Promise.resolve(args[0])
  const promiseList = []
  for (let i = 0; i * 2 < args.length - 1; i++) {
    const promise = addRemote(args[i * 2], args[i * 2 + 1])
    promiseList.push(promise)
  }

  if (args.length % 2) {
    const promise = Promise.resolve(args[args.length - 1])
    promiseList.push(promise)
  }

  return Promise.all(promiseList).then(results => add(...results));
}

// 魔鬼使用方案  本地缓存  ==>90分
// 这个方案会有bug，但是这种思想就是我们开发者应该考虑的，多想多看==>
const cache = {};

function addFn(a, b) {
  // const key1 = `${a}${b}`;    // 这里可能有bug
  // const key2 = `${b}${a}`;    // 这里可能有bug
  // 改一下
  const key1 = `${a}#${b}`;    
  const key2 = `${b}#${a}`;    
  const cacheVal = cache[key1] || cache[key2];
  
  if (cacheVal) return Promise.resolve(cacheVal);
  
  return addRemote(a, b, res => {
    cache[key1] = res;
    cache[key2] = res;
    return res;
  });
}


