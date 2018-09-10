import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class GridPreview extends React.Component {

    render(){
        const grid=this.props.grid;

        return (
            <div className={"card card-body bg-light mb-3"}>
                <div className={"row"}>

                    <div className={"col-lg-6 col-md-4 col-8"}>
                        <h3>{grid.title}</h3>
                        <h6>{grid.description}</h6>
                        <Link to={`/grid/${grid._id}`}>
                            View Communication Board
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
GridPreview.propTypes = {
    grid: PropTypes.object.isRequired,

}

export default GridPreview;