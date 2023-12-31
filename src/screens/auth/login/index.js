import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { loginApi } from "../../../backend/auth";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import { setAppLoader } from "../../../redux/slices/config";
import {
  setAdsFav,
  setIsLoggedIn,
  setToken,
  setUserMeta,
} from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import {
  errorMessage,
  infoMessage,
  setAuthAllData,
  setAuthData,
  successMessage,
} from "../../../utills/Methods";
import styles from "./styles";
import { useTranslation } from "react-i18next";
//import i18n from "../../../translation";
export default function Login({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailr, setEmailr] = useState("");
  const [passwordr, setPasswordr] = useState("");

  // const isValidEmail = (email) => {
  //   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  //   return emailRegex.test(email);
  // };
  // const isValidPassword = (password) => {
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.{6,})/;
  //   return passwordRegex.test(password);
  // };
  const isValidEmail = (email) => {
    return email.length > 0;
  };
  const isValidPassword = (password) => {
    return password.length > 0;
  };
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  const login = async (data) => {
    try {
      dispatch(setAppLoader(true));
      let res = await loginApi(data);
      if (!res?.success) {
        dispatch(setAppLoader(false));
        console.log(res?.message);
        errorMessage(
          t(`flashmsg.${res?.message}`),
          t("flashmsg.authentication")
        );
      } else if (res?.success) {
        if (!res?.data?.userDetails?.verified) {
          dispatch(setAppLoader(false));
          infoMessage("Account not verified");
          navigation.navigate(ScreenNames.VERIFY, { data: res?.data });
        } else {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserMeta(res?.data?.userDetails));
          dispatch(setToken(res?.data?.token));
          dispatch(setAdsFav(res?.data?.userDetails?.favAdIds));
          setAuthData(data);
          setAuthAllData(res?.data?.userDetails);
          dispatch(setAppLoader(false));
          successMessage("", t(`flashmsg.sussessloginmsg`));
          navigation.navigate(ScreenNames.BUTTOM);
        }
      } else {
        errorMessage(t(`flashmsg.wrong`), t("flashmsg.error")),
          dispatch(setAppLoader(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setAppLoader(false));
    }
  };
  return (
    <ScreenWrapper
      showStatusBar={false}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      headerUnScrollable={() => <Head navigation={navigation} />}
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground source={Icons.bglogo} style={styles.bg}>
          <View style={styles.imageiner}>
            <Text style={styles.logintext}>{t("login.login")}</Text>
          </View>
        </ImageBackground>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          enableResetScrollToCoords={false}
          extraScrollHeight={height(8)}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              height: height(70),
              paddingTop: width(5),
            }}
          >
            <Input
              value={email}
              setvalue={setEmail}
              title={"login.emailTitle"}
              placeholder={"login.yourEmailAddress"}
              require={emailr}
            />
            <Input
              value={password}
              setvalue={setPassword}
              title={"login.passwordTitle"}
              placeholder={"login.yourPassword"}
              secure={true}
              require={passwordr}
            />
            <Button
              containerStyle={styles.button}
              title={"login.loginButton"}
              onPress={() => {
                if (!isValidEmail(email)) {
                  setEmailr("email require");
                } else if (!isValidPassword(password)) {
                  setPasswordr("password require");
                } else login(userData);
              }}
            />
            {/* <Button
              containerStyle={styles.button}
              title={"login.continueWithGoogle"}
              onPress={() => {}}
            /> */}
            <View style={{ height: height(2) }} />
            <View style={styles.forget}>
              <Text style={{ fontSize: height(1.5) }}>
                {t("login.cannotLogin")} {"  "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreenNames.FORGET);
                }}
              >
                <Text style={styles.text}>{t("login.forgetPassword")}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: height(6) }} />

            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Text style={{ fontSize: height(1.5) }}>
                {t("login.donothaveaccount")}
                {"   "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreenNames.SIGNUP);
                }}
              >
                <Text style={styles.text}> {t("login.registerNow")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </ScreenWrapper>
  );
}
