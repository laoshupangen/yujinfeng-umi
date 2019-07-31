const models = {
    namespace:'checkIn',
    state:{
       current:0,
       tabledata:[]
    },
    reducers:{
        save(state,{payload:current}){
          
          return {...state,current}
      }
    },
    effects:{
      
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                if(pathname === '/home/checkIn'){
                    // console.log('query',query)
                    // dispatch({type:'get',payload:{keywords:''}})
                }
            })
        }
    }
}
export default models