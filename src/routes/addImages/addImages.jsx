import React, {Component, PropTypes} from "react";
import {routerRedux} from "dva/router";
import {ActionSheet} from "antd-mobile";
import {Toast} from "antd-mobile";
import {connect} from "dva";
import styles from "./addImages.less";
import iconAdd from "./imgs/icon-add.png";
import Header from "../../components/header/header";

function AddImages({dispatch, edit}) {
    function deleteImg(url) {
        dispatch({
            type: "edit/deleteSuccess",
            payload: url,
        });
    }

    function syncUpload(localIds) {
        let localId = localIds.pop();
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 1,
            success: function (res) {
                const serverId = res.serverId; // 返回图片的服务器端ID
                dispatch({
                    type: "edit/addLocalImg",
                    payload: {
                        url: localId,
                        wx_img_id: serverId
                    }
                });
                //其他对serverId做处理的代码
                if (localIds.length > 0) {
                    syncUpload(localIds);
                }
            }
        })
    }

    // 网络图库版本
    function showActionSheet() {
        const BUTTONS = ["本地相册", "网络图库", "取消"];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                maskClosable: true,
                cancelButtonIndex: BUTTONS.length - 1,
            },
            (buttonIndex) => {
                switch (BUTTONS[buttonIndex]) {
                    case "本地相册":
                        wx.chooseImage({
                            count: 9, // 默认9
                            sizeType: ['original', 'compressed'],
                            sourceType: ['album', 'camera'],
                            success: function (res) {
                                syncUpload(res.localIds);
                            }
                        });
                        return false;
                    case "网络图库":
                        dispatch(routerRedux.push({
                            pathname: "/image"
                        }));
                        return false;
                }
            });
    }


    //没有网络图库版本
    // function showActionSheet() {
    //     const BUTTONS = ["本地相册", "取消"];
    //     ActionSheet.showActionSheetWithOptions({
    //             options: BUTTONS,
    //             maskClosable: true,
    //             cancelButtonIndex: BUTTONS.length - 1,
    //         },
    //         (buttonIndex) => {
    //             switch (BUTTONS[buttonIndex]) {
    //                 case "本地相册":
    //                     wx.chooseImage({
    //                         count: 9, // 默认9
    //                         sizeType: ['original', 'compressed'],
    //                         sourceType: ['album', 'camera'],
    //                         success: function (res) {
    //                             syncUpload(res.localIds);
    //                         }
    //                     });
    //                     return false;
    //             }
    //         });
    // }

    const {imgs} = edit;
    const imgList = imgs.map((v, i) => {
        return (
            <li key={i}>
                <div style={{backgroundImage: `url("${v.url}")`}}>
                    <span className={styles.num}>{i + 1}</span>
                    <span className={styles.del} onClick={() => deleteImg(v.url)}>X</span>
                </div>
            </li>
        )
    });

    function next() {
        if (!imgs.length) {
            Toast.info("请先添加图片", 1);
        } else {
            dispatch(routerRedux.push({
                pathname: "/edit"
            }));
        }
    }

    return (
        <div className={styles.wrap}>
            <Header title="图片选择" dispatch={dispatch} backUrl="/">
                <span className={styles.titleNum}>{imgs.length}</span>
                <span className={styles.titleNext} onClick={next}>下一步</span>
            </Header>
            <div className={styles.main}>
                <ul>
                    {imgList}
                    <li>
                        <div className={styles.addBtn} onClick={showActionSheet}>
                            <p>
                                <img src={iconAdd}/>
                                <span>添加图片</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
AddImages.propTypes = {
    dispatch: PropTypes.func.isRequired,
    edit: PropTypes.object.isRequired
};

function mapStateToProps({edit}) {
    return {edit};
}

export default connect(mapStateToProps)(AddImages);
