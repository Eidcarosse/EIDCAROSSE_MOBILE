import React, { useState } from "react";
import { Text, View } from "react-native";
import { AntDesign, Fontisto } from "@expo/vector-icons";

import { Head, IconButton, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLanguage,
  setLanguage,
} from "../../../redux/slices/language";
import { storelangData } from "../../../utills/Methods";

export default function PrivacySafety({ navigation, route }) {
  const dispatch = useDispatch();
  const [showNumber, setShowNumber] = useState(false);
  const [showAds, setShowAds] = useState(false);

  const { t, i18n } = useTranslation();

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"appseting.title"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      backgroundColor={AppColors.white}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <IconButton
          onPress={() => {
            setShowNumber(!showNumber);
          }}
          title={"Don't Show my Number"}
          containerStyle={styles.container}
          textStyle={styles.texticon}
          iconright={
            <Fontisto
              name={!showNumber ? "toggle-off" : "toggle-on"}
              color={!showNumber ? "black" : AppColors.primary}
              size={width(6)}
            />
          }
        />
        <IconButton
          onPress={() => {
            setShowAds(!showAds);
          }}
          title={"public see my all ads?"}
          containerStyle={styles.container}
          textStyle={styles.texticon}
          iconright={
            <Fontisto
              name={!showAds ? "toggle-off" : "toggle-on"}
              color={!showAds ? "black" : AppColors.primary}
              size={width(6)}
            />
          }
        />
      </View>
    </ScreenWrapper>
  );
}
