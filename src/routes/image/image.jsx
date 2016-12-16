import React, {Component, PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./image.less";
import {Toast} from "antd-mobile";
import iconSearch from "./imgs/icon-search.png";
import iconArrow from "./imgs/icon-arrows.png";
import iconBack from "../../components/header/icon-back.svg";

function Recommend({list, dispatch}) {

    function preview(imgurl) {
        dispatch(routerRedux.push({
            pathname: "/imageselect",
            query: {imgurl},
        }));
    }

    const li = list.map((v, i) => {
        const imgs = v.imgs.map((v, i) => {
            return (
                <li
                    key={i}
                    style={{backgroundImage: `url("${v.url}")`}}
                    onClick={() => preview(v.url)}
                />
            )
        });
        return (
            <li key={i}>
                <Link to={`/imagesearch?searchKey=${v.word}`}>
                    <span>{v.word}</span>
                    <img src={iconArrow}/>
                </Link>
                <div>
                    <ul>
                        {imgs}
                    </ul>
                </div>
            </li>
        )
    });
    return (
        <ul className={styles.ul}>
            {li}
        </ul>
    )
}
Recommend.propTypes = {
    list: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function TopBar({dispatch, searchKey = "", shoWBack = false}) {

    function onSearch(e) {
        e.preventDefault();
        if (!searchKey) {
            Toast.info("请填写搜索内容", 1);
        } else {
            dispatch(routerRedux.push({
                pathname: "/imagesearch",
                query: {searchKey},
            }));
        }
    }

    function setSearchKey(e) {
        dispatch({
            type: "image/setSearchKeySuccess",
            payload: e.target.value
        })
    }

    function handleBack() {
        dispatch(routerRedux.push({
            pathname: "/add"
        }));
    }

    function handleFocus() {
        dispatch({
            type: "image/toggleShowBackSuccess",
            payload: false
        });
    }

    function handleBlur() {
        dispatch({
            type: "image/toggleShowBackSuccess",
            payload: true
        })
    }

    return (
        <div className={styles.searchWrap}>
            {shoWBack && <h2 className={styles.title}>网络图库</h2>}
            <span style={{width: !shoWBack && "0"}} className={styles.backBtn} onClick={handleBack}><img
                src={iconBack}/></span>
            <form onSubmit={onSearch} className={shoWBack && styles.form}>
                <span onClick={onSearch}><img src={iconSearch}/></span>
                <input type="text" placeholder="海贼王"
                       value={searchKey} onFocus={handleFocus}
                       onBlur={handleBlur} onChange={setSearchKey}/>
                {!shoWBack && <i className={styles.cancel} onClick={handleBlur}>取消</i>}
            </form>
        </div>
    )
}
TopBar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    shoWBack: PropTypes.bool.isRequired,
    searchKey: PropTypes.string,
};


function ImagePage({dispatch, image}) {
    const {searchKey, list, shoWBack} = image;
    return (
        <div className={styles.wrap}>
            <TopBar searchKey={searchKey} dispatch={dispatch} shoWBack={shoWBack}/>
            <Recommend list={list} dispatch={dispatch}/>
        </div>
    );
}

ImagePage.propTypes = {
    image: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({edit, image}) {
    return {edit, image};
}

export default connect(mapStateToProps)(ImagePage);