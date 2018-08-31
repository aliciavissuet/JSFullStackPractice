import React from 'react'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';


import {connect} from 'react-redux';
import {registeruser} from "../../actions/authActions";
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends React.Component {
    constructor(){
        super();
        this.state ={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState({errors:nextProps.errors})//we get the errors from our redux state and once we receive new properties then we will set it to the component state
            //errors are still coming from the component state
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };
//in the onSubmit method, the local state is sent to the redux reducer using the redux action
    onSubmit = (e) =>{
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }
        this.props.registeruser(newUser, this.props.history);
        // axios.post('/api/users/register', newUser)
        //     .then(res => console.log(res.data))
        //     .catch(err => this.setState({errors:err.response.data}))
    };

    render(){
        const {errors} = this.state;
        //setting a constant equal to this.props.auth.user


        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your account</p>
                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        placeholder="Name"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        name="name"
                                        error={errors.name}
                                    />
                                    <TextFieldGroup
                                        placeholder="Email"
                                        type="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        name="email"
                                        error={errors.email}
                                        info={"This site uses Gravatar so if you want a profile image, use a Gravatar eamil"}
                                    />
                                    <TextFieldGroup
                                        placeholder="Password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        type="password"
                                        name="password"
                                        error={errors.password}
                                    />
                                    <TextFieldGroup
                                        placeholder="Confirm password"
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        type="password"
                                        name="password2"
                                        error={errors.password2}
                                    />
                                    <input
                                        type="submit"
                                        className="btn btn-info btn-block mt-4"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registeruser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
};

//state refers to redux state
//props refers to components props
//comes froms root reducer
const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
});
//mapstatetoprops gives sets the redux state to the component's props (the specified
// components props become redux state
export default connect(mapStateToProps,{registeruser})(withRouter(Register));

//commit action
//create a action type
//dispatch that to reducer with payload
//inside reducer manipulated state to include
//map state to prop
//set prop as state of component
//grab state from component