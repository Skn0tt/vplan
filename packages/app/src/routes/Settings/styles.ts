import { StyleSheet } from "react-native";
import * as util from "vplan-util";
import { matchPath } from "react-router";

export default StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  item: {
    height: 50
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  developer: {
    flex: 2,
    flexDirection: "row"
  },
  imprint: {
    color: util.blue900
  }
});
