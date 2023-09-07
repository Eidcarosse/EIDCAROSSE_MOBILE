import React from "react";
import { View } from "react-native";
import styles from "./styles";

import { useDispatch } from "react-redux";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
export default function ChangePassword({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Change Password"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ paddingVertical: width(10) }}>
          <Input title={"New Password"} placeholder={"New Password"} />

          <Input title={"Confirm Password"} placeholder={"Enter Password"} />
          <Button containerStyle={styles.button} title={"Save Change"} />

          <View style={{ height: height(7) }} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
