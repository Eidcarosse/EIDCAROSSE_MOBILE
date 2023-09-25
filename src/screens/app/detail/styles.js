import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  imageview: {
    width: width(100),
    backgroundColor: AppColors.transparent,
  },
  image: {
    width: width(95),
    height: height(30),
  },
  nameview: {
    padding: width(4),
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderColor: "grey",
  },
  detailview: {
    padding: width(4),
  },
  detailcard: {
    padding: width(4),
    backgroundColor: "#E5E8E84D",
    borderRadius: width(2),
  },
  cardrow: { flexDirection: "row", flex: 1, marginVertical: width(3) },
  cardelement: { fontSize: width(3.5), flex: 1 ,fontWeight:'bold'},
  cardelement2: { fontSize: width(3.5), flex: 1 },
  profileview: { padding: width(4) },
  profilecard: {
    padding: width(2),
    backgroundColor: "#E5E8E84D",
    borderRadius: width(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilecardin: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileimage: {
    width: width(12),
    height: width(12),
    borderRadius:width(10)
  },
  map: {
    height: height(25),
    width: width(90),
    alignSelf: "center",
  },
  contact: {
    paddingLeft: width(4),
    flexDirection: "row",

  },
});
export default styles;
