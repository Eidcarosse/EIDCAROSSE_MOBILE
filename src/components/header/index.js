import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
export default function Header({}) {
  return (
    <View style={styles.container}>
      <View style={styles.menuicon}>
        <Ionicons name="menu" size={width(7)} color={"white"} />
      </View>
      <View>
        <Image
          source={require("../../../assets/splash.png")}
          style={{ width: width(30), height: width(15), marginLeft: -width(15) }}
        />
      </View>
      <View />
    </View>
  );
}
