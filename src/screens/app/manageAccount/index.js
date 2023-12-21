import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import Dialog from "react-native-dialog";
import { useDispatch, useSelector } from "react-redux";
import { Head, IconButton, ScreenWrapper } from "../../../components";
import {
  selectUserMeta,
  setAdsFav,
  setIsLoggedIn,
  setUserAds,
  setUserMeta,
} from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import {
  errorMessage,
  setAuthData,
  successMessage,
} from "../../../utills/Methods";
import { deleteAccountAPI } from "../../../backend/auth";
import { useTranslation } from "react-i18next";
import { setAppLoader } from "../../../redux/slices/config";
export default function ManageAccount({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");

  const user = useSelector(selectUserMeta);
  const deleteAccount = async (password) => {
    dispatch(setAppLoader(true));
    try {
      const formData = new FormData();
      formData.append("password", password);
      const data = await deleteAccountAPI(user._id, formData);
      if (data?.success) {
        successMessage("Account Deleted", "Success");
        dispatch(setIsLoggedIn(false));
        dispatch(setUserMeta(null));
        dispatch(setUserAds(null));
        dispatch(setAdsFav([]));
        setAuthData(null), navigation.goBack();
      } else {
        errorMessage("Wrong Password");
      }
      dispatch(setAppLoader(false));
    } catch (error) {
      console.log("Error:", error);
      dispatch(setAppLoader(false));
    }
  };
  return (
    <ScreenWrapper
      showStatusBar={false}
      headerUnScrollable={() => (
        <Head headtitle={"manageAccount.title"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ paddingVertical: width(10) }}>
          <IconButton
            onPress={() => {
              dispatch(setIsLoggedIn(false));
              dispatch(setUserMeta(null));
              dispatch(setUserAds(null));
              dispatch(setAdsFav([]));
              setAuthData(null), navigation.goBack();
            }}
            title={"manageAccount.logout"}
            containerStyle={styles.logoutcontainer}
            textStyle={{ color: AppColors.primary }}
            icon={
              <Entypo
                name="log-out"
                size={width(5)}
                color={AppColors.primary}
              />
            }
          />
          <IconButton
            onPress={() => {
              setVisible(true);
            }}
            title={"manageAccount.deleteaccount"}
            containerStyle={styles.deletecontainer}
            icon={
              <AntDesign
                name="delete"
                size={width(5)}
                color={AppColors.white}
              />
            }
          />
        </View>
        <View>
          <Dialog.Container visible={visible}>
            <Dialog.Title> {t("Delete Account")}</Dialog.Title>
            <Dialog.Description>
              <Text style={{ fontSize: width(3) }}>
                {t(
                  "Do you want to delete your account? This action will delete all your details, ads, wishlist, and chats. You cannot undo this action or recover the deleted data."
                )}
              </Text>
            </Dialog.Description>
            <Dialog.Description>
              <Text style={{ fontSize: width(3),fontWeight:'bold' }}>
                {t(
                  "Enter the Password to continue"
                )}
              </Text>
            </Dialog.Description>
            <Dialog.Input value={code} onChangeText={setCode} />
            <Dialog.Button
              label={t("myad.cancel")}
              onPress={() => setVisible(false)}
            />
            <Dialog.Button
              color={"red"}
              label={t("myad.delete")}
              onPress={() => {
                setVisible(false);
                if (code) deleteAccount(code);
                else errorMessage("Enter Password");
                setCode("");
              }}
            />
          </Dialog.Container>
        </View>
      </View>
    </ScreenWrapper>
  );
}
