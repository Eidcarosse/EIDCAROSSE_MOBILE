import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    width: width(93),
    backgroundColor: AppColors.white,
    borderRadius: width(2),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: width(1),
  },
  imageview: {
    width: width(35),
  },
  image: {
    width: width(35),
    height: width(38),
    borderRadius: width(2),
  },
  detail: {
    width: width(42),
    justifyContent: "space-between",
    padding: width(2),
    alignItems: "flex-start",
  },
  icons: {
    paddingVertical: width(2),
    width: width(12),
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
export default styles;
