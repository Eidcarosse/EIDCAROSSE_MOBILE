import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    width: width(100),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: height(2),
    alignItems: "center",
  },
  menuicon: {},
  image: {
    width: height(6),
    height: height(6),
    borderRadius: height(1),
    marginVertical:height(.5)
  },
});
export default styles;
