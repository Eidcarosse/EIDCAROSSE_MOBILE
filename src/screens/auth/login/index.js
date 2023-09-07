import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { ApiManager } from "../../../backend/ApiManager";
import Icons from "../../../asset/images";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import {
  setIsLoggedIn,
  setToken,
  setUserMeta,
} from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import { errorMessage, successMessage } from "../../../utills/Methods";

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
      const response = await ApiManager.post("/auth", data);
      console.log("in coming data ",response?.data?.data);
      if (response?.data?.data) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(response?.data?.data?.userData));
        dispatch(setToken(response?.data?.data?.token));
        successMessage("saved");
        navigation.navigate(ScreenNames.BUTTOM);
      }
      else(alert("Incorrect email or password"))
    } catch (error) {}
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.primery}
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
              if(!isValidEmail(email)){errorMessage("Email is require or may incorect formate")}
              else if (!isValidPassword(password)){errorMessage("Password must be requied or may incorect")}
               else login(userData)
                
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
              <Text style={{ color: AppColors.primery, fontWeight: "bold" }}>
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
              <Text style={{ color: AppColors.primery, fontWeight: "bold" }}>
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
