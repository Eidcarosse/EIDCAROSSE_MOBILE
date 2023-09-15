import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { loginApi } from "../../../backend/auth";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import { setAppLoader } from "../../../redux/slices/config";
import { setIsLoggedIn, setToken, setUserMeta } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import {
  errorMessage,
  setAuthData,
  successMessage,
} from "../../../utills/Methods";
import styles from "./styles";

export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.{6,})/;
    return passwordRegex.test(password);
  };

  const userData = {
    email,
    password,
  };

  const login = async (data) => {
    try {
      dispatch(setAppLoader(true));
      let res = await loginApi(data);
      console.log("loginpage",res.data.token);
      if (!res?.success) {
        dispatch(setAppLoader(false));
        errorMessage(res?.message);
      } else if (res?.success) {
        dispatch(setIsLoggedIn(true));
        console.log(res.token);
        dispatch(setUserMeta(res?.data?.userDetails));
        dispatch(setToken(res?.data?.token));
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
        <ImageBackground
          source={Icons.bglogo}
          style={{ width: width(100), height: height(28) }}
        >
          <View style={styles.imageiner}>
            <Text style={styles.logintext}>Login</Text>
          </View>
        </ImageBackground>
        <View style={{ height: height(70), paddingTop: width(10) }}>
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
          <Button
            containerStyle={styles.button}
            title={"Login"}
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
          <View
            style={{
              alignSelf: "center",
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <Text>Can’t login?</Text>
            <TouchableOpacity>
              <Text style={{ color: AppColors.primary, fontWeight: "bold" }}>
                {"   "}
                Forgot Password
              </Text>
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
            <Text>Don’t have account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNames.SIGNUP);
              }}
            >
              <Text style={{ color: AppColors.primary, fontWeight: "bold" }}>
                {" "}
                Register Now!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
