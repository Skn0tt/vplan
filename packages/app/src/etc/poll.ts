import * as BackgroundFetch from "react-native-background-fetch";
import App, { store } from "../App";
import {
  AppState,
  isTeacher,
  fetchEntries,
  fetchEntriesTeacher,
  fetchEntriesStudent,
  isLoading,
  diff,
  getOwnEntries,
  isMarked
} from "vplan-redux";
import { Entry } from "vplan-types";
import { notify, setBadge } from "./push";

const wait = (t: number) => new Promise(resolve => setTimeout(resolve, t));

const complete = () =>
  new Promise(resolve => {
    store.subscribe(() => {
      if (!isLoading(store.getState() as AppState)) {
        resolve();
      }
    });
  });

const routine = async (): Promise<void> => {
  console.log("[js] Background poll started");

  const oldState = store.getState() as AppState;

  if (isTeacher(oldState)) {
    store.dispatch(fetchEntriesTeacher());
  } else {
    store.dispatch(fetchEntriesStudent());
  }

  await wait(50);

  await complete;

  const newState = store.getState() as AppState;

  const newEntries = diff(getOwnEntries(oldState), getOwnEntries(newState));

  const markedNewEntries = newEntries.filter(v => isMarked(v.class)(newState));

  setBadge(markedNewEntries.length);

  markedNewEntries.forEach(notify);

  BackgroundFetch.finish();
};

const start = (): void => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true
    },
    routine,
    (error: Error) => console.log("[js] RNBackgroundFetch failed to start")
  );

  console.log("[js] RNBackgroundFetch configured");
};

export default start;
