import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import rootReducer from "../CommonReducer/reducer";
import reducer from '../../../Redux2/reducer'
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;