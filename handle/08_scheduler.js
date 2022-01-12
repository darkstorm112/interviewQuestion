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

const addTask = task((...args)=>{console.log(...args)})

addTask(1000,"1")
addTask(500,"2")
addTask(300,"3")
addTask(400,"4")


