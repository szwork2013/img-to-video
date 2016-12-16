import React, {Component, PropTypes} from "react";
import {routerRedux} from "dva/router";
import iconBack from "./icon-back.svg";
import styles from "./header.less";

function Header({
    title,
    dispatch,
    backUrl,
    children = <span/>
}) {

    function goBack() {
        if (!backUrl) {
            dispatch(routerRedux.goBack());
        } else {
            dispatch(routerRedux.push({
                pathname: backUrl
            }));
        }
    }

    return (
        <div className={styles.title}>
            <h1>{title}</h1>
            <div className={styles.leftWrap} onClick={goBack}><img src={iconBack}/></div>
            <div className={styles.rightWrap}>{children}</div>
        </div>
    )
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    backUrl: PropTypes.string,
    children: PropTypes.node
};

export default Header;