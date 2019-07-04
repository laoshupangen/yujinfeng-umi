import * as campus from '../service'
const models = {
    namespace:'building',
    state:{
       campusdata:[]
    },
    reducers:{
       save(state,{payload:campusdata}){
           console.log('state',state)
           return {...state,campusdata}
       }
    },
    effects:{
      *fetch({payload:{sortName,sortOrder}},{call,put}){
        const {data} = yield call(campus.getCampusPage,{pageSize:20,pageIndex:1,sortName,sortOrder})       
        // let data = m.data.data        
        yield put({type:'save',payload:{data}})
      }
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/building'){
                    dispatch({type:'fetch',payload:query})
                }
            })
        }
    }
}
export default models
