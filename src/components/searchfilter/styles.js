import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    padding: width(4),
    paddingBottom:height(10)
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
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
    backgroundColor: "white",
  },
  dropdown: { borderRadius: width(1), width: width(90) },
  price: {
    width: width(40),
    backgroundColor: AppColors.grey,
    borderBottomWidth: 0,
    borderRadius:width(1)
  },
});
export default styles;
