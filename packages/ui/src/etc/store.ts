import createStore, { AppState } from "vplan-redux";
import { Store } from "redux";

const baseUrl = window && `${location.protocol}//${location.hostname}/api`;

export let store: Store<AppState>;

export async function init() {
  store = await createStore({
    baseUrl
  });
}
