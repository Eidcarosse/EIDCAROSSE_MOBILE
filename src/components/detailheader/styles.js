import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary, //"rgba(128, 128, 128,5)",
    width: width(100),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height(2.5),
  },
  menuicon: {
    paddingLeft: width(5),
    flexDirection: "row",
    alignItems: "center",
  },
  textdetail: {
    color: AppColors.white,
    fontWeight: "bold",
    fontSize: width(5),
    marginLeft: width(3),
  },
});
export default styles;
