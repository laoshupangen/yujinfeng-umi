import * as service from '../service'

const models = {
    namespace:'campus',
    state:{
       nodata:[],
       campus:[],
       buildings:[]
    },
    reducers:{
       save(state,{payload}){
           return {...state,...payload}
       }
    },
    effects:{
        *getBuildings({payload},{call,put}){
            let buildinglist = yield call(service.getBuildingList)
            yield put({type:'save',payload:{buildings:buildinglist.data}})
        },
        *getCampus({payload},{call,put}){
            let campuslist = yield call(service.getCampusList,payload)
            yield put({type:'save',payload:{campus:campuslist.data}})
        }
      
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/campus/campusDetail'){
                    // console.log('query',query)
                    dispatch({type:'getBuildings',payload:{}})
                }
                if(pathname === '/home/campus'){
                    console.log('abc')
                    dispatch({type:'getCampus',payload:{keyword:''}})
                }
            })
        }
    }
}
export default models
