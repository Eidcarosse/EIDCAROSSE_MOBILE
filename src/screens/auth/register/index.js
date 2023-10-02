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
export default function SignUp({ navigation, route }) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const userData = {
    firstName,
    lastName,
    userName,
    email,
    password,
    phoneNumber,
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
            <Text style={styles.logintext}>SignUp</Text>
          </View>
        </ImageBackground>
        <View style={{ paddingVertical: width(10) }}>
          <Input
            value={firstName}
            setvalue={setFirstName}
            title={"First Name"}
            placeholder={"Enter Name"}
          />
          <Input
            value={lastName}
            setvalue={setLastName}
            title={"Last Name"}
            placeholder={"Enter Name"}
          />
          <Input
            value={userName}
            setvalue={setUserName}
            title={"User Name"}
            placeholder={"Enter username"}
          />
          <Input
            value={email}
            setvalue={setEmail}
            title={"Email"}
            placeholder={"Enter email"}
          />
          <Input
            value={password}
            setvalue={setPassword}
            title={"Password"}
            placeholder={"Enter Password"}
            secure={true}
          />
          <Input
            value={phoneNumber}
            setvalue={setPhoneNumber}
            title={"Contact Number"}
            placeholder={"Enter Number"}
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
              <Text>I have read and agree to the Eidcarosse</Text>
              <TouchableOpacity>
                <Text style={styles.tandc}> Terms and Conditions</Text>
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
            title={"SignUp"}
          />
          <Button
            containerStyle={styles.button}
            title={
              <AntDesign name="google" size={width(3.5)}>
                {" "}
                Login with Google
              </AntDesign>
            }
            onPress={() => {
              // dispatch(setIsLoggedIn(true));
              // navigation.navigate(ScreenNames.BUTTOM);
            }}
          />
          <View style={{ height: height(5) }} />

          <View style={styles.already}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.signin}> Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
