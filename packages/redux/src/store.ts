import { compose, createStore, applyMiddleware, StoreEnhancer } from "redux";
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
import { AppState, IAppState } from "./types";
import { config } from "./";
import { asyncLocalStorage } from "redux-persist/storages";
import { Map } from "immutable";

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

const initialState = new AppState({});
const keysToRemove: (keyof IAppState)[] = ["loading", "errors"];
const removeUnneededTransform = createTransform(
  (inboundState: AppState, key: keyof IAppState) =>
    keysToRemove.includes(key) ? initialState.get(key) : inboundState
);

const store = createStore(reducer, enhancer as StoreEnhancer<any>);

let persistor;

export const persist = () =>
  new Promise((resolve, reject) => {
    persistor = persistStore(
      store,
      {
        storage: config.storage || asyncLocalStorage,
        transforms: [removeUnneededTransform]
      },
      resolve
    );
  });

sagaMiddleware.run(sagas);

export default store;
