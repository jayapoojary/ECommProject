import Actions from './actions'

const intialState = {
    user: null,
    products: null,
    searchedProducts: null,
}

const reducer = (state = intialState, action) => {
    switch(action.type)
    {
        case Actions.REGISTER_NEW_USER:
            return {
                ...state,
                user: action.payload,
            }
        case Actions.GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case Actions.GET_SEARCH_PRODUCTS:
            return {
                ...state,
                searchedProducts: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;