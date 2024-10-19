import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducerRegistry from './reducerRegistry';

// can come from somewhere
const initialState = {};

export const middlewares = [thunk];

export const composeEnhancers =
  window && process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export const CLEAR = { type: 'CLEAR' };

const getResetState = reducers =>
  Object.entries(reducers).reduce(
    (acc, [key, { options }]) =>
      options.preventClear ? acc : { ...acc, [key]: undefined },
    {}
  );

export const combine = reducers => {
  // Preserve initial state for not-yet-loaded reducers
  Object.keys(initialState).forEach(key => {
    reducers[key] = reducers[key] || { reducer: (state = null) => state };
  });

  const combined = combineReducers(
    Object.entries(reducers).reduce(
      (acc, [name, { reducer }]) => ({
        ...acc,
        [name]: reducer,
      }),
      {}
    )
  );

  return (state, action) =>
    combined(
      action === CLEAR ? { ...state, ...getResetState(reducers) } : state,
      action
    );
};

export const store = createStore(
  combine(reducerRegistry.getReducers()),
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener(reducers =>
  store.replaceReducer(combine(reducers))
);

export default store;
