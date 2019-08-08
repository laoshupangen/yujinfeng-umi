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
            const {data} = yield call(services.getCampusList,payload)
            // let buildinglist = yield call(services.getBuildingList)
            // console.log(campuslist.data,buildinglist)
            // yield put({type:'save',payload:{rooms:data.list}})
            yield put({type:'save',payload:{campus:data}})

        },
        *getBuildings({payload},{call,put}){
            let {data} = yield call(services.getBuildingList,payload)
            yield put({type:'save',payload:{buildings:data}})
        },
        *getCampus({payload},{call,put}){
            let {data} = yield call(services.getCampusList,payload)
            yield put({type:'save',payload:{campus:data}})
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
                if(pathname === '/home/room'){
                    dispatch({type:'getCampus',payload:{keyword:''}})
                    dispatch({type:'getBuildings',payload:{campusId:''}})

                }
               
                
                if(pathname === '/home/buildings'){
                    // dispatch({type:'getResources',payload:{type:'',keyword:''}})
                    dispatch({type:'getCampus',payload:{keyword:''}})
                }

            })
        }
        
    }
}
export default models