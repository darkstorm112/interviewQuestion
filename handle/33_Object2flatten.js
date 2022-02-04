// 实现一个对象的 flatten 方法
// 题目描述:
const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }
 
//  flatten(obj) 结果返回如下
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }
 function flatten (obj) {
   var newObj = {}

   Object.keys(obj).forEach(item=>{
     if(typeof obj[item]==='object'&&obj[item]!==null){

        
     }else{
        newObj[item] = obj[item]
     }
   })

   return newObj
 }