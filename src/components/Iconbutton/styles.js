import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: width(3),
    backgroundColor: AppColors.primery,
    alignSelf: 'center',
    paddingVertical: height(1),
    paddingHorizontal: height(2),

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    flexDirection:'row'
  },
  text: {
    color: AppColors.white,
    fontSize: width(3.8),
    fontWeight: 'bold',
    marginHorizontal:width(1)
  },
});
export default styles;
