import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: width(2),
    paddingBottom: width(15),
    backgroundColor: AppColors.white,
  },
  card: {
    width: width(45),
    margin: width(1),
    borderRadius: width(2),
    alignSelf: "center",
    backgroundColor: "white",
    padding:width(2)
  },
});
export default styles;
