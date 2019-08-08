import * as service from '../service'
const models = {
    namespace: 'graduate',
    state: {
        graduates: [],
        pagination: {
            current: 1,
            pageSize: 20,
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *get({ payload }, { call, put }) {
            yield { data } = call(service.graduateList, payload)
            yield put({ type: 'save', payload: { graduates: data.list, pagination: { total: data.pageCount, current: payload.pageIndex, pageSize: payload.pageSize } } })

        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home/graduate') {
                    dispatch({ type: 'get', payload: { isGraduationQuery: true, pageIndex: 1, pageSize: 20 } })

                }
            })
        }
    }
}
export default models
