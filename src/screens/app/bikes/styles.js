import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: width(2),
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
