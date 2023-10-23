import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
export default function AppSetting({ navigation, route }) {
  const countries = ["English","French",];
  const {i18n } = useTranslation();

  const changeAppLanguage = (newLanguage) => {
    console.log("change langugae");
    let value=newLanguage=="French"?'fr':'en'
    // store.dispatch(changeLanguage(value));
    i18n.changeLanguage(value)
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"App Setting"} navigation={navigation} />
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
          language
        </Text>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            changeAppLanguage(selectedItem)
            // console.log(selectedItem, index);
          }}
          buttonStyle={styles.searchbox}
          renderDropdownIcon={()=><AntDesign name="down" size={width(3.5)}/>}
          dropdownIconPosition='right'
          selectedRowStyle={{ backgroundColor: AppColors.primary }}
          selectedRowTextStyle={{ color: AppColors.white }}
          buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
          dropdownStyle={styles.dropdown}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
    </ScreenWrapper>
  );
}
