import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import {
  Button,
  Head,
  Header,
  IconButton,
  Input,
  ScreenWrapper,
} from "../../../components";
import { setIsLoggedIn, setUserMeta } from "../../../redux/slices/user";
import { setAppLoader } from "../../../redux/slices/config";
import Icons from "../../../asset/images";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";
import ScreenNames from "../../../routes/routes";
export default function ChangePassword({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Head headtitle={"Change Password"} navigation={navigation} />}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ paddingVertical: width(10) }}>
          <Input title={"New Password"} placeholder={"New Password"} 

          />

          <Input
            title={"Confirm Password"}
            placeholder={"Enter Password"}
          />
          <Button containerStyle={styles.button} title={"Save Change"} />

          <View style={{ height: height(7) }} />

        </View>
      </View>
    </ScreenWrapper>
  );
}
