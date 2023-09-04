import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: "center",
    padding: width(1),
    paddingBottom: width(15),
    flex:1,
    backgroundColor: AppColors.white,
  },
 
});
export default styles;