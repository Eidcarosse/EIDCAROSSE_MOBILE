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
        <Head headtitle={"changePassword.title"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ paddingVertical: width(10) }}>
          <Input
            title={"changePassword.newPassword"}
            placeholder={"changePassword.phnewPassword"}
          />

          <Input
            title={"changePassword.confirmpassword"}
            placeholder={"changePassword.phconfirmpassword"}
          />
          <Button containerStyle={styles.button} title={"changePassword.savebutton"} />

          <View style={{ height: height(7) }} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
