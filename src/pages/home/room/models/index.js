import * as service from '../service'
// import { getCampusPage, addCampus, editCampus, deleteCampus } from './service'
const models = {
    namespace:'room',
    state:{
       rooms:[],
       pagination:{
           current:1,
           pageSize:20
       }
    },
    reducers:{
       save(state,{payload}){
           console.log('ppp',payload)
           return {...state,...payload}
       },
       paginationChange(state,{payload:pagination}){
           console.log('??paginationChange',pagination)
           return {...state,pagination}

       }
    },
    effects:{
      *get({payload:{pageSize,pageIndex,sortName,sortOrder}},{call,put}){
        const { data } = yield call(service.getRoom,{pageSize,pageIndex,sortName,sortOrder}) 
          
        yield put({type:'save',payload:{rooms:data.list}})
      },
      *add({payload:{buildingId,number,floor,title,bedCount,allowGender}},{call,put}){ 
          const {data} = yield call(service.addRoom,{buildingId,number,floor,title,bedCount,allowGender}) 
          console.log(data)
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
