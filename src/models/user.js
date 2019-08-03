import * as services from '@/service'
import { routerRedux } from 'dva/router';
import router from 'umi/router'
import {message} from 'antd'
export default {
    namespace:'user',
    state:{
      user:{},
      loginStatus:false,
      btnStatus:false,
      dics:[],
      token:'',
      spining:false,
      menulist:[]
    },
    reducers:{
      save(state,{payload}){
          console.log('quit',payload)
          return {...state,...payload}
      },
      
      
    
    },
    effects:{
        *Login({payload},{call,put}){
            yield put({type:'save',payload:{btnStatus:true}})
            const {data} = yield call(services.Login,payload)
            if(data){
                yield call(services.Info)
                const res =yield call(services.Menu)
                localStorage.setItem('menulist',JSON.stringify(res.data))
                yield put({type:'save',payload:{loginStatus:true}})
                localStorage.setItem('Authorization',data)
                localStorage.setItem('selfLogin',true)
                localStorage.setItem('token',data)
                yield put({type:'save',payload:{btnStatus:false}})
                // routerRedux.push('/home')
                setTimeout(()=>{
                    router.push('/home')
                },100)
                
            }else{
                message.error(data.msg)
                yield put(routerRedux.push('/login'));
            }
        },
        *menu({payload},{call,put}){
            const res =yield call(services.Menu)
            
            
            yield put({type:'save',payload:{menulist:res.data}})
        },
        *sysDic({call,put,select}){
           const {data} = yield call(services.sysDic)
           yield put({type:'getDic',payload:{dics}})
        },
        *LoginQut({payload},{call,put}){
           const res = yield call(services.LoginQut,payload)
          
           if(!res){
              localStorage.clear()
              yield put(routerRedux.push('/login')) 
           }else{
               message.error(data.msg)
           }
        }   
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                if(pathname === '/home'){
                    dispatch({type:'menu',payload:{}})
                    
                }
            })
        }
    }
}
