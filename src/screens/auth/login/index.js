import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
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
    return password.length >= 6;
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
        errorMessage(res?.message);
      } else if (res?.success) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(res?.data?.userDetails));
        dispatch(setToken(res?.data?.token));
        dispatch(setAdsFav(res?.data?.userDetails?.favAdIds));
        setAuthData(data);
        dispatch(setAppLoader(false));
        successMessage("saved");
        navigation.navigate(ScreenNames.BUTTOM);
      } else {
        alert("Somthing wrong in Login"), dispatch(setAppLoader(false));
      }
    } catch (error) {
      errorMessage("Network error");
      console.log(error);
      dispatch(setAppLoader(false));
    }
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
      headerUnScrollable={() => <Head navigation={navigation} />}
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground source={Icons.bglogo} style={styles.bg}>
          <View style={styles.imageiner}>
            <Text style={styles.logintext}>{t("login.login")}</Text>
          </View>
        </ImageBackground>
        <View style={{ height: height(70), paddingTop: width(10) }}>
          <Input
            value={email}
            setvalue={setEmail}
            title={"login.emailTitle"}
            placeholder={"login.yourEmailAddress"}
          />
          <Input
            value={password}
            setvalue={setPassword}
            title={"login.passwordTitle"}
            placeholder={"login.yourPassword"}
            secure={true}
          />
          <Button
            containerStyle={styles.button}
            title={"login.loginButton"}
            onPress={() => {
              if (!isValidEmail(email)) {
                errorMessage("Email is require or may incorect formate");
              } else if (!isValidPassword(password)) {
                errorMessage("Password must be requied or may incorect");
              } else login(userData);
            }}
          />
          <Button
            containerStyle={styles.button}
            title={"login.continueWithGoogle"}
            onPress={() => {
              dispatch(setIsLoggedIn(true));
              navigation.navigate(ScreenNames.BUTTOM);
            }}
          />
          <View style={styles.forget}>
            <Text>
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
          <View style={{ height: height(10) }} />

          <View
            style={{
              alignSelf: "center",
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <Text>
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
      </View>
    </ScreenWrapper>
  );
}
