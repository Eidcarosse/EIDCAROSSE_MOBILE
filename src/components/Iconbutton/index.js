import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const IconButton = ({
  title,
  onPress,
  disabled = false,
  icon,
  iconright,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle]}
    >
      {icon}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {iconright}
    </TouchableOpacity>
  );
};

export default IconButton;
