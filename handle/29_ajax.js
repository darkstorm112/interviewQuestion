// 题目描述：利用XMLHttpRequest手写ajax实现

const http = function ({url,methods='GET',data={}}) {
  return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest()

    xhr.open(methods,url,true)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.onreadystatechange(()=>{
      if(xhr.readyState!==4)return
      if(xhr.status>=200&&xhr.status<300){
        resolve(xhr.responseText)
      }else{
        reject(xhr.responseText)
      }
    })
    xhr.send(JSON.stringify(data))
  })
}