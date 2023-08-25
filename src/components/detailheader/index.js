import {
  Ionicons,
  AntDesign,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
export default function DetailHeader({
    onPressBack,
    onPressHeart,
    onPressShare,
    onPressOption
}) {
  return (
    <View style={styles.container}>
      <View style={styles.menuicon}>
      <TouchableOpacity
      onPress={onPressBack}
      style={{  }}>
      <Ionicons name="chevron-back" size={width(5)} color={"white"} />

        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',width:width(25),justifyContent:'space-around'}}>
        <TouchableOpacity >
          <AntDesign size={width(4)} name="hearto" color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity >
          <Entypo size={width(4)} name="share" color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity >
          <SimpleLineIcons size={width(4)} name="options-vertical" color={'white'}/>
        </TouchableOpacity>
        {/* <Ionicons name="chevron-back" size={width(7)} color={"white"} /> */}
      </View>
    </View>
  );
}
