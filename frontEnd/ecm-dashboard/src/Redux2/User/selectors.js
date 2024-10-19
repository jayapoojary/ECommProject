import { createSelector } from 'reselect';
import DomainName from './name';

export default (parentSelector = state => state) => {
    const feature = createSelector(parentSelector, state => state[DomainName]);

    const registeredUser = createSelector(
        feature,
        state => state['user']
    );
    const productsList = createSelector(
        feature,
        state => state['products']
    );
    return {
        registeredUser,
        productsList
    };

};