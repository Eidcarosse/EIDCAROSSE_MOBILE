import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { Button, Input, ScreenWrapper } from "../../../components";
import { setIsLoggedIn } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
export default function SignUp({ navigation, route }) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  return (
    <ScreenWrapper
      statusBarColor={AppColors.primery}
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
          <Input title={"Name"} placeholder={"Enter Name"} />
          <Input title={"User Name"} placeholder={"Enter username"} />
          <Input title={"Email"} placeholder={"Enter email"} />
          <Input
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
              checkedCheckBoxColor={AppColors.primery}
              isChecked={check}
            />
            <View style={{}}>
              <Text>I have read and agree to the Eidcarosse</Text>
              <TouchableOpacity style={{}}>
                <Text style={{ color: AppColors.primery, fontWeight: "bold" }}>
                  {" "}
                  Terms and Conditions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button containerStyle={styles.button} title={"SignUp"} />
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
              <Text style={{ color: AppColors.primery, fontWeight: "bold" }}>
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
