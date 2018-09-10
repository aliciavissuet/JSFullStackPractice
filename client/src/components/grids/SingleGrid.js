import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import GridItem from "../grid/GridItem";
// import {deletePost, addLike, removeLike} from "../../actions/postActions";
const createArray = length => [...Array(length)];
class SingleGrid extends React.Component {
    // onDeleteClick (id){
    //     this.props.deletePost(id)
    // }

    // onLikeClick(id){
    //     this.props.addLike(id)
    // }
    //
    // onUnLikeClick(id) {
    //     this.props.removeLike(id)
    // }
    // findUserLike(likes){
    //     const {auth} = this.props;
    //     if(likes.filter(like => like.user === auth.user.id).length>0){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    render(){
        const {grid, showActions} = this.props;
        const {gridItems}=grid
        const displayItems = createArray(grid.rows*grid.columns);
        for(let i=0; i<displayItems.length; i++){
            displayItems[i]={text:"text here", image:"https://www.jensenleisurefurniture.com/wp-content/themes/jensen-leisure/media/woocommerce/product-placeholder.png"};
        }
        for(let i=0; i<gridItems.length; i++){
            displayItems[i]=gridItems[i];
        }

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={grid.user.avatar}
                                 alt="" />
                        </a>
                        <br />
                        <p className="text-center">{grid.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p><strong>{grid.title}</strong></p>
                        <p className="lead">{grid.description}</p>

                        {/*{showActions  ? (<span>*/}
                               {/*<button type="button"*/}
                                       {/*className="btn btn-light mr-1"*/}
                                       {/*onClick={this.onLikeClick.bind(this, post._id)}*/}
                               {/*>*/}
                            {/*<i className={classnames('fas fa-thumbs-up', {'text-info': this.findUserLike(post.likes)*/}
                            {/*})}/>*/}
                            {/*<span className="badge badge-light">{post.likes.length}</span>*/}
                        {/*</button>*/}
                        {/*<button type="button"*/}
                                {/*className="btn btn-light mr-1"*/}
                                {/*onClick={this.onUnLikeClick.bind(this, post._id)}*/}

                        {/*>*/}
                            {/*<i className="text-secondary fas fa-thumbs-down"></i>*/}
                        {/*</button>*/}
                        {/*<Link to={`/post/${post._id}`} className="btn btn-info mr-1">*/}
                            {/*Comments: {post.comments.length}*/}
                        {/*</Link>*/}
                            {/*{post.user === auth.user.id ? (*/}
                                {/*<button*/}
                                    {/*onClick={this.onDeleteClick.bind(this, post._id)}*/}
                                    {/*type="button"*/}
                                    {/*className={"btn btn-danger mr-1"}>*/}
                                    {/*<i className={"fas fa-times"}/>*/}
                                {/*</button>*/}
                            {/*) : null}*/}
                        {/*</span>) : null}*/}
                    </div>
                    <div className={"container"}>
                        {createArray(grid.rows).map((n, i) =>
                            <div key={i}
                                 className={"row"}
                            >
                                {createArray(grid.columns).map((n, j) => (
                                    <div className={"col-md-2"}>
                                    <GridItem key={j}
                                              text={displayItems[i*grid.columns+j].text}
                                              image={displayItems[i*grid.columns+j].image}
                                           />
                                    </div>
                                )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        )
    }
}
// PostItem.defaultProps = {
//     showActions: true
// };
//
// PostItem.propTypes ={
//     post: PropTypes.object.isRequired,
//     auth: PropTypes.object.isRequired,
//     deletePost:PropTypes.func.isRequired,
//     addLike:PropTypes.func.isRequired,
//     removeLike:PropTypes.func.isRequired
// };

// const mapStateToProps = (state) => ({
//     auth:state.auth
// });

// export default connect(mapStateToProps, {deletePost, removeLike, addLike})(PostItem);
export default SingleGrid;