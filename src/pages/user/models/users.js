import * as usersService from '../services/userService'
export default {
    namespaces:'users',
    state:{
        list:[],
        campus:[]
    },
    reducers:{
        save(state,{payload:{data:list}}){
            return {...state,list};
        },
        scampus(state,{payload:{data:campus}}){
            return {...state,campus}
        }
    },
    effects:{
        *fetch({payload:{page}},{call,put}){
            const {data} = yield call(usersService.fetch,{page})
            yield put({type:'save',payload:{data}})
        },
        *getCampus({payload},{call,put}){
            const {data} = yield call(usersService.getCampusList)
            console.log(data)
            yield put({type:'scampus',payload:{data}})
        }

    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                // dispatch({type:'fetch',payload:query})
                dispatch({type:'getCampus',payload:query})
                
                // if(pathname === '/users/users'){
                //     console.log(pathname)
                // }
            })
        }
    }
}
