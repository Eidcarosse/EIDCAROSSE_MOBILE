import React from "react";
import { Profiler } from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";
import IconButton from "../Iconbutton";
import {
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
const CustomDrawer = (props) => {
  return (
    <SafeAreaView>
      <Image
        source={require("../../../assets/splash.png")}
        style={{
          width: width(70),
          height: width(40),
          tintColor: AppColors.primery,
        }}
      />
      <IconButton
        title={"FAQ"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={
          <AntDesign
            name="questioncircle"
            style={styles.icon}
            size={width(4)}
          />
        }
      />
      <IconButton
        title={"How to sell fast"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<AntDesign name="tags" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"About us"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={
          <AntDesign name="infocirlce" style={styles.icon} size={width(4)} />
        }
      />
      <IconButton
        title={"Privacy Policy"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={
          <Ionicons
            name="shield-checkmark-sharp"
            style={styles.icon}
            size={width(4)}
          />
        }
      />
      <IconButton
        title={"Terms and conditions"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<Entypo name="open-book" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"Contact us"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<AntDesign name="contacts" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"App Settings"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<Ionicons name="settings" style={styles.icon} size={width(4)} />}
      />

      <IconButton
        title={"Sell now to us"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<AntDesign name="car" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"Request for repair now"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<FontAwesome name="wrench" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"Share with Friends"}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<Entypo name="share" style={styles.icon} size={width(4)} />}
      />
      <View 
      style={{height:height(7),justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}
      >
        <Text style={styles.textbuttom}>2023@ All reserved by
        
        <Text
      style={{color:'red',fontWeight:'bold'}}
        
        > Eidcarosse</Text></Text>
      </View>
    </SafeAreaView>
  );
};
// E5E8E8
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    width: width(62),

    margin: width(2),
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    justifyContent: "flex-start",
  },
  icon: {
    color: AppColors.white,
    marginHorizontal: width(1),
  },
  textbuttom: {
    alignSelf: "center",
    fontSize: 12,
  },
});
