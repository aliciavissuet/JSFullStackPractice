import { GET_ERRORS, CLEAR_ERRORS} from "../actions/types";

const initialState = {};


export default function (state = initialState, action){
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;//payload includes errors object which comes from server//just putting errors into redux state
        case CLEAR_ERRORS:
            return {};
        default:
            return state;

    }
}