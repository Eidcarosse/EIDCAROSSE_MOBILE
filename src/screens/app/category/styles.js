import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: width(2),
    paddingBottom: width(17),
  },
  card: {
    width: width(30),
    height: height(18),
    margin: width(1),
    borderRadius: width(2),
    alignSelf: "center",
    backgroundColor: AppColors.white,
    padding: width(2),
    justifyContent: "space-between",
  },
  greybackground: {
    backgroundColor: AppColors.white,
    elevation: 0,
  },
  textStyle: {
    width: width(30),
    textAlign: "center",
    fontSize: width(4),
  },
});
export default styles;
