/**
 * Created by liyunsong on 2016/12/4.
 */
import {translateList, create} from "../services/services";

export default {
    namespace: "edit",

    state: {
        cover: "",
        wx_cover_id: "",
        title: "",
        author: "",
        imgs: [],
        music: {
            url: "",
            title: ""
        },
        tpl_id: 1006,
        tail: `演职员表
        
导演     MM
编剧     MM
主演     MM
剪辑     MM
拍摄     MM

友情赞助     小视频`
    },

    subscriptions: {
        setup({dispatch, history}){
            history.listen(({pathname}) => {
                if (pathname === "/preview") {
                    //获取翻译接口
                    dispatch({
                        type: "getTranslateList"
                    });
                }
            });
        },
    },

    effects: {
        //设置 subtitle
        *setSubtitle({payload}, {put, select}){
            const {index, subtitle} = payload;
            const imgs = yield select(({edit}) => edit.imgs);
            imgs[index].subtitle = subtitle;
            yield put({
                type: "updateImgsSuccess",
                payload: imgs
            });
        },

        //调整位置
        *setOrder({payload}, {put, select}){
            const {index, offset} = payload;
            const imgs = yield select(({edit}) => edit.imgs);
            [imgs[index], imgs[index + offset]] = [imgs[index + offset], imgs[index]];
            yield put({
                type: "updateImgsSuccess",
                payload: imgs
            });
        },

        //翻译字幕
        *getTranslateList(_, {put, call, select}){
            const imgs = yield select(({edit}) => edit.imgs);
            const qlist = imgs.map(v => v.subtitle).filter(v => !!v);    //获取有数据的 title
            const {data} = yield call(translateList, {qlist});

            let temp = 0;
            const newImgs = imgs.map(v => {
                if (v.subtitle) {
                    v.subtitleEn = data.data.list[temp];
                    temp++
                }
                return v;
            });
            yield put({
                type: "updateImgsSuccess",
                payload: newImgs
            });
        },

        //提交制作
        *createPost(_, {put, call, select}){
            const edit = yield select(({edit}) => edit);
            const post = {
                title: edit.title || "我的视频",
                author: edit.author,
                tail: edit.tail,
                imgs: edit.imgs,
                cover: edit.cover || edit.imgs[0].url,
                wx_cover_id: edit.wx_cover_id || edit.imgs[0].wx_img_id || "",
                music: edit.music.url,
                tpl_id: 1006
            };
            const {data} = yield call(create, {post});
            if (1 == data.ret) {
                //清空 edit
                yield put({type: "clearEdit"});
            }
        },

        //添加本地图片
        *addLocalImg({payload}, {put}){
            console.log(payload.length);
            yield put({
                type: "addSuccess",
                payload
            });
        }
    },

    reducers: {
        deleteSuccess(state, action) {
            const newList = state.imgs.filter(v => v.url != action.payload);
            return {...state, imgs: newList}
        },
        addSuccess(state, action){
            const newList = [...state.imgs, action.payload];
            return {...state, imgs: newList}
        },
        setTitleSuccess(state, action){
            return {...state, title: action.payload}
        },
        setMusicSuccess(state, action){
            return {...state, music: action.payload}
        },
        setCoverSuccess(state, action){
            return {...state, ...action.payload}
        },
        setAuthorSuccess(state, action){
            return {...state, author: action.payload}
        },
        setTailSuccess(state, action){
            return {...state, tail: action.payload}
        },
        updateImgsSuccess(state, action){
            return {...state, imgs: action.payload}
        },
        clearEdit(state){
            return {
                ...state,
                cover: "",
                wx_cover_id: "",
                title: "",
                author: "",
                imgs: [],
                music: {
                    url: "",
                    title: ""
                },
                tpl_id: 1006,
                tail: `演职员表
        
导演     MM
编剧     MM
主演     MM
剪辑     MM
拍摄     MM

友情赞助     小视频`
            }
        }

    },
}