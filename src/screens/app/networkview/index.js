import React from "react";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Text, View, Image } from "react-native";
import styles from "./styles";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import { ScreenWrapper } from "../../../components";
import { useTranslation } from "react-i18next";

export default function NetworkLoader() {
  const { t } = useTranslation();
  return (
    <ScreenWrapper scrollEnabled>
      <View style={styles.container}>
        <Feather name="wifi-off" color={AppColors.bgIcon} size={width(30)} />
        <ActivityIndicator color={AppColors.primary} />
        <Text>{t("network.msg")}</Text>
      </View>
    </ScreenWrapper>
  );
}
