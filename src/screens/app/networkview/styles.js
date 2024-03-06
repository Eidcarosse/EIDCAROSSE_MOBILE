import { StyleSheet } from "react-native";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

  },
  text: {
    color: AppColors.black,
    fontSize: width(3.2),
    marginLeft: width(2),
    fontWeight: "bold",
  },
  image: { width: width(20), height: width(20), borderRadius: width(10) },
});
export default styles;
