/**
 * Created by liyunsong on 2016/12/7.
 */
import {
    getMemberDetail,
    getMemberPost,
    deletePost,
    updateMember
} from "../services/services";

export default {
    namespace: 'my',
    state: {
        member: {},
        list: [],
        more: 0,
        offset: 0,
        loading: false,
        app_cover: "",
        app_cover_id: "",
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/my') {
                    dispatch({
                        type: 'getMemberInfo'
                    });
                }
            });
        },
    },

    effects: {
        *getMemberInfo(_, {call, put}){
            yield put({type: 'setLoading'});
            const {data} = yield call(getMemberDetail);
            if (data) {
                yield put({
                    type: 'init',
                    payload: data.data
                });
                yield put({type: 'setLoading'});
            }
        },
        *setCover({payload}, {call, put}){
            const {data} = yield call(updateMember, payload);
            if (data.ret > 0) {
                yield put({type: 'setCoverSuccess', payload});
            }
        },
        *add(_, {call, put, select}){
            const {offset, more, loading} = yield select(state => state.my);
            if (more === 0) return false;   //没有更多了
            if (loading) return false;      //正在加载中...
            yield put({type: 'setLoading'});
            const {data} = yield call(getMemberPost, {offset, more});
            yield put({type: 'setLoading'});
            yield put({type: "setMoreSuccess", payload: data.data.more});
            yield put({type: "setOffsetSuccess", payload: data.data.offset});
            yield put({type: "addSuccess", payload: data.data.list});
        },
        *"delete"({payload}, {call, put, select}){
            const {data} = yield call(deletePost, {id: payload});
            if (data.ret == 1) {
                const curList = yield select(state => state.my.list);
                const newList = curList.filter(v => v.id != payload);
                yield put({type: "deleteSuccess", payload: newList});
            }
        }
    },

    reducers: {
        init(state, action) {
            return {...state, ...action.payload};
        },
        setCoverSuccess(state, action) {
            return {...state, ...action.payload};
        },
        addSuccess(state, action){
            return {
                ...state,
                list: [...state.list, ...action.payload],
            }
        },
        deleteSuccess(state, action){
            return {...state, list: action.payload}
        },
        setLoading(state){
            return {...state, loading: !state.loading}
        },
        setMoreSuccess(state, action){
            return {...state, more: action.payload}
        },
        setOffsetSuccess(state, action){
            return {...state, offset: action.payload}
        },
    },
}