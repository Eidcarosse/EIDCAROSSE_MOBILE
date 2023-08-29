import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: width(2),
  },
  card: {
    width: width(45),
    margin: width(1),
    borderRadius: width(2),
    alignSelf: "center",
    backgroundColor: "white",
  },
  filterview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  modalcontainer:{
    height:height(80),
    width:width(96),
    backgroundColor:'white',
    position:'absolute',
    bottom:-width(3),
    left:-width(3),
    borderTopLeftRadius:width(10),
    borderTopRightRadius:width(10)
  }
});
export default styles;
