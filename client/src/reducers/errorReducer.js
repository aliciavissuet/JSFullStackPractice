import { GET_ERRORS} from "../actions/types";

const initialState = {};


export default function (state = initialState, action){
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;//payload includes errors object which comes from server//just putting errors into redux state
        default:
            return state;

    }
}