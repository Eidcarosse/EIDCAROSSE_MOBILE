import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    width: width(90),
    borderRadius: width(2),
    padding: width(1),
    flexDirection: "row",
    borderWidth: width(0.2),
    alignItems:'center',

  },
});
export default styles;
