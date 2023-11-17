import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { signupApi } from "../../../backend/auth";
import { Button, Input, ScreenWrapper } from "../../../components";
import { setAppLoader } from "../../../redux/slices/config";
import {
  setIsLoggedIn,
  setToken,
  setUserMeta,
} from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import { errorMessage, successMessage } from "../../../utills/Methods";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import ScreenNames from "../../../routes/routes";
export default function SignUp({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsapp, SetWhatsapp] = useState("");
  const [viber, setViber] = useState("");

  const userData = {
    firstName,
    lastName,
    userName,
    email,
    password,
    phoneNumber,
    whatsapp,
    viber,
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  // const isValidPassword = (password) => {
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.{6,})/;
  //   return passwordRegex.test(password);
  // };
  const isValidPassword = (password) => {
    return password.length >= 6;
  };
  const signup = async (data) => {
    try {
      dispatch(setAppLoader(true));
      let r = await signupApi(data);
      if (!r?.success) {
        dispatch(setAppLoader(false));
        errorMessage(r?.message);
      } else if (r) {
        successMessage("Saved");
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(r?.data?.userDetails));
        dispatch(setToken(r?.data?.token));
        dispatch(setAppLoader(false));
        navigation.goBack();
      } else {
        errorMessage("some issu");
      }
    } catch (error) {
      dispatch(setAppLoader(false));
      errorMessage("Network error");
    }
  };

  return (
    <ScreenWrapper
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground source={Icons.bglogo} style={styles.image}>
          <View style={styles.imageiner}>
            <Text style={styles.logintext}>{t("signup.signup")}</Text>
          </View>
        </ImageBackground>
        <View style={{ paddingVertical: width(10) }}>
          <Input
            value={firstName}
            setvalue={setFirstName}
            title={"signup.firstNameTitle"}
            placeholder={"signup.firstNamePlaceholder"}
          />
          <Input
            value={lastName}
            setvalue={setLastName}
            title={"signup.lastNameTitle"}
            placeholder={"signup.lastNamePlaceholder"}
          />
          <Input
            value={userName}
            setvalue={setUserName}
            title={"signup.userNameTitle"}
            placeholder={"signup.usernamePlaceholder"}
          />
          <Input
            value={email}
            setvalue={setEmail}
            title={"signup.emailTitle"}
            placeholder={"signup.emailPlaceholder"}
          />
          <Input
            value={password}
            setvalue={setPassword}
            title={"signup.passwordTitle"}
            placeholder={"signup.passwordPlaceholder"}
            secure={true}
          />
          <Input
            value={phoneNumber}
            setvalue={setPhoneNumber}
            title={"signup.phoneNumberTitle"}
            placeholder={"signup.phoneNumberPlaceholder"}
          />
          <Input
            value={whatsapp}
            setvalue={SetWhatsapp}
            title={"signup.whatsappTitle"}
            placeholder={"signup.whatsappPlaceholder"}
          />
          <Input
            value={viber}
            setvalue={setViber}
            title={"signup.viberTitle"}
            placeholder={"signup.viberPlaceholder"}
          />
          <View style={styles.checkview}>
            <CheckBox
              style={{ paddingRight: width(2) }}
              onClick={() => {
                setCheck(!check);
              }}
              checkedCheckBoxColor={AppColors.primary}
              isChecked={check}
            />
            <View>
              <Text>{t("signup.checkBoxText")}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ScreenNames.TNC)}
              >
                <Text style={styles.tandc}>
                  {" "}
                  {t("signup.termAndCondition")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            disabled={!check}
            onPress={() => {
              if (!firstName) {
                errorMessage("First Name require");
              } else if (!lastName) {
                errorMessage("Last Name require");
              } else if (!userName) {
                errorMessage("User Name require");
              } else if (!email) {
                errorMessage("email require");
              } else if (!isValidEmail(email)) {
                errorMessage("Email incorect formate");
              } else if (!phoneNumber) {
                errorMessage("Password require");
              } else if (!isValidPassword(password)) {
                errorMessage(
                  "Altest 1 capital ,1 Small and 1 specail and must be 6 character"
                );
              } else if (!phoneNumber) {
                errorMessage("Phone Number require");
              } else signup(userData);
            }}
            containerStyle={check ? styles.button : styles.dbutton}
            title={"signup.signupButton"}
          />
          <Button
            containerStyle={styles.button}
            title={"signup.continueWithGoogle"}
            onPress={() => {
              // dispatch(setIsLoggedIn(true));
              // navigation.navigate(ScreenNames.BUTTOM);
            }}
          />
          <View style={{ height: height(5) }} />

          <View style={styles.already}>
            <Text>
              {t("signup.alreadyHaveAccount")}
              {"  "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.signin}>{t("signup.signin")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
