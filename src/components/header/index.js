import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
export default function Header({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={.4} style={styles.menuicon}
      onPress={()=>{navigation.openDrawer()}}
      >
        <Ionicons name="menu" size={width(7)} color={"white"} />
      </TouchableOpacity>
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
