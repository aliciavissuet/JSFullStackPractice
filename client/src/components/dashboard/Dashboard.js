import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from "../../actions/profileActions";
import {getGrids} from "../../actions/gridActions";
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import Grids from './Grids';


class Dashboard extends React.Component {
    componentDidMount (){
        this.props.getCurrentProfile();
        this.props.getGrids();
    }

    onDeleteClick (e) {
        this.props.deleteAccount();
    }

    render(){

        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;
        const {grids} = this.props.grids;
        const grids2 = grids.filter(grid => grid.user === user.id);


        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Spinner/>
        }else{
            //check if logged in user has profile data
            if(Object.keys(profile).length>0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> </p>
                        <ProfileActions/>
                        <Grids grids={grids2}/>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                        <div style = {{marginBottom: '60px'}}/>
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
                    </div>
                )
            }
            else {
                //user is logged in but has no profile
                dashboardContent= (
                    <div>
                        <p className="lead text-muted"> Welcome {user.name} </p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link
                            to="/create-profile"
                            className={"btn btn-lg btn-info"}>
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
//want to bring in the profile state and the auth state
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    grids:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile:state.profile,
    grids:state.grids,
        auth:state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount, getGrids} )(Dashboard);