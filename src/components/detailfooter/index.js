import {
    Ionicons,
    AntDesign,
    Entypo,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import React from "react";
  import { Image, View, TouchableOpacity } from "react-native";
  import { width } from "../../utills/Dimension";
  import styles from "./styles";
import IconButton from "../Iconbutton";
  export default function DetailFooter({
      onPressCall,
      onPressMail,
      onPressChat,
  }) {
    return (
      <View style={styles.container}>
          <IconButton
          onPress={onPressCall}
          icon={
            <Ionicons size={width(4)} name="call" color={'white'}/>
          }
          title={'Call'}
          />
          <IconButton
          onPress={onPressMail}

          icon={
            <AntDesign size={width(4)} name="mail" color={'white'}/>
          }
          title={'Email'}
          />
           <IconButton
          onPress={onPressChat}

          icon={
            <MaterialCommunityIcons size={width(4)} name="chat-processing" color={'white'}/>
          }
          title={'Chat'}
          />
      </View>
    );
  }
  