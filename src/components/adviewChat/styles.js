import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  container: {
    height: height(8),
    width: width(95),
    alignSelf: "center",
    borderRadius: width(3),
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: AppColors.white,
  },
  image: {
    width: width(25),
    height: height(8),
    borderRadius: width(3),
  },
  button: {
    backgroundColor: AppColors.primary,
    width: width(20),
    borderRadius: width(1),
    paddingVertical: width(1),
    padding: width(1),
    marginRight: width(2),
  },
  title: {
    fontSize: width(4),
    fontWeight: "bold",
  },
  textview: { padding: width(3), width: width(48) },
  price: {
    color: AppColors.primary,
    marginTop: width(2),
    fontSize: width(3.5),
    fontWeight: "bold",
  },
});
export default styles;
