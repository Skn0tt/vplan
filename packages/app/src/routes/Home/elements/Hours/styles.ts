import { StyleSheet } from "react-native";

const radius = 44;

export default StyleSheet.create({
  circle: {
    width: radius,
    height: radius,
    borderRadius: radius / 2
  },
  whiteText: { color: "white" },
  blackText: { color: "black" },
  white: { backgroundColor: "white" },
  deepOrange500: { backgroundColor: "#FF5722" },
  blue500: { backgroundColor: "#2196F3" },
  blue900: { backgroundColor: "#0D47A1" },
  lightBlue500: { backgroundColor: "#03A9F4" },
  cyan500: { backgroundColor: "#00BCD4" },
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
