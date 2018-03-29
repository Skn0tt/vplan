import { compose, createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import sagas from "./sagas";
import {
  autoRehydrate,
  persistStore,
  createTransform
} from "redux-persist-immutable";
import { AppState } from "./types";
import { AsyncStorage } from "react-native";
import { config } from "./";
import { asyncLocalStorage } from "redux-persist/storages";

const rootReducer = combineReducers({
  root: reducer
});

const composeEnhancers = composeWithDevTools({
  name: "vplan-app"
});

const logger = createLogger({
  stateTransformer: state => state.toJS()
});

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, logger),
  autoRehydrate()
);

const removeUnneededTransform = createTransform(
  (inboundState, key) =>
    key === "root"
      ? inboundState.delete("loading").delete("errors")
      : inboundState
);

const store = createStore(reducer, enhancer);

let persistor;

export const persist = () =>
  (persistor = persistStore(store, {
    storage: config.storage || asyncLocalStorage,
    transforms: [removeUnneededTransform]
  }));

sagaMiddleware.run(sagas);

export default store;
