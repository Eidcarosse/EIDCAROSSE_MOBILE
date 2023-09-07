import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: 'center',
    padding:width(5),
    backgroundColor:AppColors.white
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: "white",
  },
  dropdown: { borderRadius: width(1), width: width(90) },
  price: {
    width: width(40),
    backgroundColor: AppColors.grey,
    borderBottomWidth: 0,
    borderRadius:width(1)
  },
});
export default styles;
