//import fetch from 'dva/fetch';
//import router from 'umi/router'
//import { message } from 'antd';
//const API_HOST = 'http://localhost/api'


//setTimeout(() => console.dir(window.g_app), 1000)

//var defaultOptions = {
//  headers: {
//    'Accept': 'application/json',
//    'Content-Type': 'application/json;charset=utf-8',

//  },
//  //credentials: 'include',
//  mode: 'no-cors'
//}
//const JsonToString = function (obj) {
//  let str = ''
//  for (let key in obj) {
//    let value = typeof (obj[key]) === 'string' ? obj[key] : JSON.stringify(obj[key])
//    str += '&' + key + '=' + value
//  }
//  return '?' + str.substr(1)
//}
//const $ = {
//  get: function (url, paramas) {
//    defaultOptions.method = 'get'
//    defaultOptions.body = JSON.stringify(paramas.params)

//    // url += JsonToString(paramas.params)
//    // url = API_HOST + url
//    return request(url, defaultOptions)

//  },
//  post: function (url, paramas) {
//    url = API_HOST + url
//    defaultOptions.method = 'post'
//    // console.log(paramas)
//    defaultOptions.body = JSON.stringify(paramas)
//    // console.log('doption',defaultOptions)
//    return request(url, defaultOptions)
//  }

//}


//const checkStatus = function (res, url, options) {
//  // console.log('check',res)
//  if (res.status >= 200 && res.status < 300) {
//    if (res.status === 204) {
//      return
//    }
//    return res;
//  }


//  const error = new Error(res.statusText);
//  error.res = res;
//  throw error;
//}
////约定接口返回结构{code:,msg:,data:}code=0时,代表接口无异常，其他均为异常
//async function request(url, options) {
//  try {
//    const res = await fetch(url, options);
//    console.log('headers:',options.headers)
//    checkStatus(res)
//    const data = await res.json()
//    // console.log('data',data)

//    const req = {
//      data
//    }
//    return req

//  } catch (e) {
//    // console.table(e)
//    // console.log(e.message)
//    // message.error('ERR_CONNECTION_TIMED_OUT')
//  }

//}

//export default $


import fetch from 'dva/fetch';
const API_HOST = 'http://localhost/api'
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const parseQuery = (obj) => {
  let str = ''
  for (let key in obj) {
    const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key]
    str += '&' + key + '=' + value
  }
  return str.substr(1)
}

const request = (url, method = 'get', data) => {
  const options = {
    method: method,   // HTTP请求方法，默认为GET
    headers: {        // HTTP的请求头，默认为{}
      'Content-Type': 'application/json'
    },
    credentials: 'include' // 是否携带cookie，默认为omit,不携带; same-origi,同源携带; include,同源跨域都携带
  }
  if (method === 'get') {
    url += '?' + parseQuery(data)
  } else {
    options.body = JSON.stringify(data)
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
export default {
  get(url, data) {
    return request(API_HOST+url, 'get', data)
  },
  post(url, data) {
    return request(API_HOST+url, 'post', data)
  }
}
