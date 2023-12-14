import { StyleSheet } from "react-native";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: width(2),
    paddingBottom: height(10),
  },
  search: {
    width: width(98),
    borderRadius: width(2),
    padding: width(1),
    flexDirection: "row",
    borderWidth: width(0.1),
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
    width: width(10),
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  flatlist: {
    marginBottom: height(8),
    marginVertical: height(2),
    width: width(98),
  },
  emptyview: {
    height: height(100),
    alignItems: "center",
    marginTop: height(25),
  },
  emptyimage: { height: width(70), width: width(70) },
  bs: {
    wrapper: {
      backgroundColor: "rgba(0,0,0,.3)",
    },
    container: {
      borderTopLeftRadius: width(2),
      borderTopRightRadius: width(2),
      borderWidth: width(0.1),
      borderBlockColor: AppColors.primary,
    },
    draggableIcon: {
      backgroundColor: "#000",
    },
  },
  container: {
    padding: width(4),
    paddingBottom: height(15),
    justifyContent: "space-between",
  },
  containerb: {
    backgroundColor: AppColors.greybackground,
    width: width(90),
    justifyContent: "flex-start",
    paddingVertical: width(5),
    marginVertical: width(2),
    borderRadius: width(1),
  },
  texticon: {
    color: "black",
    width: width(70),
    alignSelf: "flex-start",
  },
  title: {
    fontSize: width(3.5),
    paddingVertical: width(2),
    fontWeight: "bold",
    marginLeft: width(1),
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
  sub: {
    backgroundColor: AppColors.greybackground,
    borderBottomWidth: 0,
    borderRadius: width(1),
  },
});
export default styles;
