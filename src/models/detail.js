/**
 * Created by liyunsong on 2016/12/7.
 */
import pathToRegexp from "path-to-regexp";
import {getPostDetail} from "../services/services";
import share from "../utils/share";

export default {
    namespace: "detail",
    state: {
        post: {
            author: "",
            cover: "",
            dur: 0,
            id: 0,
            play_times: 0,
            title: "",
            video: "",
            member: {
                avatarUrl: "",
                nickName: "",
            }
        }
    },

    subscriptions: {
        setup({dispatch, history}){
            history.listen(({pathname}, detail) => {
                const match = pathToRegexp("/detail/:id").exec(pathname);
                if (match) {
                    dispatch({
                        type: "getPostInfo",
                        payload: match[1]
                    });
                }
            });
        },
    },

    effects: {
        *getPostInfo({payload}, {call, put}){
            const {data} = yield call(getPostDetail, {id: payload});

            share({
                title:"哈哈哈 ~。~",
                desc:"我现在还不能分享啊~~~退回去"
            });
            if (data) {
                yield put({
                    type: "init",
                    payload: data.data.post
                });
            }
        },
    },

    reducers: {
        init(state, action) {
            return {
                ...state,
                post: action.payload
            };
        }
    },
}
