import {ADD_GRID, GRID_LOADING, GET_GRIDS, GET_GRID, ADD_GRID_ITEM, DELETE_GRID} from "../actions/types";

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
        case DELETE_GRID:
            return {
                ...state,
                grids: state.grids.filter(grid => grid._id !== action.payload)
            };
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