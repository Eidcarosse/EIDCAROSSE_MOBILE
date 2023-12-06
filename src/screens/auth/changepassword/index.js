import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";

import { useDispatch } from "react-redux";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import { setAppLoader } from "../../../redux/slices/config";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";

import ScreenNames from "../../../routes/routes";
import { errorMessage, successMessage } from "../../../utills/Methods";
import { resetPasswordAPI } from "../../../backend/auth";
export default function ChangePassword({ navigation, route }) {
  const dispatch = useDispatch();
  const email = route?.params?.email;
  const token = route?.params?.token;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isValidPassword = (password) => {
    return password.length >= 6;
  };
  const chngePassword = async () => {
    try {
      dispatch(setAppLoader(true));
      let r = await resetPasswordAPI({
        password: newPassword,
        email: email,
        token: token,
      });
      if (!r?.success) {
        dispatch(setAppLoader(false));
        errorMessage(r?.message);
      } else if (r) {
        successMessage("Succusfuly Change", "Password");
        dispatch(setAppLoader(false));
        navigation.navigate(ScreenNames.LOGIN);
      } else {
        errorMessage("some isseu");
      }
      // dispatch(setAppLoader(false));
    } catch (error) {
      dispatch(setAppLoader(false));
      errorMessage("Network error");
    }
  };
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
            value={newPassword}
            setvalue={setNewPassword}
          />

          <Input
            title={"changePassword.confirmpassword"}
            placeholder={"changePassword.phconfirmpassword"}
            value={confirmPassword}
            setvalue={setConfirmPassword}
          />
          <Button
            containerStyle={styles.button}
            title={"changePassword.savebutton"}
            onPress={() => {
              if (
                newPassword !== confirmPassword &&
                isValidPassword(newPassword)
              ) {
                errorMessage(
                  "confirm Password not match or lessthan 6 characters",
                  "Password"
                );
              } else if (newPassword == "" || confirmPassword == "") {
                errorMessage("Empaty feild", "Password");
              } else chngePassword();
            }}
          />

          <View style={{ height: height(7) }} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
