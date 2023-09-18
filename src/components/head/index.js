import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
export default function Header({ navigation, headtitle }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.menuicon}>
        <Ionicons name="chevron-back" size={width(6)} color={"white"} />
      </Pressable>
      <View style={{ height: height(6), justifyContent: "center" }}>
        <Text
          style={{ color: AppColors.white, fontSize: 18, fontWeight: "bold" }}
        >
          {headtitle}
        </Text>
      </View>
      <View />
    </View>
  );
}
