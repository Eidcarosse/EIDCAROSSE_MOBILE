import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import AppColors from "../../utills/AppColors";

import { FontAwesome } from "@expo/vector-icons";
import { height, width } from "../../utills/Dimension";

export default DropDownDetail = ({
  title,
  detail,
  size = 3.5,
  textAlign,
  color = AppColors.black,
  textStyles,
  textProps,
  inertextStyles,
  inertextProps,
  onPress = undefined,
}) => {
  const [show, setShow] = useState(false);

  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
      fontWeight: "bold",
      color: show ? AppColors.primary : "black",
    },
  });
  return (
    <View
      style={{
        backgroundColor: AppColors.white,
        width: width(90),
        paddingVertical: width(2),
        paddingHorizontal: width(3),
        borderRadius: width(1),
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          },
          android: {
            elevation: 3,
          },
        }),
        margin: height(1),
      }}
    >
      <Pressable
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setShow(!show)}
      >
        <Text
          style={[styles.text, textStyles]}
          {...textProps}
          numberOfLines={1}
        >
          {title}
        </Text>
        <FontAwesome
          name={show ? "chevron-up" : "chevron-down"}
          size={width(4)}
          color={show ? AppColors.primary : "black"}
        />
      </Pressable>
      {show && (
        <Text
          style={{ fontSize: width(3), paddingVertical: width(3) }}
          {...inertextProps}
        >
          {detail}
        </Text>
      )}
    </View>
  );
};
