import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex:1,
    backgroundColor: AppColors.white,
    justifyContent:'center',
alignItems:'center'
  },
  containerStyle:{
    borderRadius:width(2),
    backgroundColor:AppColors.primery
  }
  
  
});
export default styles;
