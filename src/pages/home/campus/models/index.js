import * as service from '../service'
const models = {
    namespace:'campus',
    state:{
       campusdata:[]
    },
    reducers:{
       save(state,{payload:campusdata}){
           return {...state,campusdata}
       }
    },
    effects:{
      *fetch({payload:{sortName,sortOrder}},{call,put}){
        const { data } = yield call(service.getCampusPage,{pageSize:20,pageIndex:1,sortName,sortOrder})       
        // let data = m.data.data        
        yield put({type:'save',payload:{data}})
      }
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/campus'){
                    dispatch({type:'fetch',payload:query})
                }
            })
        }
    }
}
export default models
