import { StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4),
    marginBottom: height(2)
  },
  button:{

    backgroundColor:AppColors.white,
    margin:width(2)
  }
});
export default styles;
