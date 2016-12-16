/**
 * Created by liyunsong on 2016/12/7.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import styles from "./editHead.less";
import Header from "../../components/header/header";

function EditHeat({dispatch, edit}) {

    const {author, title, tail} = edit;

    function setTitle(e) {
        dispatch({
            type: 'edit/setTitleSuccess',
            payload: e.target.value
        });
    }

    function setAuthor(e) {
        dispatch({
            type: 'edit/setAuthorSuccess',
            payload: e.target.value
        });
    }

    function setTail(e) {
        dispatch({
            type: 'edit/setTailSuccess',
            payload: e.target.value
        });
    }

    return (
        <div className={styles.wrap}>
            <Header title="编辑片头" dispatch={dispatch} backUrl="/edit"/>
            <ul className={styles.main}>
                <li>
                    <h3 className={styles.title}>片名</h3>
                    <div className={styles.inputWrap}>
                        <input onChange={setTitle} type="text" value={title} placeholder="请填写片名"/>
                    </div>

                    <h3 className={styles.title}>作者</h3>
                    <div className={styles.inputWrap}>
                        <input onChange={setAuthor} type="text" value={author} placeholder="请填写作者"/>
                    </div>

                    <h3 className={styles.title}>片尾字幕</h3>
                    <div className={styles.inputWrap}>
                        <textarea onChange={setTail} value={tail} placeholder="请填写片尾字幕"/>
                    </div>
                </li>
            </ul>
        </div>
    );
}

EditHeat.propTypes = {
    edit: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({edit}) {
    return {edit};
}

export default connect(mapStateToProps)(EditHeat);
