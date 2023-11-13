import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    width: width(96),
    backgroundColor: AppColors.white,
    borderRadius: width(1),
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
    margin: width(1),
    justifyContent: "space-between",
  },
  imageview: {
    width: width(96),
    height: width(50),
  },
  image: {
    width: width(100),
    height: width(50),
    resizeMode:'contain'
  },
  detail: {
    width: width(96),
    justifyContent: "space-between",
    padding: width(2),
  },
  cfpview: {
    backgroundColor: AppColors.grey,
    padding: width(2),
    borderRadius: width(1),
  },
  cfp: {
    fontSize: width(3),
    color: AppColors.primary,
    fontWeight: "bold",
  },
  detailinerview: {
    paddingBottom: width(5),
    flexDirection: "row",
    width: width(43),
    justifyContent: "space-between",
  },
  chf: {
    fontSize: width(4),
    color: AppColors.primary,
    fontWeight: "bold",
  },
  eur: {
    fontSize: width(3),
    color: "grey",
    fontWeight: "bold",
  },
  icons: {
    width: width(96),
    justifyContent: "space-between",
    flexDirection: "row",
    padding: width(2),
    alignItems: "center",
  },
  titletext: {
    fontSize: width(4),
    marginVertical: width(2),
    fontWeight: "bold",
  },
  categoryview: { flexDirection: "row", alignItems: "center" },
  categorytext: {
    fontSize: width(3),
    marginLeft: width(2),
    width: width(35),
    marginVertical: width(0.5),
  },
});
export default styles;
