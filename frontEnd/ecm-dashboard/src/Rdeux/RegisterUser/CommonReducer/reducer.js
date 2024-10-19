import { combineReducers } from "redux";
import { registerUserReducer } from "../reducer";

const rootReducer = combineReducers({
    register: registerUserReducer,
});

export default rootReducer;