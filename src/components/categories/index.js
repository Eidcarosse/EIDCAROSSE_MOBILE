import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { height, width } from "../../utills/Dimension";
import ScreenNames from "../../routes/routes";

export default function CategoryIcon({
  children,
  title,
  disabled,
  cardStyle,
  navigation,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[{ margin: width(2) }, cardStyle, styles.main]}
      onPress={() => {
        if(title=='Bikes'){
          navigation.navigate(ScreenNames.BIKECATEGORY)
        }
        else{
        navigation.navigate(ScreenNames.LISTDATA);}
      }}
    >
      <View style={[cardStyle]} disabled={disabled}>
        <View style={styles.container}>{children}</View>
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
