// 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式

{/* <div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

把上诉dom结构转成下面的JSON格式

{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
} */}

function Dom2Json (dom) {
  let obj = {
    tag:dom.tagName,
    children:[]
  }
  ;[...dom.children].forEach(element => {
    obj.children.push(Dom2Json(element))
  })
  return obj
}

function dom2Json(domtree) {
  let obj = {};
  obj.name = domtree.tagName;
  obj.children = [];
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)));
  return obj;
}

// 扩展思考:如果给定的不是一个 Dom 树结构 而是一段 html 字符串 该如何解析?

// 那么这个问题就类似 Vue 的模板编译原理 我们可以利用正则 匹配 html 字符串 
// 遇到开始标签 结束标签和文本 解析完毕之后生成对应的 ast 并建立相应的父子关联 
// 不断的 advance 截取剩余的字符串 直到 html 全部解析完毕

