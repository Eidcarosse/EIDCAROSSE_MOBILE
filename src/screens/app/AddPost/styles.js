import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: 'center',
    padding:width(5),
    backgroundColor:AppColors.white,
    flexBasis:'auto'
  },
  title: {
    fontSize: width(3.5),
    paddingVertical: width(2),
    paddingLeft:width(2),
    fontWeight: "bold",
  },
  searchbox: {
    width: width(90),
    borderRadius: width(1),
    // borderWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dropdown: { borderRadius: width(1), width: width(90) },
  price: {
    backgroundColor: AppColors.greybackground,
    borderBottomWidth: 0,
    borderRadius:width(1)
  },
});
export default styles;
