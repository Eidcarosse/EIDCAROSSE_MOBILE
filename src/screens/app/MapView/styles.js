import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height:height(80),
    alignItems: 'center',
    padding:width(2),
    backgroundColor:AppColors.white
  },
  title: {
    color: AppColors.black,
    fontWeight: 'bold',
    fontSize: width(4),
    marginBottom: height(2)
  },
  searchinput:{
    width:width(90),
    alignSelf:'center',
    borderWidth:1,
    borderRadius:width(1),
    padding:width(2)
  },
  titleview:{
    justifyContent:'space-between',
    padding:width(1),
    flexDirection:'row',
    width:width(90)
  },
  bs: {
    wrapper: {
      backgroundColor: "transparent",
    },
    container: {
      borderTopLeftRadius: width(8),
      borderTopRightRadius: width(8),
      borderWidth: width(0.1),
      borderBlockColor: AppColors.primary,
      alignItems:'center'
    },
    draggableIcon: {
      backgroundColor: "#000",
    },
  },
});
export default styles;
