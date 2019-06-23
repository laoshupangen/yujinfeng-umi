import * as usersService from '../services/users'


export default {
    namespaces:'users',
    state:{
        list:[],
    },
    reducers:{
        save(state,{payload:{data:list}}){
            return {...state,list};
        }
    },
    effects:{
        *fetch({payload:{page}},{call,put}){
           
            const {data} = yield call(usersService.fetch,{page})
            console.log(data)
            yield put({type:'save',payload:{data}})
        }
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                dispatch({type:'fetch',payload:query})
                
                // if(pathname === '/users/users'){
                //     console.log(pathname)
                // }
            })
        }
    }
}