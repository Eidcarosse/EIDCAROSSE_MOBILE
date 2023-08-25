import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
export default function Header({navigation}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>navigation.goBack()} style={styles.menuicon}>
        <Ionicons name="chevron-back" size={width(6)} color={"white"} />
      </Pressable>
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
