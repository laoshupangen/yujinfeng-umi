import * as service from '../service'
import { message } from 'antd';

const models = {
    namespace:'campus',
    state:{
       nodata:[],
       campus:[],
       buildings:[],
       build:[],
       curRooms:[],
       curStep:'1',
       title:''
    },
    reducers:{
       save(state,{payload}){
           return {...state,...payload}
       }
    },
    effects:{
        *getBuildings({payload},{call,put}){
            if(sessionStorage.getItem('buildIds')){
                sessionStorage.removeItem('buildIds')
            }
            let buildinglist = yield call(service.getBuildingList,payload)
            let buildIds = buildinglist.data.map(b=>{return{key:b.id,value:b.title,freeBeds:(b.bedCount-b.checkinCount)}})
            sessionStorage.setItem('buildIds',JSON.stringify(buildIds))
            yield put({type:'save',payload:{buildings:buildinglist.data}})
        },
        *getCampus({payload},{call,put}){
            let {data} = yield call(service.getCampusList,payload)
           
            yield put({type:'save',payload:{campus:data}})
        },
        *getBuild({payload},{call,put}){
            try{
                let bd = yield call(service.getBuild,payload)
                yield put({type:'save',payload:{build:bd.data}})
                
            }catch(e){
                message.error(e)
            }
        }
      
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
               
                if(pathname === '/home/campus/campusDetail'){
                    dispatch({type:'getBuildings',payload:{}})
                }
                if(pathname === '/home/campus'){
                    dispatch({type:'getCampus',payload:{keyword:''}})
                }
                if(pathname==='/home/campus/campusDetail/singleRoom'){
                    // console.log(pathname,'single',query)
                    dispatch({type:'save',payload:{title:`${query.cname}-${query.lname}(共计${query.freeBeds}个空余床位)`}})
                    dispatch({type:'getBuild',payload:{buildingId:query.id}})
                }
            })
        }
    }
}
export default models
