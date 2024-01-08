import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    flex:1,
    backgroundColor: AppColors.white,
    paddingBottom:height(7)
  },
  imageiner: {
    height: height(28),
    justifyContent: "space-around",
    margin: width(3),
  },

  avatar: {
    width: height(12),
    height: height(12),
    borderRadius: width(20),
    marginLeft: width(5),
    borderWidth:height(.5),
    borderColor:AppColors.white
  },
 
  container: {
    backgroundColor: AppColors.white,
    width: width(95),
    justifyContent: "flex-start",
    paddingVertical: height(2),
    marginVertical: height(1),
    borderRadius: width(1),
  },
  texticon: {
    color: "black",
    width: width(75),
    alignSelf: "flex-start",
    marginLeft: height(2),
    fontSize:height(1.8)
  },
  wishlistview: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  wcontainer: {
    backgroundColor: AppColors.white,
    flexDirection: "column",
    padding: width(1),
  },
  wtexticon: {
    color: "black",
    fontSize: 12,
    marginTop: height(1),
  },
  ptext: {
    fontSize: height(1.5),
    fontWeight: "bold",
    color: AppColors.white,
    padding: width(1),
  },
});
export default styles;
