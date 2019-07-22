import * as service from '../service'
// import { getCampusPage, addCampus, editCampus, deleteCampus } from './service'
const models = {
    namespace:'campus',
    state:{
       campusdata:[]
    },
    reducers:{
       save(state,{payload:campusdata}){
           return {...state,campusdata}
       }
    },
    effects:{
      *get({payload:{keywords}},{call,put}){
        const { data } = yield call(service.getCampusPage,{keywords})       
        // let data = m.data.data 
        console.log(data)          
        yield put({type:'save',payload:data})
      },
      *add({payload:{name,number,address}},{call,put}){ 
          const {data} = yield call(service.addCampus,{name,number,address}) 
          
      }
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/campus'){
                    // console.log('query',query)
                    dispatch({type:'get',payload:{keywords:''}})
                }
            })
        }
    }
}
export default models
