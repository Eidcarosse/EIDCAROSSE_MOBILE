import { Platform, StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: "center",
    padding: width(3),
    paddingBottom: width(17),
    backgroundColor: AppColors.white,
  },
  title: {
    color: AppColors.black,
    fontWeight: "bold",
    fontSize: width(4),
    marginBottom: height(2),
  },
  searchinput: {
    width: width(90),
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: width(1),
    padding: width(2),
  },
  search: {
    width: width(80),
    borderRadius: width(2),
    padding: width(1),
    flexDirection: "row",
    borderWidth: width(0.2),
    alignItems: "center",
  },
  titleview: {
    justifyContent: "space-between",
    padding: width(1),
    flexDirection: "row",
    width: width(95),
  },
  dropdown: { borderRadius: width(1), width: width(90), borderWidth: 0 },
  notfoundview: {
    width: width(90),
    height: height(55),
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
