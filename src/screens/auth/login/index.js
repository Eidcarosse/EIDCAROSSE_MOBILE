import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";

import Icons from "../../../asset/images";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import { setIsLoggedIn } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
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
          <Input title={"UserName"} placeholder={"Enter username"} />
          <Input
            title={"Password"}
            placeholder={"Enter Password"}
            secure={true}
          />
          <Button
            containerStyle={styles.button}
            title={"Login"}
            onPress={() => {
              dispatch(setIsLoggedIn(true));
              navigation.navigate(ScreenNames.BUTTOM);
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
