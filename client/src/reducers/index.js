import {combineReducers} from 'redux';
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import gridReducer from './gridReducer';

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    profile:profileReducer,
    post:postReducer,
    grids:gridReducer

});