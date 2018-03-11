import createStore from "vplan-redux";

const baseUrl = window && `${location.protocol}//${location.hostname}/api`;

const store = createStore({ baseUrl });

export default store;
