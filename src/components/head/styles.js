import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    width: width(100),
    flexDirection:'row',
    alignItems:'center',
    alignItems:'center',
    alignContent:'center',
  },
  menuicon: {
    paddingHorizontal:width(5),
  },
});
export default styles;
