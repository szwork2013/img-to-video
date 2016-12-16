/**
 * Created by liyunsong on 2016/12/15.
 */

function share({
    title = "小右制片厂",
    desc = "做最正经的大片",
    link = "v.izuiyou.com",
    imgUrl = "http://tbfile.ixiaochuan.cn/img/view/id/30667782",
    type = "",
    dataUrl = ""
}) {
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title, // 分享标题
            link, // 分享链接
            imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接
            imgUrl, // 分享图标
            type, // 分享类型,music、video或link，不填默认为link
            dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接
            imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareWeibo({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接
            imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接
            imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


        wx.hideAllNonBaseMenuItem();
        wx.showMenuItems({
            menuList: [
                "menuItem:share:appMessage",
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:favorite",
                "menuItem:share:QZone",
            ]
        });
    });
}
export default share;