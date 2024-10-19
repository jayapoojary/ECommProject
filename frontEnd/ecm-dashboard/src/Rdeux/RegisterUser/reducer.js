import { REGISTER_USER } from "./actions";

const intialValue = {
    user: null,
}

export const registerUserReducer = (state = intialValue, action) => {
    switch(action.type)
    {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }
        default: 
            return state
    }
}