const models = {
    namespace: 'checkIn',
    state: {
        current: 0,
        tabledata: [],
        reserve: false
    },
    reducers: {
        save(state, { payload: current }) {

            return { ...state, current }
        },
        reserve(state,{payload:reserve}){
            console.log('reserve',reserve)
            return {...state,reserve}
        }
    },
    effects: {

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home/checkIn') {
                    // console.log('query',query)
                    // dispatch({type:'get',payload:{keywords:''}})
                }
            })
        }
    }
}
export default models