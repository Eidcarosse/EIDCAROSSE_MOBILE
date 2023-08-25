import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    width: width(100),
    flexDirection:'row',
    justifyContent:'space-around',
    paddingBottom:height(3),
    alignItems:'center',
    paddingVertical:width(2),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  menuicon: {
    paddingLeft:width(5),
  },
});
export default styles;
