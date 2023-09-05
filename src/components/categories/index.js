import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";

export default function CategoryIcon({
  children,
  title,
  disabled,
  cardStyle,
  navigation,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[{ margin: width(2) }, cardStyle, styles.main]}
      onPress={onPress}
    >
      <View style={[cardStyle]} disabled={disabled}>
        <View style={styles.container}>{children}</View>
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
