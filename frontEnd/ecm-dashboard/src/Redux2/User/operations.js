import { getAllProducts, registerUser, getBySearch } from "../../API/AllApi"
import Actions from "./actions";
export const addUser = (user) => async dispatch => {
    try{
        const response = await registerUser(user);
        dispatch(Actions.registerNewUser(response));
        console.log("User has been added");
        return response;
    }
    catch(err)
    {
        console.log(err)
    }
};

export const getProductsList = () => async dispatch => {
    try{
        const response = await getAllProducts();
        dispatch(Actions.getProducts(response));
    }
    catch(err)
    {
        console.log(err)
    }
}

export const getSearchProducts = (key) => async dispatch => {
    
    try{
        const response = await getBySearch(key)
        Actions.getSearchedProdusts(response);
        return response;
    }
    catch(e){
        console.log(e);
    }
}