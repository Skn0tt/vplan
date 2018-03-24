import { StyleSheet } from "react-native";
import * as util from "vplan-util";

const radius = 44;

export default StyleSheet.create({
  circle: {
    width: radius,
    height: radius,
    borderRadius: radius / 2
  },
  whiteText: { color: util.white },
  blackText: { color: util.black },
  white: { backgroundColor: util.white },
  deepOrange500: { backgroundColor: util.deepOrange500 },
  blue500: { backgroundColor: util.blue500 },
  blue900: { backgroundColor: util.blue900 },
  lightBlue500: { backgroundColor: util.lightBlue500 },
  cyan500: { backgroundColor: util.cyan500 },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: radius,
    height: radius,
    alignItems: "center",
    justifyContent: "center"
  }
});
