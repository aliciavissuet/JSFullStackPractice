import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getGrids} from '../../actions/gridActions';
import GridPreview from './GridPreview';

class CommunicationBoardFeed extends React.Component {
    componentDidMount(){
        this.props.getGrids();
    }
    render(){
        const {grids, loading} = this.props.grids;
        let gridItems;
        if(grids === null || loading){
            gridItems = <Spinner/>
        } else {
            if(grids.length > 0){
                gridItems = grids.map(grid =>(

                    <GridPreview key={grid.id} grid={grid}/>
                ))
            }else {
                gridItems =<h4>No communication boards found...</h4>
            }
        }

        return (
            <div className={"grids"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <h1 className={"display-4 text-center"}>Communication Boards</h1>
                            <p className={"lead text-center"}>
                                Browse and use with your students
                            </p>
                            {gridItems}
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
CommunicationBoardFeed.propTypes = {
    getGrids: PropTypes.func.isRequired,
    grids: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    grids:state.grids

});
export default connect(mapStateToProps, {getGrids})(CommunicationBoardFeed);