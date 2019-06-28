import * as usersService from '../services/userService'
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
