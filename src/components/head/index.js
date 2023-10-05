import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import AppColors from "../../utills/AppColors";
export default function Header({ navigation, headtitle }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.menuicon}>
        <Ionicons name="chevron-back" size={width(6)} color={AppColors.white} />
      </Pressable>
      <View style={styles.headview}>
        <Text style={styles.headtext}>{headtitle}</Text>
      </View>
      <View />
    </View>
  );
}
