import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main:{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  container: {
    backgroundColor: "#E5E8E8",
    borderRadius: height(10),
    padding:height(1),
    alignItems:'center',
    alignSelf:'center'
  },
  image: {
    padding: width(5),
    height: height(5),
    width: height(5),
  },
  text: {
    alignSelf: "center",
    padding:width(2),
    fontSize:width(2.5),
    fontWeight:'bold'
  },
});
export default styles;
