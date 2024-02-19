import { Platform, StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingBottom: height(7),
  },
  imageiner: {
    padding:height(1)
  },

  avatar: {
    width: height(15),
    height: height(15),
    borderRadius: width(20),
    borderWidth: height(0.5),
    borderColor: AppColors.greybackground,
    alignSelf:'center'
  },

  container: {
    backgroundColor: AppColors.white,
    width: width(95),
    justifyContent: 'space-between',
    paddingVertical: height(2),
    marginVertical: height(0),
    borderRadius: width(1),
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  texticon: {
    color: "black",
    width: width(75),
    alignSelf: "flex-start",
    marginLeft: height(2),
    fontSize: height(1.8),
  },
  wishlistview: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:'center'
  },
  wcontainer: {
    backgroundColor: AppColors.white,
    width:width(45),
    alignContent:'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  wtexticon: {
    color: "black",
    fontSize: height(2),
    margin: height(1),
    paddingHorizontal:height(1)
  },
  ptext: {
    fontSize: height(1.5),
    fontWeight: "bold",
    color: AppColors.black,
    margin: height(.3),
  },
});
export default styles;
