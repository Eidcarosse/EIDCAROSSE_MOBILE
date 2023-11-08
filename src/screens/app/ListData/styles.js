import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: width(2),
    paddingBottom: height(2),
  },
  search: {
    width: width(98),
    borderRadius: width(2),
    padding: width(1),
    flexDirection: "row",
    borderWidth: width(.1),
    alignItems: "center",
  },
  card: {
    width: width(44),
    margin: width(1),
    borderRadius: width(2),
    alignSelf: "center",
    backgroundColor: AppColors.white,
  },
  filterview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalcontainer: {
    height: height(80),
    width: width(96),
    backgroundColor: AppColors.white,
    position: "absolute",
    bottom: -width(3),
    left: -width(3),
    borderTopLeftRadius: width(10),
    borderTopRightRadius: width(10),
  },

  totalview: {
    width: width(90),
    alignSelf: "center",
    paddingTop: width(3),
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  totaltext: {
    color: AppColors.primary,
    fontWeight: "bold",
    fontSize: width(4),
  },
  iconview: {
    flexDirection: "row",
    width: width(25),
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  flatlist: {
    marginBottom: width(10),
    marginVertical: height(2),
    width: width(98),
  },
  emptyview: {
    height: height(100),
    alignItems: "center",
    marginTop: height(25),
  },
  emptyimage: { height: width(50), width: width(60) },
  bs: {
    wrapper: {
      backgroundColor: "transparent",
    },
    container: {
      borderTopLeftRadius: width(8),
      borderTopRightRadius: width(8),
      borderWidth: width(0.1),
      borderBlockColor: AppColors.primary,
    },
    draggableIcon: {
      backgroundColor: "#000",
    },
  },
  container: {
    padding: width(4),
    paddingBottom: height(8),
  },
  title: {
    fontSize: width(3.5),
    paddingVertical: width(2),
    fontWeight: "bold",
  },
  searchbox: {
    width: width(90),
    borderRadius: width(1),
    // borderWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
    backgroundColor: AppColors.greybackground,
  },
  dropdown: { borderRadius: width(1), width: width(90) },
  price: {
    width: width(40),
    backgroundColor: AppColors.greybackground,
    borderBottomWidth: 0,
    borderRadius: width(1),
  },
});
export default styles;
