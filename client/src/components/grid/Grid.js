import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// import CommentForm from './CommentForm';
// import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import {getGrid} from "../../actions/gridActions";
import {Link} from 'react-router-dom';
import SingleGrid from "../grids/SingleGrid";


class Grid extends React.Component {
    componentDidMount(){
        this.props.getGrid(this.props.match.params.id);
    }
    render(){
        const {grid, loading} = this.props.grids;


        let gridContent;

        if(grid === null || loading || Object.keys(grid).length === 0){
            gridContent=<Spinner/>
        } else {
            gridContent = (
                <div>
                    <SingleGrid
                        grid={grid}
                        showActions={false}
                    />
                    {/*<CommentForm*/}
                        {/*postId={post._id}*/}
                    {/*/>*/}
                    {/*<CommentFeed*/}
                        {/*postId={post._id}*/}
                        {/*comments={post.comments}*/}
                    {/*/>*/}
                </div>
            )
        }
        return (
            <div className={"post"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <Link to={"/feed"}
                                  className={"btn btn-light mb-3"}
                            >
                                Back to feed
                            </Link>
                            <Link to="/add-word" className="btn btn-light">
                                <i className="fas fa-graduation-cap text-info mr-1"></i>
                                Add Word to Communication Board
                            </Link>

                            {gridContent}
                        </div>
                    </div>

                </div>

                <h1>Grid</h1>
            </div>
        )
    }
}
Grid.propTypes = {
    getGrid: PropTypes.func.isRequired,
    grids: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    grids: state.grids
});

export default connect(mapStateToProps, {getGrid})(Grid);