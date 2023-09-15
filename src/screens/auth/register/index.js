import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { Button, Input, ScreenWrapper } from "../../../components";
import { setIsLoggedIn, setToken, setUserMeta } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { errorMessage, successMessage } from "../../../utills/Methods";
import { ApiManager } from "../../../backend/ApiManager";
import { setAppLoader } from "../../../redux/slices/config";
import { signupApi } from "../../../backend/auth";
export default function SignUp({ navigation, route }) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    userName,
    email,
    password,
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.{6,})/;
    return passwordRegex.test(password);
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
        // dispatch(setIsLoggedIn(true));
        //  dispatch(setUserMeta(r?.data?.userDetails));
        // dispatch(setToken(r?.data?.token));
        dispatch(setAppLoader(false));
        navigation.goBack();
      }
      else{
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
        <ImageBackground
          source={Icons.bglogo}
          style={{ width: width(100), height: height(28) }}
        >
          <View style={styles.imageiner}>
            <Text style={styles.logintext}>SignUp</Text>
          </View>
        </ImageBackground>
        <View style={{ paddingVertical: width(10) }}>
          <Input
            value={name}
            setvalue={setName}
            title={"Name"}
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
          <View style={{ flexDirection: "row", padding: width(4) }}>
            <CheckBox
              style={{ paddingRight: width(2) }}
              onClick={() => {
                setCheck(!check);
              }}
              checkedCheckBoxColor={AppColors.primary}
              isChecked={check}
            />
            <View style={{}}>
              <Text>I have read and agree to the Eidcarosse</Text>
              <TouchableOpacity style={{}}>
                <Text style={{ color: AppColors.primary, fontWeight: "bold" }}>
                  {" "}
                  Terms and Conditions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            disabled={!check}
            onPress={() => {
              if (!name) {
                errorMessage("Name require");
              } else if (!userName) {
                errorMessage("User namae require");
              } else if (!email) {
                errorMessage("email require");
              } else if (!isValidEmail(email)) {
                errorMessage("Email incorect formate");
              } else if (!password) {
                errorMessage("Password require");
              } else if (!isValidPassword(password)) {
                errorMessage(
                  "Altest 1 capital ,1 Small and 1 specail and must be 6 character"
                );
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
              dispatch(setIsLoggedIn(true));
              navigation.navigate(ScreenNames.BUTTOM);
            }}
          />
          <View style={{ height: height(5) }} />

          <View
            style={{
              alignSelf: "center",
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: AppColors.primary, fontWeight: "bold" }}>
                {" "}
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
