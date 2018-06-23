import * as PushNotification from "react-native-push-notification";
import { PushNotificationIOS } from "react-native";
import { AnyEntry } from "vplan-types";
import { text, secondaryText } from "vplan-util";

export const notify = (entry: AnyEntry) => {
  PushNotification.localNotification({
    title: text(entry),
    message: secondaryText(entry)
  });
};

export const start = () => {
  PushNotification.configure({
    onNotification: (notification: any) => {
      console.log(" [pn] notification: ", notification);

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  });
};
