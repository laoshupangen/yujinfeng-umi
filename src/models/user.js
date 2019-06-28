import * as services from '@/services'
export default {
    namespaces:'user',
    state:{
      user:{},
      loginStatus:false
    },
    reducers:{
      save(state,{payload:{data:loginStatus}}){
          return {...state,loginStatus}
      }
    },
    effects:{
        *Login({payload:{account,password}},{call,put}){
            const res = yield call(services.Login,{account,password})
            // console.log(res)
            // res = res? true:false
            // yield put({type:'save',payload:{res}})
        }   
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{               
                // dispatch({type:'Login',payload:query})                
                // if(pathname === '/users/users'){
                //     console.log(pathname)
                // }
            })
        }
    }
}
