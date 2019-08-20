import * as service from '../service'
import { message } from 'antd';
const models = {
    namespace: 'checkIn',
    state: {
        current: 0,
        tabledata: [],
        reserve:false,
        builds:[],
        selectColloges:[],
        selectRooms:[],
        floors:[],
        disabled:true
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },

        
    },
    effects: {
        *getBuildings({payload},{call,put}){
            console.log(payload)
            let {data} = yield call(service.getBuilding,payload)
            console.log(data)
            yield put({type:'save',payload:{builds:data}})
        },
        *getFloors({payload},{call,put}){
            const {data} = yield call(service.getFloors,payload)
            yield put({type:'save',payload:{floors:data}})
        },
        *distributeDorm({payload},{call,put}){
            try{
                yield call(service.distributeDorm,payload)
                message.success('分配成功!',1)
            }catch(e){
                message.error(e.message)
            }

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