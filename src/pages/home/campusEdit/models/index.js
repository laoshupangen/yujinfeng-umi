import * as service from '../service'
// import { getCampusPage, addCampus, editCampus, deleteCampus } from './service'
const models = {
    namespace:'campusEdit',
    state:{
       campus:[],
       
    },
    reducers:{
       save(state,{payload}){
           return {...state,...payload}
       },
       paginationChange(state,{payload:pagination}){
           console.log('??paginationChange',pagination)
           return {...state,pagination}

       }
    },
    effects:{
      *get({payload},{call,put}){
        const { data } = yield call(service.getCampusList,payload) 
           
        yield put({type:'save',payload:{campus:data}})
      },
      *add({payload:{name,number,address}},{call,put}){ 
          const {data} = yield call(service.addCampus,{name,number,address}) 
          console.log(data)
      },
      *delete({payload},{call}){
        yield call(service.deleteCampus,payload)
      },
      *update({payload},{put,call}){
          yield call(service.editCampus,payload)
          const { data } = yield call(service.getCampusList,{keyword:''}) 
          yield put({type:'save',payload:{campus:data}})
      }

    },
    subscriptions:{
        setup({dispatch,history }){
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/campusEdit'){
                    console.log('query', dispatch)  
                    dispatch({type:'get',payload:{keyword:''}})
                }
            })
        }
    }
}
export default models
