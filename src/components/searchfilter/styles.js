import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    padding: width(4),
    paddingBottom: height(10),
  },
  title: {
    fontSize: width(3.5),
    paddingVertical: width(2),
    fontWeight: "bold",
  },
  searchbox: {
    width: width(90),
    borderRadius: width(1),
    // borderWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
    backgroundColor:AppColors.greybackground,
  },
  dropdown: { borderRadius: width(1), width: width(90) },
  price: {
    width: width(40),
    backgroundColor: AppColors.greybackground,
    borderBottomWidth: 0,
    borderRadius: width(1),
  },
});
export default styles;
