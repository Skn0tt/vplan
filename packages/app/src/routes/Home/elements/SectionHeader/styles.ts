import { StyleSheet } from "react-native";
import * as util from "vplan-util";

const radius = 44;

export default StyleSheet.create({
  container: {
    paddingLeft: 14,
    paddingVertical: 14,
    backgroundColor: util.white + "DC"
  },
  text: {
    color: util.lightGray,
    fontWeight: "bold"
  }
});
