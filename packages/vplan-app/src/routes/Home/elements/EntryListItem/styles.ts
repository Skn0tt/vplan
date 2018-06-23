import { StyleSheet } from "react-native";
import * as util from "vplan-util";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12
  },
  marked: {
    backgroundColor: util.deepOrange500
  },
  hours: {
    paddingTop: 10
  },
  item: {
    flex: 1,
    flexDirection: "column",
    padding: 12
  },
  whiteText: {
    color: util.white
  },
  title: {
    fontSize: 16,
    paddingBottom: 6
  },
  subTitle: {
    fontSize: 12,
    color: util.lightGray
  }
});
