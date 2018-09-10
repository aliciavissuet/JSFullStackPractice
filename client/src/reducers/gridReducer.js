import {ADD_GRID, GRID_LOADING, GET_GRIDS, GET_GRID, ADD_GRID_ITEM} from "../actions/types";

const initialState = {
    grids:[],
    grid: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GRID_LOADING:
            return {
                ...state,
                loading:true
            };
        case GET_GRIDS:
            return {
                ...state,
                grids:action.payload,
                loading:false
            };

        case ADD_GRID:
            return {
                ...state, grids:[action.payload, ...state.grids]
            };
        // case DELETE_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.filter(post => post._id !== action.payload)
        //     };
        case GET_GRID:
            return{
                ...state,
                grid:action.payload,
                loading:false
            };
        case ADD_GRID_ITEM:
            return{
                ...state,
                grid:action.payload,
                loading:false
            };
        default:
            return state;
    }
}