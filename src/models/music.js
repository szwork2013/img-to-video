/**
 * Created by liyunsong on 2016/12/9.
 */
import {
    myMusic,
    musicType,
    musicListOnType,
    addMusic,
    searchMusic,
    removeMusic
} from "../services/services";
import {Toast} from 'antd-mobile';

export default {
    namespace: 'music',
    state: {
        // 我的音乐
        myList: [],
        myOffset: 0,
        playingID: "",

        // 音乐库
        libraryList: [],
        libraryName: "",

        //搜索
        q: "",
        searchList: [],
        searchOffset: 0,
        searchPlayingId: "",
        searchLoading: false
    },

    subscriptions: {
        setup({dispatch, history}){
            history.listen(({pathname, query}, detail) => {
                const {tid, name} = query;
                switch (pathname) {
                    case "/music/my":
                        dispatch({type: "getMyMusic"});
                        return false;
                    case "/music/library":
                        dispatch({type: "getMusicLibrary"});
                        return false;
                    case "/musictype":
                        dispatch({
                            type: "getMusicType",
                            payload: {tid, name}
                        });
                        return false;
                    case "/musicsearch":
                        return false;
                }
            });
        },
    },

    effects: {
        *getMyMusic(_, {call, put, select}){
            // const {myOffset} = yield select(({music}) => music);
            const {data} = yield call(myMusic, {offset: 0, limit: 100});
            yield put({
                type: "init",
                payload: {
                    myList: data.data.list,
                    myOffset: data.data.offset,
                }
            });
        },
        *getMusicLibrary(_, {call, put, select}){
            const {libraryList} = yield select(({music}) => music);
            if (libraryList.length > 0) return false;

            const {data} = yield call(musicType);
            yield put({
                type: "init",
                payload: {
                    libraryList: data.data.list
                }
            });
        },
        *getMusicType({payload}, {call, put, select}){
            yield put({
                type: "init",
                payload: {libraryName: payload.name}
            });
            const {data} = yield call(musicListOnType, {
                tid: payload.tid,
                offset: 0,
                limit: 20
            });
            yield put({
                type: "init",
                payload: {
                    searchList: data.data.list,
                    searchOffset: data.data.offset,
                    searchPlayingId: "",
                }
            });
        },
        *addMusic({payload}, {call}){
            Toast.loading("正在添加");
            const {data} = yield call(addMusic, {id: payload});
            Toast.hide();
            if (data.ret > 0) {
                Toast.success("添加成功!!!", .5);
            }
        },
        *setSearchKey({payload}, {put}){
            yield put({type: "setSearchKeySuccess", payload});

        },
        *searchMusic(_, {call, put, select}){
            const {q} = yield select(({music}) => music);
            const {data} = yield call(searchMusic, {q, offset: 0,});
            if (data.ret > 0) {
                yield put({
                    type: "setSearchListSuccess",
                    payload: {
                        searchList: data.data.list,
                        searchOffset: data.data.offset,
                        searchPlayingId: ""
                    }
                });
            }
        },
        *deleteMusic({payload}, {call, put, select}){
            const {data} = yield call(removeMusic, {id: payload});
            if (data.ret > 0) {
                const {myList} = yield select(({music}) => music);
                const newMyList = myList.filter(v => v.id != payload);
                yield put({
                    type: "deleteMusicSuccess",
                    payload: newMyList
                });
                Toast.info("删除成功", .5);
            }
        }
    },

    reducers: {
        init(state, action){
            return {
                ...state,
                ...action.payload
            }
        },
        setSearchKeySuccess(state, action){
            return {
                ...state,
                q: action.payload,
            }
        },
        setSearchListSuccess(state, action){
            return {
                ...state,
                ...action.payload,
            }
        },

        setPlayingIDSuccess(state, action){
            return {
                ...state,
                playingID: action.payload,
            }
        },
        setSearchPlayingIDSuccess(state, action){
            return {
                ...state,
                searchPlayingId: action.payload,
            }
        },
        deleteMusicSuccess(state, action){
            return {
                ...state,
                myList: action.payload,
                playingID: ""
            }
        }
    },
}