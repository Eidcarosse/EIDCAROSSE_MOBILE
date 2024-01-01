import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: "center",
    padding: width(1),
    backgroundColor: AppColors.white,
  },
  imageview: {
    backgroundColor: AppColors.grey,
    width: width(96),
    borderRadius: width(1),
  },
  container: {
    flexDirection: "column",
    padding: width(5),
    width: width(96),
    borderRadius: width(1),
    backgroundColor: AppColors.white,
    margin: width(1),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation:3
  },
  image: {
    height: height(18),
    resizeMode: "contain",
    margin: width(8),
  },
  title: {
    fontSize: width(4),
    fontWeight: "bold",
    color: "black",
    margin: width(5),
  },
  description: {
    fontSize: width(2.8),
  },
  dot: {
    width: width(2),
    height: width(2),
    borderRadius: width(2),
    margin: width(2),
    backgroundColor: "black",
  },
});
export default styles;
