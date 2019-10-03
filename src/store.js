import React, { createContext, useReducer, useContext } from "react";
import reducer, { initialState } from "./reducer";

const customMiddleware = store => next => action => {
  console.log("Action Triggered");
  console.log(action);
  next(action);
};

const Store = createContext();

const compose = (...funcs) => x =>
  funcs.reduceRight((composed, f) => f(composed), x);

const createStore = (reducer, initialState, middlewares) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (typeof middlewares !== "undefined") {
    // return middlewares(createStore)(reducer, initialState);
    const middlewareAPI = {
      getState: () => state,
      dispatch: action => dispatch(action)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    const enhancedDispatch = compose(...chain)(dispatch);
    return { state, dispatch: enhancedDispatch };
  }

  return { state, dispatch };
};

const Provider = ({ children }) => {
  const store = createStore(reducer, initialState, [customMiddleware]);
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
        {...props}
      />
    );
  };
};

export { connect, Store, Provider };
