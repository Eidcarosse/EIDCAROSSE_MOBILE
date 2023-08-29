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
    height:height(17),
    marginVertical: width(1),
  },
  imageview: {
    width: width(33),
  },
  image: {
    width: width(33),
    height: height(17),
    borderRadius: width(2),
  },
  detail: {
    width: width(38),
    justifyContent: "space-between",
    padding: width(2),
    alignItems: "flex-start",
  },
  icons: {
    paddingVertical: width(2),
    width: width(20),
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

});
export default styles;
