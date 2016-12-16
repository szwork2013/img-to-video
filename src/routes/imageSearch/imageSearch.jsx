import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import styles from "./imageSearch.less";
import Header from "../../components/header/header";
import LoadingBottom from "../../components/loadingBottom/loadingBottom";


class ImageSearchPage extends Component {
    constructor(props) {
        super(props);
        this.preview = this.preview.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    preview(imgurl) {
        const {dispatch} = this.props;
        dispatch(routerRedux.push({
            pathname: '/imageselect',
            query: {imgurl},
        }));
    }

    onScroll(e) {

        const {dispatch, imagesearch:{loading}} = this.props;
        const num = 50;
        if (!loading) {
            if (e.target.clientHeight + e.target.scrollTop + num > this.ul.clientHeight) {
                dispatch({
                    type:"imagesearch/add",
                    payload:{

                    }
                })
            }
        }


    }

    render() {
        const {imagesearch, dispatch} = this.props;
        const newImgs = imagesearch.imgs.map((v, i) => {
            return (
                <li key={i} onClick={() => this.preview(v.url)}>
                    <div className={styles.imgWrap} style={{backgroundImage: `url('${v.url}')`}}></div>
                </li>
            );
        });

        return (
            <div className={styles.wrap}>
                <Header dispatch={dispatch} title={imagesearch.searchKey} backUrl="/image"/>
                <div className={styles.scrollWrap} onScroll={this.onScroll}>
                    <ul ref={(ul) => {
                        this.ul = ul
                    }}>
                        <li className={styles.placeholder}/>
                        {newImgs}
                        <li className={styles.loading}><LoadingBottom display={true}/></li>
                    </ul>
                </div>
            </div>
        )
    }
}

ImageSearchPage.propTypes = {
    imagesearch: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({imagesearch}) {
    return {imagesearch};
}

export default connect(mapStateToProps)(ImageSearchPage);