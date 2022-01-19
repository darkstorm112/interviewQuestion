// 实现 LazyMan
// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper


// function LazyMan(name) {
//   let timer = null
//   let sleep = 0

//   let obj = {
//     sayHi() {
//       timer = setTimeout(()=>{
//         console.log('Hi This is ' + name)
//       })
//       return obj
//     },
//     eat(food) {
//       setTimeout(()=>{
//         console.log('Eat ' + food)
//         sleep = 0
//       },sleep*1000)
//       return obj
//     },
//     sleep(ms) {
//       sleep = ms
//       setTimeout(console.log, ms*1000, 'Wake up after ' + ms)
//       return obj
//     },
//     sleepFirst(ms) {
//       clearTimeout(timer)
//       obj.sleep(ms)
//       timer = setTimeout(()=>{
//         console.log('Hi This is ' + name)
//       },ms*1000)
//     }
//   }
//   return obj.sayHi()
// }

// LazyMan('Hank')  
// 输出:
// Hi! This is Hank!

// LazyMan('Hank').sleep(10).eat('dinner')
// 输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan('Hank').eat('dinner').eat('supper')
// 输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan('Hank').eat('supper').sleepFirst(5)
// 输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

// class MyLazyMan {
//   constructor(name){
//     this.person = {
//       name,
//       eat:[],
//       sleep:0,
//       sleepFirst:0
//     }

//     this.run()

//   }
//   eat(food){
//     this.person.eat.push(food)
//   }
//   sleep(ms){

//   }
//   sleepFirst(){

//   }

// }

// function LazyMan (name) {
//   return new MyLazyMan (name)
// }


// 学习  
// 链式调用  
// 1、封装一个队列  
// 2、再封装一个next方法  取出队列的第一项，执行该任务
// 3、将任务一个一个push近队列里面  每个任务的结尾 都调用next方法
// 4、初始化时开启一个定时器异步调用 next函数
class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      // 把 this.next() 放到调用栈清空之后执行
      this.next();
    }, 0);
  }
  next() {
    const task = this.tasks.shift(); // 取第一个任务执行
    task && task();
  }
  sleep(time) {
    this._sleepWrapper(time, false);
    return this; // 链式调用
  }
  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }
  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    if (first) {
      this.tasks.unshift(task); // 放到任务队列顶部
    } else {
      this.tasks.push(task); // 放到任务队列尾部
    }
  }
  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}
function LazyMan(name) {
  return new _LazyMan(name);
}

// test
class __LazyMan {
  constructor(name){
    // 1、封装一个队列  
    this.task = []

    const task = ()=>{
      console.log('Hi! This is ' + name)
      this.next()
    }
    // 3、将任务一个一个push近队列里面  每个任务的结尾 都调用next方法
    this.task.push(task)

    // 4、初始化时开启一个定时器异步调用 next函数
    setTimeout(()=>{
      this.next()
    })
  }
  // 2、再封装一个next方法  取出队列的第一项，执行该任务
  next(){
    const task = this.task.shift()
    task && task()
  }

  eat(food){
    const task = ()=>{
      console.log('Eat ' + food + '~')
      this.next()
    }
    this.task.push(task)
    return this
  }
  sleep(ms, type){
    const task = ()=>{
      setTimeout(() => {
        console.log('Wake up after ' + ms)
        this.next()
      }, ms*1000);
    }
    if(type==='first'){
      this.task.unshift(task)
    }else{
      this.task.push(task)
    }
    return this
  }
  sleepFirst(ms){
    return this.sleep(ms,'first')
  }
}

function LazyMan(name) {
  return new __LazyMan(name);
}

// LazyMan('Hank')  
// 输出:
// Hi! This is Hank!

// LazyMan('Hank').sleep(10).eat('dinner')
// 输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan('Hank').eat('dinner').eat('supper')
// 输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan('Hank').eat('supper').sleepFirst(5)
// 输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
