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
      *fetch({payload:{}},{call,put}){
        const { data } = yield call(service.getBuildingList, { })
        console.log(data)
        yield put({type:'save',payload:{buildings:data}})
      },
      *delete({payload},{call}){
        yield call(service.deleteBuilding)

      },
      *add({payload},{call}){
        yield call(service.addBuilding,payload)
      }
    },
    subscriptions:{
        setup({dispatch,history}){
        return history.listen(({ pathname, query }) => {
              if (pathname === '/home/buildings') {
                  dispatch({ type: 'fetch'})
                }
            })
        }
    }
}
export default models
