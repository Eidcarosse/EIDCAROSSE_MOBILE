import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    width: width(47),
    backgroundColor: AppColors.white,
    borderRadius: width(1),
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
    margin: width(1),
    justifyContent:'space-between'
  },
  imageview: {
    width: width(47),
  },
  image: {
    width: width(47),
    height: width(30),

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
