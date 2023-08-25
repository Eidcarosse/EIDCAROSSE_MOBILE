import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height:height(100),
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
  card:{
    width: width(95),
    margin: width(1),
    borderRadius: width(2),
    alignSelf: "center",
    backgroundColor: "white",
    padding:width(4)
  }
  
  
});
export default styles;
