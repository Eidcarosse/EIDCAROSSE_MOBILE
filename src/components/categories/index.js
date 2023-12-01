import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function CategoryIcon({
  children,
  title,
  disabled,
  cardStyle,
  greybackground,
  navigation,
  textStyle,
  onPress,
}) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[{ margin: width(2) }, cardStyle, styles.main]}
      onPress={onPress}
    >
      <View disabled={disabled}>
        <View style={[styles.container, greybackground]}>{children}</View>
      </View>
      <Text style={[styles.text, textStyle]}>{t(`category.${title}`)}</Text>
    </TouchableOpacity>
  );
}
