import { featureSelector } from "./selectors";
import * as registerUserDomain from './User/index';
import Domain from './name';
import reducer from './reducer';




export const registerNewUser = {
    ...registerUserDomain,
    selectors: registerUserDomain.selectors(featureSelector),
};