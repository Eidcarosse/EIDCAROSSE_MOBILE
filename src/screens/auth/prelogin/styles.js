import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    borderRadius: width(2),
    backgroundColor: AppColors.primary,
  },
  image: { width: width(85), alignSelf: "center", height: height(30) },
  text: { fontSize: 18, margin: width(10), fontWeight: "bold" },
});
export default styles;
