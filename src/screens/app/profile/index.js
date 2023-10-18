import { Entypo, Fontisto,MaterialIcons, Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import {
  FilePickerModal,
  Header,
  IconButton,
  ScreenWrapper,
} from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import {
  selectFavAds,
  selectToken,
  selectUserAds,
  selectUserMeta,
} from "../../../redux/slices/user";
export default function Profile({ navigation, route }) {
  const dispatch = useDispatch();
  const userdata = useSelector(selectUserMeta);
  const userAds = useSelector(selectUserAds);
  const userFav=useSelector(selectFavAds)
  const token = useSelector(selectToken);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
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
                    fontSize: width(5),
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  {userdata?.firstName} {userdata?.lastName}
                </Text>

                <Text style={styles.ptext}>{userdata?.userName}</Text>
                <Text style={styles.ptext}>{userdata?.email}</Text>
                <Text style={styles.ptext}>{userdata?.phoneNumber}</Text>
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
                      color: AppColors.primary,
                    }}
                  >
                    {userFav?.length||0}
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
                      color: AppColors.primary,
                    }}
                  >
                    {userAds?.length||0}
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
              <Entypo name="user" color={AppColors.primary} size={width(4)} />
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
              <Entypo name="key" color={AppColors.primary} size={width(4)} />
            }
            iconright={<Ionicons name="chevron-forward" size={width(4)} />}
          />
          <IconButton
            title={"Privacy & Safety"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            icon={
              <Entypo name="shield" color={AppColors.primary} size={width(4)} />
            }
            iconright={<Ionicons name="chevron-forward" size={width(4)} />}
          />
          <IconButton
            onPress={() => {
              navigation.navigate(ScreenNames.ACCOUNT);
            }}
            title={"App Setting"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            icon={
              <Fontisto
                name="player-settings"
                color={AppColors.primary}
                size={width(4)}
              />
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
              <MaterialIcons
                name="account-tree"
                color={AppColors.primary}
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
