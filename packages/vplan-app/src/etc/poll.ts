import * as BackgroundFetch from "react-native-background-fetch";
import App from "../App";
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
import { AnyEntry } from "vplan-types";
import { notify } from "./push";
import { store } from "../App";

const complete = () =>
  new Promise(resolve => {
    store.subscribe(() => {
      if (!isLoading(store.getState())) {
        resolve();
      }
    });
  });

export const onNewEntriesReceived = (entries: AnyEntry[]) =>
  entries.forEach(notify);

const routine = async (): Promise<void> => {
  console.log(" [bf] Background poll started");

  if (isTeacher(store.getState())) {
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

  BackgroundFetch.status((status: any) => {
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
