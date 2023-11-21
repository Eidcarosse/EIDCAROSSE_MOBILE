import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import { changePasswordAPI } from "../../../backend/auth";
import { setAppLoader } from "../../../redux/slices/config";
import { errorMessage } from "../../../utills/Methods";
import { selectUserMeta } from "../../../redux/slices/user";
export default function ChangePassword({ navigation, route }) {
  const user = useSelector(selectUserMeta);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const chngePassword = async () => {
    try {
      dispatch(setAppLoader(true));
      let r = await changePasswordAPI(user?._id, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      console.log("====================================");
      console.log("pasword response", r);
      console.log("====================================");
      if (!r?.success) {
        dispatch(setAppLoader(false));
        errorMessage(r?.message);
      } else if (r) {
        successMessage("Succusfuly Change", "Password");
        dispatch(setAppLoader(false));
        navigation.goBack();
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
            title={"changePassword.oldPassword"}
            placeholder={"changePassword.pholdPassword"}
            value={oldPassword}
            setvalue={setOldPassword}
          />
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
              if (!oldPassword)
                errorMessage("old password not exist", "Password");
              else if (newPassword !== confirmPassword)
                errorMessage("confirm Password not match", "Password");
              else chngePassword();
            }}
          />

          <View style={{ height: height(7) }} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
