import * as PushNotification from "react-native-push-notification";
import { PushNotificationIOS } from "react-native";
import { Entry } from "vplan-types";
import { text, secondaryText } from "vplan-util";

export const notify = (entry: Entry) =>
  PushNotification.localNotification({
    title: text(entry),
    message: secondaryText(entry)
  });

export const setBadge = (i: number) =>
  PushNotification.setApplicationIconBadgeNumber(i);

const start = () => {
  PushNotification.configure({
    onNotification: notification => {
      console.log("NOTIFICATION:", notification);

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  });

  setBadge(0);
};

export default start;
