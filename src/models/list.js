import * as services from '@/service'
const models = {
    namespaces:'list',
    state:{
       campus:[],
       buildings:[],
       allowGenders:[{key:'allowGenders.unlimited',value:'待定'},{key:'allowGenders.female',value:'女'},{key:'allowGenders.male',value:'男'}],
       resources:[]
       
    },
    reducers:{
       save(state,{payload}){
           
           return {...state,...payload}
       }
    },
    effects:{
        *get({payload},{call,put}){
            let campuslist = yield call(services.getCampusList,payload)
            let buildinglist = yield call(services.getBuildingList)
            // console.log(campuslist.data,buildinglist)
            // yield put({type:'save',payload:{rooms:data.list}})
            yield put({type:'save',payload:{campus:campuslist.data,buildings:buildinglist.data}})

        },
        *getBuildings({payload},{call,put}){
            let buildinglist = yield call(services.getBuildingList)
            yield put({type:'save',payload:{buildings:buildinglist.data}})
        },
        *getCampus({payload},{call,put}){
            let campuslist = yield call(services.getCampusList,payload)
            yield put({type:'save',payload:{campus:campuslist.data}})
        },
        *getResources({payload},{call,put}){
            yield call(services.listResource,{payload})
            yield put({type:'save',payload:{resources:[]}})
        },
        *updateResource({payload},{call}){
            
            yield call(services.updateResource,payload)
        }

    },
    subscriptions:{
        setup({dispatch,history }){
           
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/room'||pathname ==='/home/buildings'){
                    dispatch({type:'get',payload:{keyword:''}})
                }
                if(pathname === 'home/campus'){
                    dispatch({type:'getCampus',payload:{keyword:''}})
                }
                if(pathname === 'home/campus/campusDetail'){
                    // dispatch({type:'getBuildings'})
                }
                if(pathname === '/home'){
                    dispatch({type:'getResources',payload:{type:'',keyword:''}})
                }

            })
        }
        
    }
}
export default models