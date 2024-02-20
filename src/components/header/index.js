import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import AppColors from "../../utills/AppColors";
import { useDispatch, useSelector } from "react-redux";

export default function Header({ navigation, title = "Eidcarosse.ch" }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: height(1),
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/icon1.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text
          style={{
            color: AppColors.primary,
            fontSize: height(3),
            fontWeight: "bold",
            paddingHorizontal: height(1),
          }}
        >
          {title}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.menuicon}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Ionicons name="menu" size={height(3.5)} color={AppColors.black} />
      </TouchableOpacity>
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
