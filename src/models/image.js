/**
 * Created by liyunsong on 2016/12/6.
 */
import {getRecImg} from "../services/services";
import {Toast} from "antd-mobile";
export default {
    namespace: "image",
    state: {
        searchKey: "",
        list: [],
        shoWBack: true,
        loading: false
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === "/image") {
                    dispatch({
                        type: "getRecImgInfo"
                    });
                }
            });
        },
    },

    effects: {
        *getRecImgInfo(_, {call, put, select}){
            const curList = yield select(state => state.image.list);
            if (curList.length > 0) return false;
            Toast.loading("正在加载",1000);
            yield put({type: "setLoading"});
            const {data} = yield call(getRecImg);
            if (data) {
                yield put({
                    type: "init",
                    payload: data.data.list
                });
                Toast.hide();
            }
        }
    },

    reducers: {
        init(state, action) {
            return {
                ...state,
                list: action.payload,
                loading:false
            };
        },
        setLoading(state){
            return {...state, loading:true};
        },
        setSearchKeySuccess(state, action){
            return {
                ...state,
                searchKey: action.payload
            }
        },
        toggleShowBackSuccess(state, action){
            return {
                ...state,
                shoWBack: action.payload
            }
        }
    },
}