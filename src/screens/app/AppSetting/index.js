import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Head, ScreenWrapper } from "../../../components";
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

export default function AppSetting({ navigation, route }) {
  const countries = [
    { key: "appseting.English", value: "English" },
    { key: "appseting.German", value: "German" },
    { key: "appseting.Italian", value: "Italian" },
    { key: "appseting.Spanish", value: "Spanish" },
    { key: "appseting.French", value: "French" },
  ];
  const { t, i18n } = useTranslation();
  const lang = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();

  const changeAppLanguage = (newLanguage) => {
    console.log("change language");
    let value;

    switch (newLanguage) {
      case "English":
        value = "en";
        break;
      case "German":
        value = "de";
        break;
      case "Italian":
        value = "it";
        break;
      case "Spanish":
        value = "es";
        break;
      case "French":
        value = "fr";
        break;
      default:
        value = "en";
    }

    // store.dispatch(changeLanguage(value)); // If you're using Redux
    i18n.changeLanguage(value);
  };

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
        <Text
          style={{ fontSize: width(5), width: width(100), padding: width(4) }}
        >
          {t("appseting.language")}
        </Text>
        <SelectDropdown
          data={countries}
          search={true}
          defaultButtonText={lang}
          searchPlaceHolder={t("addPost.phsearchHere")}
          buttonStyle={styles.searchbox}
          selectedRowStyle={{ backgroundColor: AppColors.primary }}
          selectedRowTextStyle={{ color: AppColors.white }}
          buttonTextStyle={{
            textAlign: "left",
            fontSize: width(3.5),
          }}
          renderDropdownIcon={() => <AntDesign name="down" size={width(3.5)} />}
          dropdownIconPosition="right"
          dropdownStyle={styles.dropdown}
          onSelect={(selectedItem, index) => {
            dispatch(setLanguage(selectedItem.value));
            changeAppLanguage(selectedItem.value);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return t(selectedItem.key);
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return t(item.key);
          }}
        />
      </View>
    </ScreenWrapper>
  );
}
