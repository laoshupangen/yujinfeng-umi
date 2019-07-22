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
       save(state,{payload:rooms}){
           return {...state,rooms}
       },
       paginationChange(state,{payload:pagination}){
           console.log('??paginationChange',pagination)
           return {...state,pagination}

       }
    },
    effects:{
      *get({payload:{pageSize,pageIndex,sortName,sortOrder}},{call,put}){
        const { data } = yield call(service.getRoom,{pageSize,pageIndex,sortName,sortOrder})     
        console.log('dataroom',data)   
        // let data = m.data.data        
        yield put({type:'save',payload:data})
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
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/room'){
                    console.log('query', )  
                    dispatch({type:'get',payload:{pageIndex:1,pageSize:20}})
                }
            })
        }
    }
}
export default models
