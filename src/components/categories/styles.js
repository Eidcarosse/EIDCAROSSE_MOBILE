import { Platform, StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";

const styles = StyleSheet.create({
  main: {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
    backgroundColor: "white",
    borderRadius: height(1),
    paddingHorizontal: height(2.5),
    paddingVertical: height(2),
    margin: height(1),
    alignItems: "center",
    alignSelf: "center",
    width: width(27),
  },
  text: {
    alignSelf: "center",
    fontSize: width(2.5),
    fontWeight: "bold",
  },
  image: { height: width(13), width: width(13) },
});
export default styles;
