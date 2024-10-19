import { combineReducers } from "redux";
import {
    name as registerdUser,
    reducer as registerReducer
} from './User';

export default combineReducers({
    [registerdUser]: registerReducer,
});