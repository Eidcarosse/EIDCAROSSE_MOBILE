import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import { changePasswordAPI } from "../../../backend/auth";
import { setAppLoader } from "../../../redux/slices/config";
import { errorMessage, successMessage } from "../../../utills/Methods";
import { selectUserMeta } from "../../../redux/slices/user";
import { useTranslation } from "react-i18next";
export default function ChangePassword({ navigation, route }) {
  const { t } = useTranslation();
  const user = useSelector(selectUserMeta);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const chngePassword = async () => {
    try {
      dispatch(setAppLoader(true));
      let r = await changePasswordAPI(user?._id, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      console.log("change password", r);
      if (!r?.success) {
        dispatch(setAppLoader(false));
        errorMessage(r?.message);
      } else if (r.success) {
        successMessage(t(`flashmsg.passwordchangemsg`), t(`flashmsg.password`));
        dispatch(setAppLoader(false));
        navigation.goBack();
      }
      // dispatch(setAppLoader(false));
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      dispatch(setAppLoader(false));
      errorMessage("Network error");
    }
  };
  return (
    <ScreenWrapper
      showStatusBar={false}
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
            secure
            setvalue={setOldPassword}
          />
          <Input
            title={"changePassword.newPassword"}
            placeholder={"changePassword.phnewPassword"}
            value={newPassword}
            secure={true}
            setvalue={setNewPassword}
          />

          <Input
            title={"changePassword.confirmpassword"}
            placeholder={"changePassword.phconfirmpassword"}
            value={confirmPassword}
            secure={true}
            setvalue={setConfirmPassword}
          />
          <Button
            containerStyle={styles.button}
            title={"changePassword.savebutton"}
            onPress={() => {
              if (!oldPassword)
                errorMessage(t(`flashmsg.oldpaserror`), t(`flashmsg.password`));
              else if (
                !isValidPassword(newPassword.trim()) ||
                !isValidPassword(oldPassword.trim())
              ) {
                errorMessage(t("Atlest 8 character"), t(`flashmsg.password`));
              } else if (newPassword.trim() !== confirmPassword.trim())
                errorMessage(
                  t(`flashmsg.confirmerrormsg`),
                  t(`flashmsg.password`)
                );
              else if (newPassword.trim() === oldPassword.trim())
                errorMessage(t(`same password`), t(`flashmsg.password`));
              else chngePassword();
            }}
          />

          <View style={{ height: height(7) }} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
