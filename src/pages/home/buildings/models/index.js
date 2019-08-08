import * as service from '../service'
const models = {
    namespace:'buildings',
    state:{
       buildings:[]
    },
    reducers:{
       save(state,{payload}){
           return {...state,...payload}
       }
    },
    effects:{
      *fetch({payload},{call,put}){
        const { data } = yield call(service.getBuildingList,payload)
        // console.log(data)
        yield put({type:'save',payload:{buildings:data}})
      },
      *delete({payload},{call}){
        yield call(service.deleteBuilding)

      },
      *add({payload},{call}){
        yield call(service.addBuilding,payload)
      },
      *update({payload},{call,put}){
        yield call(service.editBuilding,payload)
        const { data } = yield call(service.getBuildingList)
        yield put({type:'save',payload:{buildings:data}})
      }
    },
    subscriptions:{
        setup({dispatch,history}){
        return history.listen(({ pathname, query }) => {
              if (pathname === '/home/buildings') {
                  dispatch({ type: 'fetch',payload:{campusId:""}})
                  // dispatch({type:'buildings/update',payload:{id:this.state.selectItem,...forms}})
                }
            })
        }
    }
}
export default models
