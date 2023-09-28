import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    width: width(100),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuicon: {
    paddingLeft: width(5),
  },
  image: {
    width: width(40),
    height: width(20),
    marginLeft: -width(15),
  },
});
export default styles;
