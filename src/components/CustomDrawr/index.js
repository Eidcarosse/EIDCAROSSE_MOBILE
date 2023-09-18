import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScreenNames from "../../routes/routes";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import IconButton from "../Iconbutton";
const CustomDrawer = ({ navigation }) => {
  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: "Hello, this is the content to share!",
      });

      if (result.action === Share.sharedAction) {

      } else if (result.action === Share.dismissedAction) {

      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <SafeAreaView>
      <Image
        source={require("../../../assets/splash.png")}
        style={{
          width: width(70),
          height: width(40),
          tintColor: AppColors.primary,
        }}
      />
      <IconButton
        title={"FAQ"}
        containerStyle={styles.container}
        onPress={() => {
          navigation.navigate(ScreenNames.FAQ), navigation.closeDrawer();
        }}
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
        onPress={() => {
          navigation.navigate(ScreenNames.HTSF), navigation.closeDrawer();
        }}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<AntDesign name="tags" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"About us"}
        onPress={() => {
          navigation.navigate(ScreenNames.ABOUTUS), navigation.closeDrawer();
        }}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={
          <AntDesign name="infocirlce" style={styles.icon} size={width(4)} />
        }
      />
      <IconButton
        title={"Privacy Policy"}
        onPress={() => {
          navigation.navigate(ScreenNames.PP), navigation.closeDrawer();
        }}
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
        onPress={() => {
          navigation.navigate(ScreenNames.TNC), navigation.closeDrawer();
        }}
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
        onPress={() => {
          navigation.navigate(ScreenNames.SNTU), navigation.closeDrawer();
        }}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<AntDesign name="car" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"Request for repair now"}
        onPress={() => {
          navigation.navigate(ScreenNames.REPAIR), navigation.closeDrawer();
        }}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<FontAwesome name="wrench" style={styles.icon} size={width(4)} />}
      />
      <IconButton
        title={"Share with Friends"}
        onPress={shareContent}
        containerStyle={styles.container}
        textStyle={styles.text}
        icon={<Entypo name="share" style={styles.icon} size={width(4)} />}
      />
      <View
        style={{
          height: height(7),
          justifyContent: "flex-end",
          alignContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Text style={styles.textbuttom}>
          2023@ All reserved by
          <Text style={{ color: "red", fontWeight: "bold" }}> Eidcarosse</Text>
        </Text>
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
