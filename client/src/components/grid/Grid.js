import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// import CommentForm from './CommentForm';
// import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import {getGrid} from "../../actions/gridActions";
import {Link} from 'react-router-dom';
import SingleGrid from "./SingleGrid";


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
                            <Link to={"/communication-board-feed"}
                                  className={"btn btn-light mb-3"}
                            >
                                Communication Boards

                            </Link>


                            <h2> {grid.title}</h2>
                            <small>Click image to hear word</small>
                            {gridContent}

                        </div>
                    </div>

                </div>

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