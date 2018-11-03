import { createStore, compose, applyMiddleware } from "redux";
import root from "./reducers/root";
import thunk from "redux-thunk";

const middleware = [thunk];
const store = createStore(
  root,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
