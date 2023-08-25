import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../utills/AppColors';
import { Entypo } from "@expo/vector-icons";

import styles from './styles';

const IconButton = ({
  title,
  onPress,
  disabled = false,
  icon,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle]}>
      {icon}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      
    </TouchableOpacity>
  );
};

export default IconButton;
