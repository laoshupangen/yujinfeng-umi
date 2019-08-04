import fetch from 'dva/fetch';
import router from 'umi/router'
import { message } from 'antd';
const API_HOST= 'http://192.168.1.125:10000/api'


// setTimeout(()=>console.dir(window.g_app),1000)
// 自定义请求头 Authorization
var defaultOptions = {
    headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json;charset=utf-8',
        'Authorization':sessionStorage.getItem('Authorization')
    },
    // credentials: 'include',
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
        defaultOptions.body = JSON.stringify(paramas.params)
       
        // url += JsonToString(paramas.params)
        // url = API_HOST + url
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
        if(res.headers.has('Authorization')){
            let authorization = res.headers.get('Authorization')
            
            sessionStorage.setItem('Authorization',authorization)
        }



        if(res.status === 204){
           return 
        }
        return res;
    }
    if(res.status==='303'){
        if(sessionStorage.getItem('Authorization')){
            message.error('请重新登录')
            router.push('/login')
        }else{
            // message.error('未')
            window.location.href = '/Login'
        }
        return false
    }
    if(res.status==='401'){
       message.error('角色无相应功能权限,请联系管理员设置')
       return false
    }
    
    // const error = new Error(res.statusText);    
    
    // error.res = res;
    // throw error;
}
//约定接口返回结构{code:,msg:,data:}code=0时,代表接口无异常，其他均为异常
 async function request(url,options){
    try{
        const res = await fetch(url,options);
       
        checkStatus(res)
        if(res.statusText==='No Content'){
            return 
         }
        
        // if(!checkStatus(res)){
        //     return 
        // }
        // console.log('res',res)
       
        const data = await res.json()
        console.log('data',data)
        
        const req = {
            data
        }
        return req

    }catch(e){
        // console.table(e)
        // console.log(e.message)
        message.error(e.message)
    }
    
}

export default $
