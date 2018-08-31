import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends React.Component {
    constructor(){
        super();
        this.state ={
            email:'',
            password:'',
            errors:{}
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const userData = {
            email:this.state.email,
            password:this.state.password,
        }
        this.props.loginUser(userData)
    };
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
    render(){
        const {errors} = this.state; //come in as properties from reducer

        return (
            <div>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your account</p>
                                <form onSubmit={this.onSubmit}>

                                    <TextFieldGroup
                                        placeholder="Email Address"
                                        type="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        name="email"
                                        error={errors.email}
                                    />
                                    <TextFieldGroup
                                        placeholder="Password"
                                        type="password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        name="password"
                                        error={errors.password}
                                    />

                                    <input
                                        type="submit"
                                        className="btn btn-info btn-block mt-4"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes ={
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);