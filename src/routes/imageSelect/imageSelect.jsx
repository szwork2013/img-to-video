/**
 * Created by liyunsong on 2016/12/8.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import styles from "./imageSelect.less";
import Header from "../../components/header/header";
import icon from "./imgs/icon.png";
import iconYes from "./imgs/icon-yes.png";
import {Toast} from 'antd-mobile';

function ImageSelectPage({location, dispatch, edit}) {

    function deleteImg(url) {
        dispatch({
            type: 'edit/deleteSuccess',
            payload: url,
        });
        Toast.info('删除成功!!!',1);
    }

    function addImg(url) {
        dispatch({
            type: 'edit/addSuccess',
            payload: {url}
        });
        Toast.success('添加成功!!!',1);
    }

    const url = location.query.imgurl;

    //edit中是否包含该图片
    const bl = edit.imgs.some(v => v.url === url);
    const btn = bl
        ? <img src={iconYes} onClick={() => deleteImg(url)}/>
        : <img src={icon} onClick={() => addImg(url)}/>;


    return (
        <div className={styles.wrap}>
            <Header dispatch={dispatch} title="大图查看"/>
            <div className={styles.main}>
                <img src={url}/>
            </div>

            <div className={styles.btnWrap}>
                {btn}
            </div>
        </div>
    );
}

ImageSelectPage.propTypes = {
    edit: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({edit}) {
    return {edit};
}

export default connect(mapStateToProps)(ImageSelectPage);