// 实现模板字符串解析功能

let template = '我是{{ name }}，年龄{{ age }}，性别{{ sex }}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined

function render(template, data) {
  while((/\{\{(.+)\}\}/).test(template)){
    template = template.replace(/\{\{(\w+)\}\}/,function(match,$1){
      // console.log('----------',match,'-----------',$1)
      return data[$1]
    })
  }
  console.log(template)
  return template
}

function render(template, data) {
  template = template.replace(/\{\{(\s*\w+\s*)\}\}/g,function(match,$1){
    return data[$1.trim()]
  })
  console.log(template)
  return template
}

function render(template, data) {
  template = template.replace(/\{\{([^\}\}]+)\}\}/g,function(match,$1){
    console.log('----------',match,'-----------',$1)
    return data[$1.trim()]
  })
  console.log(template)
  return template
}