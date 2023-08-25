import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primery,
    width: width(100),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
});
export default styles;
