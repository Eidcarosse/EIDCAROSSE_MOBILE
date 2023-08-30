import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    height: height(20),
  },
  titleview: {
    justifyContent: "space-between",
    padding: width(1),
    flexDirection: "row",
    width: width(90),
  },
  listicon: {
    borderRadius: width(2),
  },
});
export default styles;
