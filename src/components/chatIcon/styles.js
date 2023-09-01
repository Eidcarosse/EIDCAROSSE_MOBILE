import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    width: width(93),

    borderRadius: width(2),
    alignItems:'center',
    marginVertical: width(1),
  },
  imageview: {
    width: width(23),
  },
  image: {
    width: width(20),
    height: width(20),
    borderRadius: width(10),
  },
  detail: {
    width: width(47),
    alignItems: "flex-start",
    justifyContent:'space-evenly',
    height:width(15),
  },
  icons: {
    paddingVertical: width(2),
    width: width(20),
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
export default styles;
