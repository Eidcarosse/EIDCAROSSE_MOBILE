import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  categorytext: {
    fontSize: width(4),
    fontWeight: "bold",
    marginVertical: width(2),
  },
  textseeall: {
    fontSize: width(3),
    fontWeight: "bold",
    marginTop: height(2),
    color: "grey",
  },
  titleview: {
    justifyContent: "space-between",
    padding: width(1),
    flexDirection: "row",
    width: width(95),
  },
  listicon: {
    borderRadius: width(2),
  },
});
export default styles;
