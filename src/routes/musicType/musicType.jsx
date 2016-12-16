/**
 * Created by liyunsong on 2016/12/15.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import Header from "../../components/header/header";
import classnames from "classnames";
import styles from "./musicType.less";
import iconAdd from "./imgs/add.png";

class MusicType extends Component {
    constructor(props) {
        super(props);
        this.playMusic = this.playMusic.bind(this);
        this.stopMusic = this.stopMusic.bind(this);
        this.addToMy = this.addToMy.bind(this);
    }

    stopMusic() {
        const {searchPlayingId} = this.props.music;
        searchPlayingId && this.refs[searchPlayingId].pause();
    }

    playMusic(ref) {
        const {dispatch, music:{searchPlayingId}} = this.props;
        const audio = this.refs[ref];

        if (ref === searchPlayingId) {
            //操作同一首歌
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        } else {
            this.stopMusic(ref);
            //设置播放id
            dispatch({
                type: 'music/setSearchPlayingIDSuccess',
                payload: ref
            });
            audio.play();
        }
    }

    addToMy(e, id) {
        e.stopPropagation();
        const {dispatch} = this.props;
        dispatch({
            type: 'music/addMusic',
            payload: id
        });
    }

    render() {
        const {dispatch,music:{searchList, searchPlayingId,libraryName}} = this.props;

        const List = searchList.map((v, i) => {
            const liCls = classnames({
                [styles.on]: v.id === searchPlayingId
            });
            return (
                <li key={i} className={liCls} onClick={() => this.playMusic(v.id)}>
                    <div className={styles.left}>
                        <div className={styles.scrollCover} style={{backgroundImage: `url('${v.cover}/sz/240')`}}></div>
                        <div className={styles.scrollMask}></div>
                    </div>
                    <div className={styles.right}>
                        <span>{v.title}</span>
                        <img src={iconAdd} onClick={e => this.addToMy(e, v.id)}/>
                    </div>
                    <audio ref={v.id} src={v.url} preload="none"/>
                </li>
            )
        });
        return (
            <div className={styles.wrap}>
                <Header dispatch={dispatch} title={libraryName}/>
                <div className={styles.main}>
                    <ul className={styles.scrollWrap}>
                        {List}
                    </ul>
                </div>
            </div>
        )
    }
}

MusicType.propTypes = {};

function mapStateToProps({edit, music}) {
    return {edit, music};
}

export default connect(mapStateToProps)(MusicType);