import axios from 'axios';

import {
    ADD_GRID,
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_GRID,
    GET_GRIDS,
    GRID_LOADING,
    ADD_GRID_ITEM

} from './types';

//add post
export const addGrid = gridData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/aacgrids', gridData)
        .then(res =>
            dispatch({
                type:ADD_GRID,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        )
};
//get grids
export const getGrids = () => dispatch => {
    dispatch(setGridLoading());
    axios
        .get('/api/aacgrids')
        .then(res =>
            dispatch({
                type:GET_GRIDS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        )
};

// //delete post
// export const deletePost = id => dispatch => {
//     axios
//         .delete(`/api/posts/${id}`)
//         .then(res =>
//             dispatch({
//                 type:DELETE_POST,
//                 payload: id
//             })
//         )
//         .catch(err =>
//             dispatch({
//                 type:GET_ERRORS,
//                 payload:err.response.data
//             })
//         )
// };
// //add like
// export const addLike = id => dispatch => {
//     axios
//         .post(`/api/posts/like/${id}`)
//         .then(res =>
//             dispatch(getPosts())
//         )
//         .catch(err =>
//             dispatch({
//                 type:GET_ERRORS,
//                 payload:err.response.data
//             })
//         )
// };
// //remove like
// export const removeLike = id => dispatch => {
//     axios
//         .post(`/api/posts/unlike/${id}`)
//         .then(res =>
//             dispatch(getPosts())
//         )
//         .catch(err =>
//             dispatch({
//                 type:GET_ERRORS,
//                 payload:err.response.data
//             })
//         )
// };
//get specific grid
export const getGrid = (id) => dispatch => {
    dispatch(setGridLoading());
    axios
        .get(`/api/aacgrids/${id}`)
        .then(res =>
            dispatch({
                type:GET_GRID,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_GRID,
                payload:null
            })
        )
};

//add grid item
export const addGridItem = (gridId, gridItem) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`api/aacgrids/gridItem/${gridId}`, gridItem)
        .then(res =>
            dispatch({
                type:ADD_GRID_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        )
};

//
// //add comment
// export const addComment = (postId, newComment) => dispatch => {
//     dispatch(clearErrors());
//     axios
//         .post(`/api/posts/comment/${postId}`, newComment)
//         .then(res =>
//             dispatch({
//                 type:GET_POST,
//                 payload: res.data
//             })
//         )
//         .catch(err =>
//             dispatch({
//                 type:GET_ERRORS,
//                 payload:err.response.data
//             })
//         )
// };
//
// //delete comment
// export const deleteComment = (postId, commentId) => dispatch => {
//     axios
//         .delete(`/api/posts/comment/${postId}/${commentId}`)
//         .then(res =>
//             dispatch({
//                 type:GET_POST,
//                 payload: res.data
//             })
//         )
//         .catch(err =>
//             dispatch({
//                 type:GET_ERRORS,
//                 payload:err.response.data
//             })
//         )
// };
//
//set loading state
export const setGridLoading = () => {
    return {
        type:GRID_LOADING
    }
};
//clear errors
export const clearErrors = () => {
    return {
        type:CLEAR_ERRORS
    }
};