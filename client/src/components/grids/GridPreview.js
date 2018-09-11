import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {addFavorite} from "../../actions/gridActions";

class GridPreview extends React.Component {

    onFavoriteClick = (id) => {

        this.props.addFavorite(this.props.grid._id)
    };

    render(){
        const grid=this.props.grid;

        return (
            <div className={"card card-body bg-light mb-3"}>
                <div className={"container"}>

                    <div className={"row"}>

                        <div className="col-2" style={{display:"flex"}}>
                            <a href="profile.html">
                                <img className="rounded-circle d-none d-md-block" style={{height:"50px", width:"50px", margin:"auto"}} src={grid.avatar}
                                     alt="" />{grid.name}
                            </a>
                            <br />

                        </div>
                        <div className={"col-10"}>
                            <Link to={`/grid/${grid._id}`}> <h3>{grid.title}</h3></Link>
                            <h6>{grid.description}</h6>

                            <p>
                                <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.onFavoriteClick(grid._id)}
                                >
                                    <i className="text-secondary fas fa-star"></i>
                                </button>
                                    Favorited by {grid.favorites.length}</p>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
GridPreview.propTypes = {
    addFavorite: PropTypes.func.isRequired,
    grid: PropTypes.object.isRequired

}
const mapStateToProps = (state) => ({
    grids:state.grids,
    auth:state.auth
});

export default connect(mapStateToProps, {addFavorite})(GridPreview);