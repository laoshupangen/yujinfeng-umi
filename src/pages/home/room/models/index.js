import * as service from '../service'
// import { getCampusPage, addCampus, editCampus, deleteCampus } from './service'
const models = {
    namespace:'room',
    state:{
       rooms:[],
       pagination:{
           current:1,
           pageSize:20,
           total:1
       }
    },
    reducers:{
       save(state,{payload}){
           
           return {...state,...payload}
       },
       
    },
    effects:{
      *get({payload},{call,put}){
        const { data } = yield call(service.getRoom,payload) 
          
        yield put({type:'save',payload:{rooms:data.list,pagination:{total:data.pageCount,current:payload.pageIndex,pageSize:payload.pageSize}}})
      },
      *add({payload},{call,put}){ 
           yield call(service.addRoom,payload) 
          
      },
      *delete({payload:{id}},{call}){
        yield call(service.deleteRoom,{id})
      },
      *update({payload:{id,buildingId,number,floor,title,bedCount,allowGender}},{call}){
          yield call(service.editRoom,{id,buildingId,number,floor,title,bedCount,allowGender})

      }

    },
    subscriptions:{
        setup({dispatch,history }){
            dispatch({type:'buildings/fetch'})
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/room'){
                    dispatch({type:'get',payload:{pageIndex:1,pageSize:20}})
                    
                }
            })
        }
    }
}
export default models
