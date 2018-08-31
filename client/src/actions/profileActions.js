import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from "./types";

//get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_PROFILE,
                payload:{}
                //want to return an empty profile - you are allowed to have an account without a profile.
            }))

};

//Profile loading
//don't need to send payload just tell reducer loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};
//clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};