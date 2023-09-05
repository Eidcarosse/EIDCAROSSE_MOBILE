import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      color: show ? AppColors.primery : "black",
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
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
          color={show ? AppColors.primery : "black"}
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
