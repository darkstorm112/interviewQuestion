// 将虚拟 Dom 转化为真实 Dom
// 题目描述:JSON 格式的虚拟 Dom 怎么转换成真实 Dom

// {
//   tag: 'DIV',
//   attrs:{
//   id:'app'
//   },
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }
// 把上诉虚拟Dom转化成下方真实Dom
{/* <div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div> */}
// 直接使用import会报错  
// Cannot use import statement outside a module
// import vnode from require('./31_vnode.json')

// 使用require则没啥问题
// let vnode = require('./31_vnode.json')

let vnode = {
  "tag": "DIV",
  "attrs":{
    "id":"app"
  },
  "text":"div标签（父级）",
  "children": [
    {
      "tag": "P",
      "text":"P标签（子级）",
      "children": [
        { "tag": "A", "text":"a标签（孙级）","children": [] }
      ]
    },
    {
      "tag": "SPAN",
      "text":"span标签（子级）",
      "children": [
        { "tag": "A", "text":"a标签（孙级）", "children": [] },
        { "tag": "A", "text":"a标签（孙级）", "children": [] }
      ]
    }
  ]
}

function VDom2Dom (Vnode=vnode) {
  let dom = document.createElement(Vnode.tag.toLowerCase())
  if(Vnode.attrs){
    for(item in Vnode.attrs){
      dom.setAttribute(item,Vnode.attrs[item])
    }
  }
  if(Vnode.text){
    dom.innerText = Vnode.text
  }

  Vnode.children&&Vnode.children.forEach(element => {
    dom.appendChild(VDom2Dom(element))
  })

  return dom
}
// console.log(vnode)

// 真正的渲染函数
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}


