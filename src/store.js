import React, { createContext, useReducer, useContext } from "react";
import reducer, { initialState } from "./reducer";

/* const customMiddleware = store => next => action => {
  console.log("Middleware:", action);
  next(action);
}; */

const Store = createContext();

const createStore = (reducer, initialState, injectables) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

/* const applyMiddleware = (...middlewares) => {
  return createStore => {
    return (reducer, initialState, injectables) => {
      const store = createStore(reducer, initialState, injectables);
      const dispatch = store.dispatch;

      const middlewareAPI = {
        dispatch: (action) => dispatch(action),
      }

      const chain = middlewares.map(middleware => middleware(middlewareAPI)) 
    }
  }
} */

const Provider = ({ children }) => {
  const store = createStore(reducer, initialState);
  return <Store.Provider value={store}>{children}</Store.Provider>;
};

const connect = (
  mapStateToProps = () => {},
  mapDispatchToProps = () => {}
) => WrappedComponent => {
  return props => {
    const { dispatch, state } = useContext(Store);
    return (
      <WrappedComponent
        dispatch={dispatch}
        {...mapStateToProps(state, props)}
        {...mapDispatchToProps(dispatch)}
      />
    );
  };
};

export { connect, Store, Provider };
