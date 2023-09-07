import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import styles from "./styles";

import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
export default function EditProfile({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Edit Profile"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground
          source={Icons.bglogo}
          style={{ width: width(100), height: height(28) }}
        >
          <View style={styles.imageiner}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.avatar} source={Icons.car} />
              <View style={{ paddingLeft: width(5) }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  Usama Khan
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  usamakhan@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{ paddingVertical: width(10) }}>
          <Input title={"Name"} placeholder={"Enter Name"} />
          <Input title={"User Name"} placeholder={"Enter Username"} />
          <Input title={"Email"} placeholder={"Enter Email"} />
          <Input title={"Phone Number"} placeholder={"Phone Number"} />
          <Button containerStyle={styles.button} title={"Save Change"} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
