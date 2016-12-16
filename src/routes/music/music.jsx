/**
 * Created by liyunsong on 2016/12/9.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {Link} from "dva/router";
import styles from "./music.less";
import iconSearch from "./imgs/icon-search.png";

function MusicPage({location,children,music}) {

    function navOn(text = "") {
        return text === location.pathname;
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.topWrap}>
                <div className={styles.searchWrap}>
                    <Link to="/musicsearch">
                        <img src={iconSearch}/>
                        <span>{music.q || "搜索音乐"}</span>
                    </Link>
                </div>
                <div className={styles.navWrap}>
                    <div>
                        <Link className={navOn("/music/my") && styles.on} to="/music/my"><i/>我的音乐<i/></Link>
                        <Link className={navOn("/music/library") && styles.on} to="/music/library"><i/>音乐库<i/></Link>
                        {/*<Link className={navOn("/music/upload") && styles.on} to="/music/upload"><i/>上传音乐<i/></Link>*/}
                    </div>
                </div>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    );
}

MusicPage.propTypes = {};

function mapStateToProps({edit,music}) {
    return {edit,music};
}

export default connect(mapStateToProps)(MusicPage);