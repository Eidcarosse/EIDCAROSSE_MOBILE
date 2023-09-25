import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(128, 128, 128,5)",
    width: width(100),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height(2),
  },
  menuicon: {
    paddingLeft: width(5),
  },
});
export default styles;
