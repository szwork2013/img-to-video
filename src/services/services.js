/**
 * Created by liyunsong on 2016/12/4.
 */
import request, {requestFile} from "../utils/request";

//获取用户信息 /my
export async function getMemberDetail() {
    return request("member_detail");
}

//更改用户信息 => 封面
export async function updateMember(params) {
    return request("update_member", params);
}

//加载用户视频列表
export async function getMemberPost(params) {
    return request("member_posts", params);
}

//详情页面
export async function getPostDetail(params) {
    return request("post_detail", params);
}

//删除视频
export async function deletePost(params) {
    return request("del_post", params);
}

//获取推荐图片
export async function getRecImg() {
    return request("rec_img");
}

//搜索图片
export async function searchImg(params) {
    return request("search_img", params);
}

//搜索图片
export async function translateList(params) {
    return request("translate_list", params);
}

//提交制作
export async function create(params) {
    return request("create", params);
}

//我的音乐
export async function myMusic(params) {
    return request("my_music", params);
}

//音乐库首页
export async function musicType() {
    return request("music_type");
}
// 音乐类型
export async function musicListOnType(params) {
    return request("music_list_on_type", params);
}

// 添加到我的音乐
export async function addMusic(params) {
    return request("add_my_music", params);
}

// 添加到我的音乐
export async function removeMusic(params) {
    return request("remove_my_music", params);
}

// 搜索音乐
export async function searchMusic(params) {
    return request("search_music", params);
}

