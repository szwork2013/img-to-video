/**
 * Created by liyunsong on 2016/12/9.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {Link, routerRedux} from "dva/router";
import styles from "./musicLibrary.less";

function MusicLibrary({dispatch, music}) {

    function group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
    }

    function goSearch(tid, name) {
        dispatch(routerRedux.push({
            pathname: `/musictype`,
            query: {tid, name}
        }));
    }

    const libraryList = group(music.libraryList, 3).map((v, i) => {
        const ulContent = v.map((v, i) => (
            <li key={i} onClick={() => goSearch(v.tid, v.name)}>
                <div style={{backgroundImage: `url('${v.cover}/sz/240')`}}></div>
                <p>{v.name}</p>
            </li>
        ));
        return (
            <ul key={i}>
                {ulContent}
            </ul>
        )
    });

    return (
        <div className={styles.wrap}>
            {libraryList}
        </div>
    );
}

MusicLibrary.propTypes = {};

function mapStateToProps({music}) {
    return {music};
}

export default connect(mapStateToProps)(MusicLibrary);