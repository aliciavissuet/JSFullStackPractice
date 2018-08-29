
import isEmpty from '../validation/is-empty';
import {SET_CURRENT_USER} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated:!isEmpty(action.payload),//if filled object, then we are authenticated. user is action payload itself
                user:action.payload
            };
        default:
            return state;

    }
}