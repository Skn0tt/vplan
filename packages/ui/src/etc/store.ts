import createStore from "vplan-redux";

const baseUrl = window && `${location.protocol}//${location.hostname}/api`;

const store = createStore({
  baseUrl,
  storage: window.localStorage
});

export default store;
