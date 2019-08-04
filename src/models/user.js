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
          return {...state,...payload}
      },
      
      
    
    },
    effects:{
        *Login({payload},{call,put}){
            yield put({type:'save',payload:{btnStatus:true}})
            try{
                yield call(services.Login,payload)
                yield call(services.Info)
                const res =yield call(services.Menu)
                localStorage.setItem('menulist',JSON.stringify(res.data))
                yield put({type:'save',payload:{loginStatus:true}})
                yield put({type:'save',payload:{btnStatus:false}})
                yield put(routerRedux.push('/home'))

            }catch(err){
                message.error(err)
            }
            
            // localStorage.setItem('selfLogin',true)
           
           
            
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
              sessionStorage.clear()
              yield put(routerRedux.push('/login')) 
           }else{
               message.error(data.msg)
           }
        }   
    },
    subscriptions:{
        setup({dispatch,history}){
            // dispatch({type:'buildings/fetch'})
            return history.listen(({pathname,query})=>{
                if(pathname === '/home'){
                    dispatch({type:'menu',payload:{}})
                    
                }
            })
        }
    }
}
