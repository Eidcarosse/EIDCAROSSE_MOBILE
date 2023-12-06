import { FontAwesome, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import {
  CardView,
  FilePickerModal,
  Head,
  Header,
  IconButton,
  ScreenWrapper,
} from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import {
  selectToken,
  selectUserAds,
  selectUserMeta,
} from "../../../redux/slices/user";
import { getOwneAd } from "../../../backend/auth";
import GlobalMethods from "../../../utills/Methods";
import { useTranslation } from "react-i18next";
export default function OtherProfile({ navigation, route }) {
  const userdata = route?.params?.user;
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const onRefresh = () => {
    setRefreshing(true);
    myAdsFunction();
    setRefreshing(false);
  };
  useEffect(() => {
    myAdsFunction();
  }, []);
  const myAdsFunction = async () => {
    const userAd = await getOwneAd(userdata?._id);
    if (userAd) setData(userAd);
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Head navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground
          source={Icons.bglogo}
          style={{ width: width(100), flex: 1 }}
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

                <Text
                  style={{
                    fontSize: width(3),
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  {userdata?.userName}
                </Text>
                <Text
                  style={{
                    fontSize: width(3),
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  {userdata?.email}
                </Text>
                <Text
                  style={{
                    fontSize: width(3),
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  {userdata?.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={styles.wishlistview}>
              {userdata?.showNumber && (
                <IconButton
                  onPress={GlobalMethods.onPressCall}
                  title={"Phone"}
                  containerStyle={styles.wcontainer}
                  textStyle={styles.wtexticon}
                  icon={
                    <FontAwesome
                      name="phone"
                      size={width(4)}
                      color={AppColors.primary}
                    />
                  }
                />
              )}
              <IconButton
                onPress={GlobalMethods.onPressEmail}
                title={"Email"}
                containerStyle={styles.wcontainer}
                textStyle={styles.wtexticon}
                icon={
                  <AntDesign
                    name="mail"
                    size={width(4)}
                    color={AppColors.primary}
                  />
                }
              />
              {/* <IconButton
                onPress={GlobalMethods.onPressCall}
                title={"Chat"}
                containerStyle={styles.wcontainer}
                textStyle={styles.wtexticon}
                icon={
                  <FontAwesome
                    name="wechat"
                    size={width(4)}
                    color={AppColors.primary}
                  />
                }
              /> */}
            </View>
          </View>
        </ImageBackground>
        <View
          style={{ width: width(100), flex: 2, paddingVertical: height(1) }}
        >
          {!userdata.showAds && (
            <ScrollView>
              {data?.map((item, index) => (
                <View
                  key={index}
                  style={{ width: width(100), alignItems: "center" }}
                >
                  <CardView data={item} />
                </View>
              ))}
            </ScrollView>
          )}
          {userdata.showAds && (
            <Text
              style={{
                alignSelf: "center",
                marginVertical: height(20),
                fontWeight: "bold",
              }}
            >
              {t("otherProfile.op")}
            </Text>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
