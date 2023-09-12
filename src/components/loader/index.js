import React from "react";
import { ActivityIndicator, Text, View ,Image} from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { selectLoader } from "../../redux/slices/config";
import AppColors from "../../utills/AppColors";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { height, width } from "../../utills/Dimension";
import Icons from "../../asset/images";
export default function Loader() {
  const appLoader = useSelector(selectLoader);
  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={200}
      animationIn={"lightSpeedIn"}
      animationOut={"lightSpeedOut"}
      isVisible={appLoader}
      backdropOpacity={.7}
      backdropColor={'white'}
    >
      <View style={styles.container}>
        <Image
        style={{width:width(20),height:width(20), borderRadius: width(10),}}
        source={Icons.loder}
        />
        {/* <ActivityIndicator color={AppColors.primary} size={'large'}/> */}
        {/* <LottieView
        source={require("../../asset/animations/loder.json")}
        width={width(50)}
        height={height(20)}

        /> */}
      </View>
    </Modal>
  );
}
