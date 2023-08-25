import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    width: width(46),
    backgroundColor: AppColors.white,
    borderRadius: width(1),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: width(1),
  },
  imageview: {
    width: width(46),
  },
  image: {
    width: width(46),
    height: width(35),

  },
  detail: {
    width: width(46),
    justifyContent: "space-between",
    padding: width(2),
    alignItems: "flex-start",
  },
  icons: {
    width:width(46),
    justifyContent: "space-between",
    flexDirection:'row',
    padding:width(2),
    alignItems:'center'
  },
});
export default styles;
