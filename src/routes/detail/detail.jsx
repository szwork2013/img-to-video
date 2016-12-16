/**
 * Created by liyunsong on 2016/12/7.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import styles from "./detail.less";
import {formatVideoTime} from  "../../utils/tools";
import Header from "../../components/header/header";
import {ActionSheet} from 'antd-mobile';
import {routerRedux} from "dva/router";

function Detail({dispatch, detail, params}) {
    const {post} = detail;

    function showActionSheet() {
        const BUTTONS = ['删除', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                maskClosable: true,
            },
            (buttonIndex) => {
                switch (BUTTONS[buttonIndex]) {
                    case "删除":
                        if (confirm("确定要删除？")) {
                            dispatch({
                                type:"my/delete",
                                payload:params.id
                            });
                            dispatch(routerRedux.push({
                                pathname: "/my"
                            }));
                        }
                        return;
                    default:
                        return false;
                }
            });
    }

    return (
        <div className={styles.wrap}>
            <Header dispatch={dispatch} title={post.title} backUrl="/my"/>
            <div className={styles.videoWrap}>
                <video
                    playsInline
                    src={post.video}
                    controls
                    poster={`${post.cover}`}
                />
            </div>
            <div className={styles.videoAuthor}>
                <div>
                    <img src={post.member.avatarUrl}/>
                    <span>{post.author}</span>
                </div>
                <div onClick={showActionSheet}>...</div>
            </div>
            <div className={styles.videoInfo}>
                <p>{post.title}</p>
                <p><span>{formatVideoTime(post.dur)}</span><span>播放：{post.play_times}</span></p>
            </div>
        </div>
    )
}

Detail.propTypes = {
    detail: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({detail}) {
    return {detail};
}

export default connect(mapStateToProps)(Detail);