import React from "react";
import { ActivityIndicator, Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { selectLoader, selectNetworkLoader } from "../../redux/slices/config";
import AppColors from "../../utills/AppColors";
import styles from "./styles";
import { height, width } from "../../utills/Dimension";
import Icons from "../../asset/images";
export default function NetworkLoader() {
  const net = useSelector(selectNetworkLoader);
  return (
    <Modal
      isVisible={net}
      backdropOpacity={1}
      animationInTiming={100}
      animationOutTiming={100}
      backdropColor={AppColors.white}
    >
      <View style={styles.container}>
        {/* <Image
          style={{
            width: width(30),
            height: width(30),
            borderRadius: width(10),
          }}
          source={Icons.loder}
        /> */}
        <ActivityIndicator />
        <Text>Network error</Text>
      </View>
    </Modal>
  );
}
