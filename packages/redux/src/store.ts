import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import sagas from "./sagas";
import { AppState } from "./types";

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(sagas);

export default store;
