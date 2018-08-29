import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS, SET_CURRENT_USER} from "./types";
//Register User
export const registeruser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login')) //redirect from action//on success want to direct to login page but cant direct directly to a component from an action
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data  //dispatch action type
            })
        )
};

//login - get user token
export const loginUser = (userData) => dispatch =>{
  axios.post('/api/users/login', userData)
      .then(res => {
          //save to localStorage
          const {token } = res.data;
          //set token to localStorage
          localStorage.setItem('jwtToken', token);//only stores strings. you can convert json to string, take it out and parse it back to json if necessary.
          //set token to auth header
          setAuthToken(token);
          //Decode token to get user data
          const decoded = jwt_decode(token);//what's stored is user data and issued date and expiration
          //set current user
          dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
      );
};

//set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
};

//log user out
export const logoutUser = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false)
    //set curren user to {} whitch will set isAuthenicated to false
    dispatch(setCurrentUser({}))
}