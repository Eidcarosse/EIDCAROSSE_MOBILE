import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingBottom: height(2),
  },
  imageview: {
    width: width(100),
    backgroundColor: AppColors.transparent,
  },
  image: {
    width: width(95),
    height: height(30),
  },
  cfpview: {
    backgroundColor: AppColors.grey,
    padding: width(2),
    borderRadius: width(1),
  },
  cfp: {
    fontSize: width(3.5),
    color: AppColors.primary,
    fontWeight: "bold",
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
  cardelement: { fontSize: width(3.5), flex: 1, fontWeight: "bold" },
  cardelement2: { fontSize: width(3.5), flex: 1 },
  profileview: { padding: width(4) },
  profilecard: {
    padding: width(2),
    backgroundColor: AppColors.white,
    borderRadius: width(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profilecardin: {
    justifyContent: "space-between",
    alignItems: "center",
    alignItems: "flex-start",
  },
  profileimage: {
    width: width(15),
    height: width(15),
    borderRadius: width(10),
    borderColor: AppColors.black,
    borderWidth: width(0.5),
  },
  map: {
    height: height(25),
    width: width(90),
    alignSelf: "center",
    borderRadius: width(3),
  },
  contact: {
    paddingLeft: width(5),
    flexDirection: "row",
    alignContent:'center',
    alignItems:'center',
  },
  modelImage: {
    width: width(90),
    height: height(60),
    marginTop: height(1),
    // alignSelf: "center",
  },
  modelView: {
    width: width(90),
    height: height(80),
    backgroundColor: AppColors.lightGrey,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
export default styles;
