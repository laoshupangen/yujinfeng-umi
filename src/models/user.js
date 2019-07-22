import * as services from '@/service'
import { routerRedux } from 'dva/router';
import {message} from 'antd'
export default {
    namespace:'user',
    state:{
      user:{},
      loginStatus:false,
      btnStatus:false,
    },
    reducers:{
      save(state,{payload:{data:loginStatus}}){
          return {...state,loginStatus}
      },
      btnStatus(state,{payload:{data:btnStatus}}){
          return {...state,btnStatus}
      }
      ,
    
    },
    effects:{
        *Login({payload:{phone,password,email,account}},{call,put}){
            const {data} = yield call(services.Login,{phone,password,account,email})
            if(data.code===0){
                yield put({type:'save',payload:{data:data.code===0?true:false}})
                yield put(routerRedux.push('/home'));
            }else{
                message.error(data.msg)
            }
        },
        *LoginQut({call,put}){
           const {data} = yield call(services.LoginQut)
           if(data.code===0){
               yield put({type:'save',payload:{data:false}})
           }else{
               message.error(data.msg)
           }
        }   
    },
    subscriptions:{
        setup({dispatch,history}){
            // console.log('test订阅0',dispatch)            
            return history.listen(({pathname,query})=>{
                // console.log('test订阅',pathname)             
                // dispatch({type:'Login',payload:query})                
                // if(pathname === '/users/users'){
                //     console.log(pathname)
                // }
            })
        }
    }
}
