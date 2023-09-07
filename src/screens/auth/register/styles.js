import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex:1,
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
      backgroundColor:AppColors.primary,
      width:width(80),
      margin:width(2),
    },
    dbutton:
    {
      backgroundColor:'grey',
      width:width(80),
      margin:width(2),
    }
  
  
});
export default styles;
