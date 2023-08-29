import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, View,Text } from "react-native";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import AppColors from "../../utills/AppColors";
export default function Header({navigation,headtitle}) {
  //console.log(headtitle);
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>navigation.goBack()} style={styles.menuicon}>
        <Ionicons name="chevron-back" size={width(6)} color={"white"} />
      </Pressable>
      <View style={{height:height(6),justifyContent:'center'}}>
       <Text
          style={{color:AppColors.white,fontSize:18,fontWeight:'bold'}}
       >
        {headtitle}
       </Text>
      </View>
      <View />
    </View>
  );
}
