import React, {PropTypes} from "react";
import {Router, Route,IndexRoute} from "dva/router";
import IndexPage from "./indexPage/indexPage.jsx";
import App from "./app";
import AddPage from "./addImages/addImages";
import EditPage from "./edit/edit";
import PreviewPage from "./preview/preview";
import MusicPage from "./music/music";
import MusicMy from "./musicMy/musicMy";
import MusicLibrary from "./musicLibrary/musicLibrary";
import MusicType from "./musicType/musicType";
import MusicSearch from "./musicSearch/musicSearch";
import EditHeadPage from "./editHead/editHead";
import ImagePage from "./image/image";
import ImageSearchPage from "./imageSearch/imageSearch";
import ImageSelectPage from "./imageSelect/imageSelect";
import MyPage from "./my/my";
import DetailPage from "./detail/detail";

export default function ({history}) {
    return (
        <Router history={history}>
            <Route path="/" component={App} ignoreScrollBehavior>
                <IndexRoute component={IndexPage}/>
                <Route path="add" component={AddPage}/>
                <Route path="edit" component={EditPage}/>
                <Route path="music" component={MusicPage}>
                    <Route path="my" component={MusicMy}/>
                    <Route path="library" component={MusicLibrary}/>
                </Route>
                <Route path="musicsearch" component={MusicSearch}/>
                <Route path="Musictype" component={MusicType}/>
                <Route path="image" component={ImagePage}/>
                <Route path="imagesearch" component={ImageSearchPage}/>
                <Route path="imageselect" component={ImageSelectPage}/>
                <Route path="my" component={MyPage}/>
                <Route path="detail/:id" component={DetailPage}/>
                <Route path="preview" component={PreviewPage}/>
                <Route path="edithead" component={EditHeadPage}/>
                <Route path="*" component={IndexPage}/>
            </Route>
        </Router>
    );
};
