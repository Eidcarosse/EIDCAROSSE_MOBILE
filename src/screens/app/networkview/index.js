import React from "react";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Text, View, Image } from "react-native";
import styles from "./styles";
import * as Network from "expo-network";

import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import { ScreenWrapper } from "../../../components";
import { setNetworkLoader } from "../../../redux/slices/config";
import { useDispatch, useSelector } from "react-redux";

export default function NetworkLoader() {
  const dispatch = useDispatch();
  const getNetwork = async () => {
    let a = await Network.getNetworkStateAsync();
    console.log('====================================');
    console.log("neteettee",a);
    console.log('====================================');
    dispatch(setNetworkLoader(!a?.isConnected));
  };
  return (
    <ScreenWrapper scrollEnabled onRefresh={getNetwork}>
      <View style={styles.container}>
        <Feather name="wifi-off" color={AppColors.bgIcon} size={width(30)} />
        <ActivityIndicator color={AppColors.primary} />
        <Text>Check Internet Connection</Text>
      </View>
    </ScreenWrapper>
  );
}
