import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, createTransform, PersistConfig } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import sagas from "./sagas";
import { AppState } from "./types";

const immutableTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState: AppState, key) => inboundState.toJS(),
  // transform state being rehydrated
  (outboundState, key) => new AppState(outboundState)
);

const persistConfig: PersistConfig = {
  key: "root",
  transforms: [immutableTransform],
  storage
};

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  new AppState({}),
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(sagas);

export default store;
