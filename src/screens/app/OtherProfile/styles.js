import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    flex:1,
    backgroundColor: AppColors.white,
  },
  imageiner: {
    height: height(20),
    justifyContent: "space-around",
    marginBottom: height(3),
  },
  avatar: {
    width: height(10),
    height: height(10),
    borderRadius: width(20),
    marginLeft: width(10),
    borderColor:AppColors.white,
    borderWidth:height(0.3)
  },
  card: {
    width: width(95),
    margin: width(1),
    borderRadius: width(2),
    alignSelf: "center",
    backgroundColor: AppColors.white,
    padding: width(4),
  },
  container: {
    backgroundColor: AppColors.white,
    width: width(90),
    justifyContent: "flex-start",
    paddingVertical: width(5),
    marginVertical: width(2),
    borderRadius: width(1),
  },
  texticon: {
    color: "black",
    width: width(70),
    alignSelf: "flex-start",
    marginLeft: width(4),
  },
  wishlistview: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom:height(1)
  },
  wcontainer: {
    backgroundColor: AppColors.white,
    padding: width(1),
  },
  wtexticon: {
    color: AppColors.primary,
    fontSize: height(1.5),
  },
});
export default styles;
