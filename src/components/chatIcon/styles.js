import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import { he } from "date-fns/locale";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    width: width(93),
    borderRadius: width(2),
    alignItems:'center',
    marginVertical:height(.2),
  },
  imageview: {
    width: width(23),
  },
  image: {
    width: width(17),
    height: width(17),
    borderRadius: width(10),
    borderWidth:width(.3),
    borderColor:AppColors.primary
  },
  detail: {
    width: width(47),
    alignItems: "flex-start",
    justifyContent:"center",
    marginTop:height(1)
  },
  icons: {
    paddingVertical: width(2),
    width: width(20),
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
export default styles;
