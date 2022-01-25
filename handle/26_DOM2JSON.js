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
