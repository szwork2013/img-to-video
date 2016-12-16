/**
 * Created by liyunsong on 2016/12/7.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import styles from "./preview.less";
import Header from "../../components/header/header"
function Preview({dispatch, edit}) {
    const newList = edit.imgs.map((v, i) => {
        return (
            <li key={i}>
                <div style={{backgroundImage: `url('${v.url}')`}}>
                    <p>{v.subtitle}</p>
                    <p>{v.subtitleEn}</p>
                </div>
            </li>
        )
    });


    return (
        <div className={styles.wrap}>
            <Header title="预览" dispatch={dispatch}/>
            <ul className={styles.main}>
                {newList}
            </ul>
        </div>
    );
}

Preview.propTypes = {
    edit: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({edit}) {
    return {edit};
}

export default connect(mapStateToProps)(Preview);
