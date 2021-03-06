
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import {deleteGrid} from "../../actions/gridActions";

class Grids extends React.Component {
    onDeleteClick(id) {
        this.props.deleteGrid(id);
    }
    render(){


        const grids = this.props.grids.map(grid =>(
            <tr key={grid._id}>
                <Link to={`/grid/${grid._id}`}><td>{grid.title}</td></Link>
                <td>{grid.description}</td>
                <td>
                    <Moment
                        format={"YYYY/MM/DD"}>
                        {grid.lastEdited}
                    </Moment>

                </td>
                <td><button
                    className={"btn btn-danger"}
                    onClick={this.onDeleteClick.bind(this, grid._id)}
                >
                    X
                </button>
                </td>

            </tr>
        ));
        return (
            <div>
                <h4 className={"mb-4"}>My Communication Boards</h4>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Last Edited</th>
                        <th></th>
                    </tr>

                    {grids}

                    </thead>
                </table>

            </div>
        )
    }
}
Grids.propTypes = {
    deleteGrid: PropTypes.func.isRequired
};
export default connect(null, {deleteGrid})(Grids);
