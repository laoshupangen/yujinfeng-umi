import * as service from '../service'
const models = {
    namespace: 'checkIn',
    state: {
        current: 0,
        tabledata: [],
        reserve:false,
        builds:[]
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },

        
    },
    effects: {
        *getBuildings({payload},{call,put}){
            console.log(payload)
            yield {data} = call(service.getBuilding,payload)
            console.log(data)
            yield put({type:'save',payload:{builds:data}})
        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home/checkIn') {
                    dispatch({type:'getBuildings',payload:{campusId:''}})
                    
                }
            })
        }
    }
}
export default models