import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Head, IconButton, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
import { selectUserMeta, setUserMeta } from "../../../redux/slices/user";
import { getShowAds, getShowNumber } from "../../../backend/auth";
import {
  selectShowViber,
  selectShowWhatsapp,
  setAppLoader,
  setShowViber,
  setShowWhatsapp,
} from "../../../redux/slices/config";
import { setData, setDatav, setDataw } from "../../../utills/Methods";

export default function PrivacySafety({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserMeta);
  const whatsapp = useSelector(selectShowWhatsapp);
  const viber = useSelector(selectShowViber);

  const { t, i18n } = useTranslation();
  const getNumber = async () => {
    dispatch(setAppLoader(true));
    const res = await getShowNumber(user?._id);
    if (res) {
      dispatch(setUserMeta(res?.user));
      dispatch(setAppLoader(false));
    } else {
      dispatch(setAppLoader(false));
    }
  };
  const getAds = async () => {
    dispatch(setAppLoader(true));
    const res = await getShowAds(user?._id);
    if (res) {
      dispatch(setUserMeta(res?.user));
      dispatch(setAppLoader(false));
    } else {
      dispatch(setAppLoader(false));
    }
  };
  return (
    <ScreenWrapper
    showStatusBar={false}
      headerUnScrollable={() => (
        <Head headtitle={"privacySafety.title"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      backgroundColor={AppColors.white}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <IconButton
          onPress={getNumber}
          title={"privacySafety.number"}
          containerStyle={styles.container}
          textStyle={styles.texticon}
          iconright={
            <Fontisto
              name={!user?.showNumber ? "toggle-off" : "toggle-on"}
              color={!user?.showNumber ? "black" : AppColors.primary}
              size={width(6)}
            />
          }
        />

        <IconButton
          onPress={async () => {
            dispatch(setShowWhatsapp(!whatsapp)),
              await setDataw(whatsapp ? 0 : 1);
          }}
          title={"privacySafety.whatsapp"}
          containerStyle={styles.container}
          textStyle={styles.texticon}
          iconright={
            <Fontisto
              name={!whatsapp ? "toggle-off" : "toggle-on"}
              color={!whatsapp ? "black" : AppColors.primary}
              size={width(6)}
            />
          }
        />
        <IconButton
          onPress={async () => {
            dispatch(setShowViber(!viber)), await setDatav(viber ? 0 : 1);
          }}
          title={"privacySafety.viber"}
          containerStyle={styles.container}
          textStyle={styles.texticon}
          iconright={
            <Fontisto
              name={!viber ? "toggle-off" : "toggle-on"}
              color={!viber ? "black" : AppColors.primary}
              size={width(6)}
            />
          }
        />
        <IconButton
          onPress={getAds}
          title={"privacySafety.ads"}
          containerStyle={styles.container}
          textStyle={styles.texticon}
          iconright={
            <Fontisto
              name={user?.showAds ? "toggle-off" : "toggle-on"}
              color={user?.showAds ? "black" : AppColors.primary}
              size={width(6)}
            />
          }
        />
      </View>
    </ScreenWrapper>
  );
}
