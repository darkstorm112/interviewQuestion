// 实现有并行限制的 Promise 调度器
// 题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

// addTask(1000,"1");
// addTask(500,"2");
// addTask(300,"3");
// addTask(400,"4");
// 的输出顺序是：2 3 1 4

// 整个的完整执行流程：

// 一开始1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4

function task (fn) {
  let temp = []
  let timer = null
  let max = 0

  function run () {
    // 判断任务是否都添加进队列
    clearTimeout(timer)
    timer = setTimeout(()=>{
      // 队列添加完 开始执行队列中任务
      run2.call(this)
    })
  }
  function add (ms=300,value) {
    temp.push({ms,value:value})
  }
  function run2 () {
    if(max>=0&&temp.length&&max<2){
      let tempObj = temp.shift()
      max++
      setTimeout(()=>{
        max--
        fn.call(this,...tempObj.value)
        run2.call(this)
      },tempObj.ms)
      run2.call(this)
    }
  }
  return function (ms, ...value) {
    // 将任务添加到队列中去
    add(ms,value)

    // 执行函数
    run()
  }
}

let addTask = task((...args)=>{console.log(...args)})

// addTask(1000,"1")
// addTask(500,"2")
// addTask(300,"3")
// addTask(400,"4")


// 构造函数的实现 ==>看看先
class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.maxCount = limit;
    this.runCounts = 0;
  }
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }
  taskStart() {
    // 这一步有点YYDS  但是可以优化
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--;
        this.request();
      });
  }
}
const scheduler = new Scheduler(2);
addTask = (time, order) => {
  scheduler.add(time, order);
};
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
scheduler.taskStart()



// 重写下
;function MyScheduler (limit) {
  this.limit = limit
  this.queue = []
  this.count = 0
}
MyScheduler.prototype.add = function (ms,value,fn=()=>{}) {
  const promiseCreator = ()=>{
    return new Promise((resolve,reject)=>{
      // 这里其实可以做些操作
      // 模拟下吧
      setTimeout(()=>{
        resolve(value)
      },ms)
    })
  }
  this.queue.push(promiseCreator)
}
MyScheduler.prototype.taskStart = function () {
  // 写法二
  let limit = Math.min(this.limit,this.queue.length)
  for(let i=0;i<limit;i++){
    this.run()
  }

  // 写法一
  // this.run()

}
MyScheduler.prototype.run = function () {
  if(!this.queue.length)return
  if(this.count>=this.limit)return
  this.count++
  this.queue
    .shift()()
    .then(res=>{
      console.log(res)
      this.count--
      this.run()
    })
  
  // 写法一
  // this.run()
}

// 想想看为啥写法二要比写法一好？  仔细考虑很有意思

const sch = new MyScheduler(2)

addTask = function (ms, value) {
  sch.add(ms,value)
}


addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
sch.taskStart()
