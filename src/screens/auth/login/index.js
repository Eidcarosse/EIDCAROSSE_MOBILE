import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { ref, set,getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
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
  getRememberMe,
  infoMessage,
  setAuthAllData,
  setAuthData,
  setRememberMe,
  successMessage,
} from "../../../utills/Methods";
import styles from "./styles";
//import i18n from "../../../translation";
async function save(value) {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync("prelogin", jsonValue);
    console.log("Value saved successfully.");
  } catch (error) {
    console.error("Error saving value:", error);
  }
}

async function getValueFor() {
  try {
    const jsonValue = await SecureStore.getItemAsync("prelogin", {
      requireAuthentication: true,
      authenticationPrompt: "Please authenticate to access",
    });
    if (jsonValue !== null) {
      const value = JSON.parse(jsonValue);
      console.log("Retrieved value:", value);
      return value;
    } else {
      console.log("No value stored under that key.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving value:", error);
    return null;
  }
}
export default function Login({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const db = getDatabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailr, setEmailr] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const [check, setCheck] = useState(false);
  // const isValidEmail = (email) => {
  //   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  //   return emailRegex.test(email);
  // };
  // const isValidPassword = (password) => {
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.{6,})/;
  //   return passwordRegex.test(password);
  // };

  useEffect(() => {
    async function get() {
      let a = await getValueFor();
      let r = await getRememberMe();
      if (r == "save") {
        setCheck(true);
        if (a) {
          setEmail(a?.email), setPassword(a?.password);
        }
      }
    }
    get();
  }, []);
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
          if (check) {
            setRememberMe("save");
            save(data);
          } else {
            setRememberMe("no");
            save({});
          }
          dispatch(setIsLoggedIn(true));
          dispatch(setUserMeta(res?.data?.userDetails));
          dispatch(setToken(res?.data?.token));
          dispatch(setAdsFav(res?.data?.userDetails?.favAdIds));
          fetchOlineStatus(res?.data?.userDetails?._id, true);
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
  async function handleRemberMe() {
    setCheck(!check);
  }
  async function fetchOlineStatus(id, check) {
    try {
      const userStatusRef = ref(db, `users/${id}/online`);
      await set(userStatusRef, check);
    } catch (error) {}
  }
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Head navigation={navigation} headtitle={t("login.login")} />
      )}
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.imageiner}>
          <Image
            style={{
              height: height(20),
              width: height(25),
              borderRadius: height(2),
              alignSelf: "center",
              justifyContent: "center",
              marginVertical: height(2),
            }}
            source={Icons.mainLogo}
            tintColor={AppColors.primary}
          />
        </View>
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
            keyboardType="email-address"
            placeholder={"login.yourEmailAddress"}
            autoCapitalize={"none"}
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

          <View style={{ flexDirection: "row", padding: width(4) }}>
            <CheckBox
              checkedImage={
                <MaterialIcons
                  name="check-box"
                  size={width(4)}
                  color={AppColors.primary}
                />
              }
              unCheckedImage={
                <MaterialIcons name="check-box-outline-blank" size={width(4)} />
              }
              style={{ paddingRight: width(2) }}
              onClick={handleRemberMe}
              checkedCheckBoxColor={AppColors.primary}
              isChecked={check}
            />
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={handleRemberMe}>
                <Text style={{ fontSize: height(1.5) }}>
                  {t("login.rememberMe")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
      </View>
    </ScreenWrapper>
  );
}
