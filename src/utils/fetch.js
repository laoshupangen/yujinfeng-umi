import fetch from 'dva/fetch';
import router from 'umi/router'
const API_HOST= 'http://192.168.1.125:10000'
var defaultOptions = {
    headers:{
        'Content-Type':'application/json'
    },
    credentials: 'include'
}
const JsonToString = function(obj){
   let str = ''
   for(let key in obj){
       let value = typeof(obj[key])==='string'?obj[key]:JSON.stringify(obj[key])
       str += '&' + key + '=' + value
   }
   return '?' + str.substr(1)
}
const $ = {
    get:function(url,paramas){
        defaultOptions.method = 'get'
        url += JsonToString(paramas)
        url = API_HOST + url
        return request(url,defaultOptions)

    },
    post:function(url,paramas){
        url = API_HOST + url
        defaultOptions.method = 'post'
        // console.log(paramas)
        defaultOptions.body = JSON.stringify(paramas)
        return request(url,defaultOptions)
    }

}


const checkStatus = function(res){  
    
    if(res.status>=200&&res.status<300){
        return res;
    }
    // 404处理
    if(res.status === 404){
        router.push('/404')
    }else{
        router.push('/error')
    }

    // const error = new Error(res.statusText);    
    // error.res = res;
    // throw error;
}

 async function request(url,options){
    const res = await fetch(url,options);
    checkStatus(res)
    const data = await res.json()
    console.log(data)
    const req = {
        data
    }
    return req
}

export default $
