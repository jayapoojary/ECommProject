import name from "./name";
import { createActionName } from "../../utils/actions.utils";

class Actions  {
    static prefix = `[${name}]`;
  static createActionName = action => createActionName(Actions.prefix, action);

  static REGISTER_NEW_USER = Actions.createActionName(
        'REGISTER_NEW_USER'
    );
    static GET_ALL_PRODUCTS = Actions.createActionName(
        'GET_ALL_PRODUCTS'
    );
    static GET_SEARCH_PRODUCTS = Actions.createActionName(
        'GET_SEARCH_PRODUCTS'
    )
    static registerNewUser = payload => ({
        type: Actions.REGISTER_NEW_USER,
        payload,
    });

    static getProducts = payload => ({
        type: this.GET_ALL_PRODUCTS,
        payload
    });

    static getSearchedProdusts = payload => ({
        type: this.GET_SEARCH_PRODUCTS,
        payload
    });
}
export default Actions