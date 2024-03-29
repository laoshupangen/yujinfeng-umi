import * as service from '../service'
const models = {
    namespace: 'graduate',
    state: {
        graduates: [],
        pagination: {
            current: 1,
            pageSize: 20,
        },
        selected:[]
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *get({ payload }, { call, put }) {
            const { data } = yield call(service.graduateList, payload)
            yield put({ type: 'save', payload: { graduates: data.list, pagination: { total: data.pageCount, current: payload.pageIndex, pageSize: payload.pageSize } } })

        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home/graduate') {
                    dispatch({ type: 'get', payload: { isGraduationQuery: false, pageIndex: 1, pageSize: 20 } })

                }
            })
        }
    }
}
export default models
