import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
  },
  imageiner:{
    height: height(25),
    justifyContent: "flex-end",
    marginLeft: width(10),
  },
  logintext:{
    fontSize: 30,
    color: AppColors.white,
    fontWeight: "bold",
  },
  button:
    {
      backgroundColor:AppColors.primery,
      width:width(80),
      margin:width(3),
    }
  
  
});
export default styles;
