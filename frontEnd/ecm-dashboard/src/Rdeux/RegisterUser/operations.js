import { registerUser } from "../../API/AllApi"
import { actions } from "./actions";
export const addUser = (user) => async dispatch => {
    try{
        const response = await registerUser(user);
        dispatch(actions(response));
        console.log("User has been added");
    }
    catch(err)
    {
        console.log(err)
    }
}