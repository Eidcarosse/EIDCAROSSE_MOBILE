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
export default function Profile({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation} />}
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
            <View style={styles.wishlistview}>
              <IconButton
                onPress={() => {
                  navigation.navigate(ScreenNames.WISH);
                }}
                title={"My Wish List"}
                containerStyle={styles.wcontainer}
                textStyle={styles.wtexticon}
                icon={
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: AppColors.primery,
                    }}
                  >
                    10
                  </Text>
                }
              />
              <IconButton
                onPress={() => {
                  navigation.navigate(ScreenNames.MYADS);
                }}
                title={"My Listings"}
                containerStyle={styles.wcontainer}
                textStyle={styles.wtexticon}
                icon={
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: AppColors.primery,
                    }}
                  >
                    10
                  </Text>
                }
              />
            </View>
          </View>
        </ImageBackground>
        <View style={{ padding: width(5) }}>
          <IconButton
            onPress={() => {
              navigation.navigate(ScreenNames.EDITPROFILE);
            }}
            title={"Personal Information"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            icon={
              <Entypo name="user" color={AppColors.primery} size={width(4)} />
            }
            iconright={<Ionicons name="chevron-forward" size={width(4)} />}
          />
          <IconButton
            onPress={() => {
              navigation.navigate(ScreenNames.PASSWORD);
            }}
            title={"Password"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            icon={
              <Entypo name="key" color={AppColors.primery} size={width(4)} />
            }
            iconright={<Ionicons name="chevron-forward" size={width(4)} />}
          />
          <IconButton
            title={"Privacy & Safety"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            icon={
              <Entypo name="shield" color={AppColors.primery} size={width(4)} />
            }
            iconright={<Ionicons name="chevron-forward" size={width(4)} />}
          />
          <IconButton
            onPress={() => {
              navigation.navigate(ScreenNames.ACCOUNT);
            }}
            title={"Manage Account"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            icon={
              <Fontisto
                name="player-settings"
                color={AppColors.primery}
                size={width(4)}
              />
            }
            iconright={<Ionicons name="chevron-forward" size={width(4)} />}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
