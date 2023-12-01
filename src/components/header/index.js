import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import AppColors from "../../utills/AppColors";
import { useDispatch, useSelector } from "react-redux";

export default function Header({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.menuicon}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Ionicons name="menu" size={width(7)} color={AppColors.white} />
      </TouchableOpacity>
      <View>
        <Image
          source={require("../../../assets/splash.png")}
          style={styles.image}
        />
      </View>
      {/* <View>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.menuicon}
        onPress={() => {
          color.white=="white"?dispatch(setWhiteColor("black")):dispatch(setWhiteColor("white"))
        }}
      >
        <MaterialCommunityIcons name="theme-light-dark" size={width(7)} color={AppColors.white} />
      </TouchableOpacity>
      </View> */}
      <View />
    </View>
  );
}
