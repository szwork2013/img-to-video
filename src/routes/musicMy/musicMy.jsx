/**
 * Created by liyunsong on 2016/12/9.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import styles from "./musicMy.less";
import {SwipeAction} from 'antd-mobile';
import iconYes from "./imgs/icon-yes.png";
import iconMask from "./imgs/mask.png";

class MusicMy extends Component {
    constructor(props) {
        super(props);
        this.togglePlayMusic = this.togglePlayMusic.bind(this);
        this.stopMusic = this.stopMusic.bind(this);
        this.removeMusic = this.removeMusic.bind(this);
    }

    stopMusic() {
        const {playingID} = this.props.music;
        playingID && this.refs[playingID].pause();
    }

    togglePlayMusic(ref, url, title) {
        const {dispatch, music:{playingID}} = this.props;
        const audio = this.refs[ref];

        if (ref === playingID) {
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
                type: 'music/setPlayingIDSuccess',
                payload: ref
            });
            dispatch({
                type: 'edit/setMusicSuccess',
                payload: {url, title}
            });
            audio.play();
        }
    }

    removeMusic(id) {
        const {dispatch} = this.props;
        dispatch({
            type: 'music/deleteMusic',
            payload: id
        });
    }

    render() {
        const {music:{playingID}} = this.props;

        const musicList = this.props.music.myList.map((v, i) => {
            const rightConfig = [{
                text: '取消',
                onPress: () => console.log('取消'),
                style: {backgroundColor: '#ddd', color: 'white'}
            }, {
                text: '删除',
                onPress: () => this.removeMusic(v.id),
                style: {backgroundColor: '#F4333C', color: 'white'}
            }];
            if (v.id === playingID) {
                // 选中状态
                return (
                    <SwipeAction key={i} style={{backgroundColor: 'gray'}} autoClose right={rightConfig}>
                        <div className={styles.list} onClick={() => this.togglePlayMusic(v.id, v.url, v.title)}>
                            <div className={styles.icomPlay}>
                                <div className={styles.on} style={{backgroundImage: `url('${v.cover}/sz/240')`}}/>
                                <img src={iconMask} alt=""/>
                            </div>
                            <div className={styles.musicMain}>
                                <p className={styles.color}>{v.title}</p>
                                <img src={iconYes}/>
                            </div>
                            <audio ref={v.id} src={v.url} preload="none"/>
                        </div>
                    </SwipeAction>
                )
            } else {
                // 未选中状态
                return (
                    <SwipeAction key={i} style={{backgroundColor: 'gray'}} autoClose right={rightConfig}>
                        <div className={styles.list} onClick={() => this.togglePlayMusic(v.id, v.url, v.title)}>
                            <div className={styles.icomPlay}>
                                <div className={styles.cover} style={{backgroundImage: `url('${v.cover}/sz/240')`}}/>
                                <img src={iconMask} alt=""/>
                            </div>
                            <div className={styles.musicMain}><p>{v.title}</p></div>
                            <audio ref={v.id} src={v.url}/>
                        </div>
                    </SwipeAction>
                )
            }

        });

        return (
            <div className={styles.wrap}>
                {musicList}
            </div>
        );
    }
}

MusicMy.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps({edit, music}) {
    return {edit, music};
}

export default connect(mapStateToProps)(MusicMy);
