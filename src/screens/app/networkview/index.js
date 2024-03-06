import React from "react";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Text, View, Image } from "react-native";
import styles from "./styles";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
export default function NetworkLoader() {
  return (
    <View style={styles.container}>
      <Feather name="wifi-off" color={AppColors.bgIcon} size={width(30)} />
      <ActivityIndicator color={AppColors.primary} />
      <Text>Check Internet Connection</Text>
    </View>
  );
}
