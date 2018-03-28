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

const complete = () =>
  new Promise(resolve => {
    store.subscribe(() => {
      if (!isLoading(store.getState() as AppState)) {
        resolve();
      }
    });
  });

export const onNewEntriesReceived = (entries: Entry[]) => {
  entries.forEach(notify);
  setBadge(entries.length);
};

const routine = async (): Promise<void> => {
  console.log(" [bf] Background poll started");

  if (isTeacher(store.getState() as AppState)) {
    store.dispatch(fetchEntriesTeacher());
  } else {
    store.dispatch(fetchEntriesStudent());
  }

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
    (error: Error) => console.log(" [js] RNBackgroundFetch failed to start")
  );

  BackgroundFetch.status(status => {
    switch (status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        console.log(" [bf] BackgroundFetch restricted");
        break;
      case BackgroundFetch.STATUS_DENIED:
        console.log(" [bf] BackgroundFetch denied");
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        console.log(" [bf] BackgroundFetch is enabled");
        break;
    }
  });
};

export default start;
