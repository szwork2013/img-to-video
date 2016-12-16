import React, {Component, PropTypes} from "react";
import {routerRedux} from "dva/router";
import {connect} from "dva";
import {ActionSheet, Toast} from 'antd-mobile';
import {formatVideoTime} from "../../utils/tools";
import styles from "./my.less";
import Header from "../../components/header/header";
import videoBtn from "./imgs/icon-play.png"
import LoadingBottom from "../../components/loadingBottom/loadingBottom"

function VideoList({dispatch, list}) {
    function goDetail(id, status) {
        if (status > 0) {
            dispatch(routerRedux.push({
                pathname: `/detail/${id}`,
            }));
        } else {
            Toast.info("请耐心等待一两分钟", 1);
        }
    }

    const newList = list.map((v, i) => {
        return (
            <li key={i} onClick={() => goDetail(v.id, v.status)}>
                <div className={styles.videoLeft} style={{backgroundImage: `url('${v.cover}')`}}>
                    {v.status > 0
                        ? <img className={styles.videoBtn} src={videoBtn}/>
                        : <span className={styles.videoIng}>正在制作中...</span>
                    }
                    <span className={styles.videoDur}>{formatVideoTime(v.dur)}</span>
                </div>
                <div className={styles.videoRight}>
                    <h2>{v.title}</h2>
                    <p>播放：{v.play_times}</p>
                </div>
            </li>
        )
    });
    return (
        <ul className={styles.videoList}>
            {newList}
        </ul>
    )
}
VideoList.propTypes = {
    list: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
};


class My extends Component {
    constructor(props) {
        super(props);
        this.addList = this.addList.bind(this);
        this.changeCover = this.changeCover.bind(this);
        this.hangUpImg = this.hangUpImg.bind(this);
    }

    addList(e) {
        const {dispatch, my:{loading}} = this.props;
        if (!loading) {
            const num = 50;
            const scrollTop = e.target.scrollTop;
            const bodyHeight = document.body.clientHeight;
            const placeHeight = this.refs.placeholder.clientHeight;
            const mainHeight = this.refs.main.clientHeight;

            if (scrollTop + bodyHeight + num - placeHeight - mainHeight > 0) {
                dispatch({type: "my/add"});
            }
        }
    }

    changeCover() {
        const {my:{member}} = this.props;
        if (!member.app_cover) {
            //没有封面直接调用相册
            this.hangUpImg()
        } else {
            // 提醒更换
            const BUTTONS = ['更换封面', '取消'];
            ActionSheet.showActionSheetWithOptions({
                    options: BUTTONS,
                    cancelButtonIndex: BUTTONS.length - 1,
                    maskClosable: true,
                },
                (buttonIndex) => {
                    if ("更换封面" === BUTTONS[buttonIndex]) {
                        this.hangUpImg()
                    }
                });
        }
    }

    hangUpImg() {
        const {dispatch} = this.props;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                const cover = res.localIds[0];
                wx.uploadImage({
                    localId: cover,
                    isShowProgressTips: 1,
                    success: function (res) {
                        dispatch({
                            type: 'my/setCover',
                            payload: {
                                app_cover: cover,
                                app_cover_id: res.serverId
                            }
                        });
                    }
                })
            }
        });
    }

    render() {
        const {dispatch, my:{member, list, more, app_cover}} = this.props;
        return (
            <div className={styles.wrap}>
                <Header title="我的" dispatch={dispatch} backUrl="/"/>
                <div className={styles.scroll} onScroll={this.addList}>
                    <div className={styles.placeholder} ref="placeholder"></div>
                    <div className={styles.main} ref="main">
                        <div className={styles.mainCover}
                             style={{backgroundImage: `url('${app_cover || member.app_cover}')`}}
                             onClick={this.changeCover}
                        >
                            { (app_cover || member.app_cover) ? null : <p><b>+</b><span>点击添加封面</span></p>}
                        </div>
                        <div className={styles.userWrap}>
                            <div>
                                <img src={member.avatarUrl}/>
                            </div>
                            <p>{member.nickName}</p>
                        </div>
                        <VideoList dispatch={dispatch} list={list}/>
                        <LoadingBottom display={more > 0}/>
                    </div>
                </div>
            </div>
        )
    }
}


My.propTypes = {
    my: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({my}) {
    return {my};
}

export default connect(mapStateToProps)(My);