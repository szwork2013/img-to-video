/**
 * Created by liyunsong on 2016/12/8.
 */
import {searchImg} from "../services/services"

export default {
    namespace: 'imagesearch',
    state: {
        imgs: [],
        searchKey: "",
        offset: 0,
        loading: false
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/imagesearch') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    });
                }
            });
        },
    },

    effects: {
        *query({payload}, {call, put, select}) {
            const searchKey = yield select(({imagesearch}) => imagesearch.searchKey);

            if (searchKey === payload.searchKey) {
                return false
            } else {
                //添加 loading
                yield put({type: "setLoading"});

                //设置搜索词语
                yield put({type: "setKeySuccess", payload: payload.searchKey});
                // 清空list && offset
                yield put({type: "setImgsSuccess"});
                // 添加list
                const {data} = yield call(searchImg, {from: "wxpub", offset: 0, q: payload.searchKey});

                yield put({
                    type: "addSuccess", payload: {
                        imgs: data.data.imgs,
                        offset: data.data.offset
                    }
                })
            }
        },

        *add(_, {call, put, select}){
            yield put({type: "setLoading"});
            const searchKey = yield select(({imagesearch}) => imagesearch.searchKey);
            const offset = yield select(({imagesearch}) => imagesearch.offset);
            const {data} = yield call(searchImg, {from: "wxpub", offset: offset, q: searchKey});
            yield put({
                type: "addSuccess", payload: {
                    imgs: data.data.imgs,
                    offset: data.data.offset
                }
            });
        }
    },

    reducers: {
        setLoading(state){
            return {...state, loading: true}
        },
        setImgsSuccess(state){
            return {...state, imgs: [], offset: 0}
        },
        setKeySuccess(state, action){
            return {...state, searchKey: action.payload}
        },
        addSuccess(state, action){
            return {
                ...state,
                imgs: [...state.imgs, ...action.payload.imgs],
                offset: action.payload.offset,
                loading: false
            }
        }
    },
}