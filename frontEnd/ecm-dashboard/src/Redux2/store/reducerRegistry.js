// allows feature isolation by allowing reducers to be added at runtime
// http://nicolasgallagher.com/redux-modules-and-code-splitting/

const DEFAULT_REDUCER = state => state || null;

export class ReducerRegistry {
  constructor() {
    this._emitChange = null;

    this._reducers = {};
  }

  getReducers() {
    // default reducer so redux doesn't complain
    // if no reducers have been registered on startup
    if (!Object.keys(this._reducers).length) {
      return { __: { reducer: DEFAULT_REDUCER } };
    }

    return { ...this._reducers };
  }

  register(name, reducer, options = {}) {
    if (this._reducers.name && this._reducers.name !== reducer) {
      throw new Error(`${name} has already been registered`);
    }

    this._reducers = { ...this._reducers, [name]: { reducer, options } };
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    this._emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
