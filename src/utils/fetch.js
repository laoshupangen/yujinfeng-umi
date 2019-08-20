import fetch from 'dva/fetch';
import router from 'umi/router'
import { message } from 'antd';
// const API_HOST= 'http://192.168.1.125:10000/api'
const API_HOST = 'http://115.223.19.233:9006/api'


// setTimeout(()=>console.dir(window.g_app),1000)
// 自定义请求头 Authorization
var defaultOptions = {
    headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json;charset=utf-8',
        'Authorization':sessionStorage.getItem('Authorization')
    },
    credentials: 'include',
    mode:'cors'  
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
        url += JsonToString(paramas.params)
        url = API_HOST + url
        return request(url,defaultOptions)
    },
    post:function(url,paramas){
        url = API_HOST + url
        defaultOptions.method = 'post'
        // console.log(paramas)
        defaultOptions.body = JSON.stringify(paramas)
        // console.log('doption',defaultOptions)
        return request(url,defaultOptions)
    }

}


const checkStatus = function(res){  
    if(res.status>=200&&res.status<300){
        // if(res.headers.has('Authorization')){
        //     let authorization = res.headers.get('Authorization')
        //     sessionStorage.setItem('Authorization',authorization)
        // }
        if(res.status===204){
            return res.text()
        }
        return res.json();
    }
   
    
    const error = new Error(res.statusText);    
    
    error.res = res;
    throw error;
   
}

 async function request(url,options){
    try{
        let res = await fetch(url,options);
        res = checkStatus(res)
        
        const data = await res
        
        // console.log('data',data)
        const req = {
            data
        }
        return req
    }catch(e){
        // console.table(e)
        // console.log(e.message)
        message.error(e)
    }
    
}

export default $
