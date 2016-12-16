/**
 * Created by liyunsong on 2016/12/8.
 */
import React, {Component, PropTypes} from "react";
import iconLoading from "./hotel-icon-loading.svg";
import styles from "./loadingBottom.less";

function LoadingBottom({display = true}) {
    if (display) {
        return (
            <div className={styles.loadingBottom}>
                <img src={iconLoading}/>
            </div>
        )
    } else {
        return <i/>;
    }
}
LoadingBottom.propTypes = {
    display: PropTypes.bool.isRequired
};

export default LoadingBottom;