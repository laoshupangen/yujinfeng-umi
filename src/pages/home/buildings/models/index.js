import * as service from '../service'
const models = {
    namespace:'building',
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
        const { data } = yield call(service.getBuildingPage, { pageSize: 20, pageIndex: 1, sortName, sortOrder })
        console.log(data)
        yield put({type:'save',payload:{data}})
      }
    },
    subscriptions:{
        setup({dispatch,history}){
        return history.listen(({ pathname, query }) => {
          dispatch({ type: 'fetch', payload: query })
              if (pathname === '/home/building') {
                console.log('builds', pathname)
                    
                }
            })
        }
    }
}
export default models
