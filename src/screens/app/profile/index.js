import { Entypo, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import { Header, IconButton, ScreenWrapper } from "../../../components";
import {
  selectFavAds,
  selectUserAds,
  selectUserMeta,
} from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
export default function Profile({ navigation, route }) {
  const dispatch = useDispatch();
  const userdata = useSelector(selectUserMeta);
  const userAds = useSelector(selectUserAds);
  const userFav = useSelector(selectFavAds);

  return (
    <ScreenWrapper
      showStatusBar={false}
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground
          source={Icons.bglogo}
          style={{ width: width(100), height: height(30) }}
        >
          <View style={styles.imageiner}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.avatar} source={{ uri: userdata?.image }} />
              <View style={{ paddingLeft: width(5) }}>
                <Text
                  style={{
                    fontSize: height(2.7),
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  {userdata?.firstName} {userdata?.lastName}
                </Text>

                {/* <Text style={styles.ptext}>{userdata?.userName}</Text> */}
                <Text style={styles.ptext}>{userdata?.email}</Text>
                <Text style={styles.ptext}>{userdata?.phoneNumber}</Text>
              </View>
            </View>
            <View style={styles.wishlistview}>
              <IconButton
                onPress={() => {
                  navigation.navigate(ScreenNames.WISH);
                }}
                title={"profile.wish"}
                containerStyle={styles.wcontainer}
                textStyle={styles.wtexticon}
                icon={
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: AppColors.primary,
                    }}
                  >
                    {userFav?.length || 0}
                  </Text>
                }
              />
              <IconButton
                onPress={() => {
                  navigation.navigate(ScreenNames.MYADS);
                }}
                title={"profile.listing"}
                containerStyle={styles.wcontainer}
                textStyle={styles.wtexticon}
                icon={
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: AppColors.primary,
                    }}
                  >
                    {userAds?.length || 0}
                  </Text>
                }
              />
            </View>
          </View>
        </ImageBackground>
        <KeyboardAwareScrollView>
          <View style={{ padding: height(2) }}>
            <IconButton
              onPress={() => {
                navigation.navigate(ScreenNames.EDITPROFILE);
              }}
              title={"profile.personalInformation"}
              containerStyle={styles.container}
              textStyle={styles.texticon}
              icon={
                <Entypo name="user" color={AppColors.primary} size={height(2)} />
              }
              iconright={<Ionicons name="chevron-forward" size={height(2)} />}
            />
            <IconButton
              onPress={() => {
                navigation.navigate(ScreenNames.PASSWORD);
              }}
              title={"profile.password"}
              containerStyle={styles.container}
              textStyle={styles.texticon}
              icon={
                <Entypo name="key" color={AppColors.primary} size={height(2)} />
              }
              iconright={<Ionicons name="chevron-forward" size={height(2)} />}
            />
            <IconButton
              title={"profile.privacy"}
              onPress={() => {
                navigation.navigate(ScreenNames.PANDS);
              }}
              containerStyle={styles.container}
              textStyle={styles.texticon}
              icon={
                <Entypo
                  name="shield"
                  color={AppColors.primary}
                  size={height(2)}
                />
              }
              iconright={<Ionicons name="chevron-forward" size={height(2)} />}
            />
            <IconButton
              onPress={() => {
                navigation.navigate(ScreenNames.SETTING);
              }}
              title={"profile.appSetting"}
              containerStyle={styles.container}
              textStyle={styles.texticon}
              icon={
                <Fontisto
                  name="player-settings"
                  color={AppColors.primary}
                  size={height(2)}
                />
              }
              iconright={<Ionicons name="chevron-forward" size={height(2)} />}
            />
            <IconButton
              onPress={() => {
                navigation.navigate(ScreenNames.ACCOUNT);
              }}
              title={"profile.manageAccount"}
              containerStyle={styles.container}
              textStyle={styles.texticon}
              icon={
                <MaterialIcons
                  name="account-tree"
                  color={AppColors.primary}
                  size={height(2)}
                />
              }
              iconright={<Ionicons name="chevron-forward" size={height(2)} />}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </ScreenWrapper>
  );
}
