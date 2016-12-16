/**
 * Created by liyunsong on 2016/12/15.
 */
import React, {Component, PropTypes} from "react";
import QueueAnim from 'rc-queue-anim';

export default function App({children}) {
    return (
        <QueueAnim type={['right', 'left']} style={{height:"100%"}}>
            {children}
        </QueueAnim>
    );
}
App.propTypes = {};

