import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {routerRedux,Link} from "dva/router";
import { ActionSheet } from 'antd-mobile';
import styles from "./edit.less";
import arrowDown from "./imgs/arrow-down.png";
import arrowUp from "./imgs/arrow-up.png";
import iconArrow from "./imgs/icon-arrow.png";
import iconDanmu from "./imgs/icon-danmu.png";
import iconMusic from "./imgs/icon-music.png";
import iconVideo from "./imgs/icon-video.png";
import Header from "../../components/header/header";

function ListItem({dispatch, imgs}) {
    function setSubTitle(e, index) {
        dispatch({
            type: 'edit/setSubtitle',
            payload: {index, subtitle: e.target.value}
        });
    }

    function setOrder(index, offset) {
        dispatch({
            type: 'edit/setOrder',
            payload: {index, offset}
        });
    }

    const _imgs = imgs.map((v, i) => {
        const up = (i === 0)
            ? <span className={styles.up}/>
            : <span className={styles.up} onClick={() => setOrder(i, -1)}><img src={arrowUp}/></span>;
        const down = (i === imgs.length - 1)
            ? <span className={styles.down}/>
            : <span className={styles.down} onClick={() => setOrder(i, 1)}><img src={arrowDown}/></span>;
        return (
            <li key={i}>
                <div className={styles.imgWrap} style={{backgroundImage: `url('${v.url}')`}}>
                    <span>{i + 1}</span>
                </div>
                <div className={styles.inputWrap}>
                    <textarea
                        value={v.subtitle}
                        placeholder="点击添加字幕"
                        onChange={e => setSubTitle(e, i)}
                        maxLength="40"
                    />
                </div>
                <div className={styles.rightWrap}>
                    {up}
                    {down}
                </div>
            </li>
        );
    });
    return (
        <ul className={styles.editWrap}>
            {_imgs}
        </ul>
    )
}
ListItem.prototype = {
    dispatch: PropTypes.func.isRequired,
    imgs: PropTypes.array.isRequired
};


function Edit({dispatch, edit}) {
    const {cover, title, imgs, music} = edit;

    function setCover() {
        const BUTTONS = ['更换视频封面', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                if ("更换视频封面" === BUTTONS[buttonIndex]){
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
                                        type: 'edit/setCoverSuccess',
                                        payload: {
                                            cover: cover,
                                            wx_img_id: res.serverId
                                        }
                                    });
                                }
                            })
                        }
                    });
                }
            });
    }

    function setTitle(e) {
        dispatch({
            type: 'edit/setTitleSuccess',
            payload: e.target.value
        });
    }

    function createVideo() {
        if(confirm("点击确定开始制作")){
            dispatch({type: 'edit/createPost'});
            dispatch(routerRedux.push({
                pathname:"/my"
            }));
        }
    }

    return (
        <div className={styles.wrap}>
            <Header title="视频编辑" dispatch={dispatch} backUrl="/add"><span onClick={createVideo}>提交制作</span></Header>
            <div className={styles.main}>
                <div className={styles.topWrap}>
                    <div className={styles.topCover} onClick={setCover}
                         style={{backgroundImage: `url('${cover || imgs[0].url}')`}}>
                        <input type="text" value={title} maxLength="14" placeholder="视频名称" onChange={setTitle}/>
                    </div>
                    <Link to="/edithead" className={styles.itemTitle}>
                        <p className={styles.iconText}><img className={styles.icon} src={iconVideo}/>编辑片头</p>
                        <img className={styles.arrow} src={iconArrow}/>
                    </Link>
                    <Link to="/music/my" className={styles.itemMusic}>
                        <p className={styles.iconText}>
                            <img className={styles.icon} src={iconMusic}/>
                            背景音乐
                        </p>
                        <p className={styles.musicName}><span>{music.title || "随机音乐"}</span>
                            <img className={styles.arrow} src={iconArrow}/>
                        </p>
                    </Link>
                </div>
                <div className={styles.list}>
                    <div className={styles.itemDanmu}>
                        <p className={styles.iconText}><img className={styles.icon} src={iconDanmu}/>添加字幕</p>
                        <Link to="/preview">预览</Link>
                    </div>
                    <ListItem dispatch={dispatch} imgs={imgs}/>
                </div>
            </div>
        </div>
    )
}
Edit.propTypes = {
    dispatch: PropTypes.func.isRequired,
    edit: PropTypes.object.isRequired
};

function mapStateToProps({edit}) {
    return {edit};
}

export default connect(mapStateToProps)(Edit);