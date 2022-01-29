// 30 分片思想解决大数据量渲染问题
// 题目描述:渲染百万条结构简单的大数据时 怎么使用分片思想优化渲染

let cont = document.getElementById('container')
let arr = []
for(let i=1;i<=10000;i++){
  arr[i-1] = i
}
burst(cont,arr,(cont,arr)=>{
  let div = document.createElement('div')
  let str = ``
  arr.forEach(item=>str += `<p>${item}</p>`)
  div.innerHTML = str
  cont.appendChild(div)
})

async function burst (container,data,callback,page = 0,pSize = 20) {
  let maxPage = Math.floor((data.length-pSize*page)/pSize)
  while(page<=maxPage){
    await callback(container,data.slice(page*pSize,++page*pSize))
  }
}



// 这个写法耦合度太高了

// let ul = document.getElementById("container");
// // 插入十万条数据
// let total = 100000;
// // 一次插入 20 条
// let once = 20;
// //总页数
// let page = total / once;
// //每条记录的索引
// let index = 0;
// //循环加载数据
// function loop(curTotal, curIndex) {
//   if (curTotal <= 0) {
//     return false;
//   }
//   //每页多少条
//   let pageCount = Math.min(curTotal, once);
//   window.requestAnimationFrame(function () {
//     for (let i = 0; i < pageCount; i++) {
//       let li = document.createElement("li");
//       li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
//       ul.appendChild(li);
//     }
//     loop(curTotal - pageCount, curIndex + pageCount);
//   });
// }
// loop(total, index);
