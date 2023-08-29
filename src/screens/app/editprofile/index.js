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
export default function EditProfile({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Head headtitle={"Edit Profile"} navigation={navigation} />}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.avatar} source={Icons.car} />
              <View style={{ paddingLeft: width(5) }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  Usama Khan
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  usamakhan@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{ paddingVertical: width(10) }}>
          <Input title={"First Name"} placeholder={"Enter Name"} />
          <Input title={"Last Name"} placeholder={"Enter Password"} />
          <Input title={"User Name"} placeholder={"Enter Name"} />
          <Input title={"Email"} placeholder={"Enter Name"} />

          <Input title={"Phone Number"} placeholder={"Enter Name"} />

          <Input
            title={"Password"}
            placeholder={"Enter Password"}
            secure={true}
          />
          <Button containerStyle={styles.button} title={"Save Change"} />

          <View style={{ height: height(7) }} />

        </View>
      </View>
    </ScreenWrapper>
  );
}
