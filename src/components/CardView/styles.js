import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    width: width(95),
    backgroundColor: AppColors.white,
    borderRadius: width(2),
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
    marginVertical: width(1),
  },
  titletext: {
    fontWeight: "bold",
    fontSize: width(4),
    paddingBottom: width(1),
  },
  categoryview: { flexDirection: "row", alignItems: "center" },
  detailtext: {
    fontSize: width(3),
    marginLeft: width(2),
    width: width(34),
    marginVertical: width(0.5),
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
  cfpview:{
    backgroundColor:AppColors.grey,
    padding:width(2),
    borderRadius:width(1)
  },
  cfp: {
    fontSize: width(3),
    color: AppColors.primary,
    fontWeight: "bold",
  },
  space: { paddingVertical: width(1) },
  imageview: {
    width: width(45),
    height: width(40),
  },
  image: {
    width: width(45),
    height: width(40),
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
    width: width(7),
    justifyContent: "space-between",
    alignItems: "center",
  },
  textcategory: {
    fontSize: width(3),
    marginLeft: width(2),
    width: width(35),
  },
});
export default styles;
