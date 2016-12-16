import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {Link} from "dva/router";
import styles from "./indexPage.less";
import imgEdit from "./imgs/icon-edit.png";
import imgMy from "./imgs/icon-my.png";
function IndexPage() {
    return (
        <div className={styles.wrap}>
            <div className={styles.guide}></div>
            <div className={styles.btnWrap}>
                <Link to="/add">
                    <img src={imgEdit}/>
                    <span>大片视频</span>
                </Link>
                <Link to="/my">
                    <img src={imgMy}/>
                    <span>我的视频</span>
                </Link>
            </div>
        </div>
    );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
