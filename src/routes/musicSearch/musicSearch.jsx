/**
 * Created by liyunsong on 2016/12/9.
 */
import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import LoadingBottom from "../../components/loadingBottom/loadingBottom";
import classnames from "classnames";
import styles from "./musicSearch.less";
import iconAdd from "./imgs/add.png";

class MusicSearch extends Component {
    constructor(props) {
        super(props);
        this.playMusic = this.playMusic.bind(this);
        this.stopMusic = this.stopMusic.bind(this);
        this.goBack = this.goBack.bind(this);
        this.addToMy = this.addToMy.bind(this);
        this.searchMusic = this.searchMusic.bind(this);
        this.submitMusic = this.submitMusic.bind(this);
        this.addList = this.addList.bind(this);
    }

    goBack() {
        const {dispatch} = this.props;
        dispatch(routerRedux.goBack())
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

    searchMusic(e) {
        const {dispatch} = this.props;
        dispatch({
            type: "music/setSearchKey",
            payload: e.target.value
        });
    }

    submitMusic(e) {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch({type: "music/searchMusic"});
    }

    addList(e){
        const {dispatch,music:{searchLoading}} = this.props;
        if(searchLoading) return false;
        if((e.target.scrollTop + e.target.clientHeight + 50) > this.scrollMain.clientHeight){
            console.log(111);
        }
    }

    render() {
        const {location} = this.props;
        const {searchList, searchPlayingId, searchLoading,q} = this.props.music;
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
                <div className={styles.head}>
                    <form className={styles.searchWrap}
                          onSubmit={this.submitMusic}>
                        <input
                            type="text"
                            placeholder="搜索音乐"
                            disabled={location.query.tid && true}
                            value={q}
                            autoFocus
                            onChange={this.searchMusic}
                        />
                        <span onClick={this.goBack}>取消</span>
                    </form>
                </div>
                <div className={styles.main} onScroll={this.addList}>
                    <div className={styles.scrollWrap}>
                        <div ref={scrollMain => { this.scrollMain = scrollMain; }}>
                            <ul>
                                {List}
                            </ul>
                            <LoadingBottom display={searchLoading}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MusicSearch.propTypes = {};

function mapStateToProps({edit, music}) {
    return {edit, music};
}

export default connect(mapStateToProps)(MusicSearch);