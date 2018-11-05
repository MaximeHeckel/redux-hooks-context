import React, { useContext, useEffect } from "react";
import { connect, Store, Provider } from "./store";
import logo from "./logo.svg";
import "./App.css";

const mapStateToProps = (state, props) => ({
  message: `${state.data} ${props.extra}`
});

const mapDispatchToProps = dispatch => ({
  sendMsg: () => dispatch({ type: "RESET_DATA", payload: "null" })
});

const Data = props => {
  return (
    <div>
      {props.message}
      <button onClick={() => props.sendMsg()}>
        Reset From MapDispatchToProps Function
      </button>
    </div>
  );
};

const ConnectedData = connect(
  mapStateToProps,
  mapDispatchToProps
)(Data);

const Controls = () => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    if (!state.data) {
      dispatch({ type: "FETCH_DATA", payload: "Ready!" });
    }
  });

  return (
    <div>
      <button
        onClick={() =>
          dispatch({ type: "FETCH_DATA", payload: "Hello world!" })
        }
      >
        Fetch Data
      </button>
      <button onClick={() => dispatch({ type: "RESET_DATA", payload: null })}>
        Reset
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Provider>
        {/* This is an equivalent to the react-redux Provider component */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>React {React.version}</h1>
          <Controls />
          <ConnectedData extra="TEST" />
        </header>
      </Provider>
    </div>
  );
};

export default App;
