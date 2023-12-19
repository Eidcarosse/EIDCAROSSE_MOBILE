import React, { useCallback, useRef, useState, useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenWrapper } from "../../../components";
import CardView from "../../../components/CardView";
import CategoryList from "../../../components/categorylist";
import Header from "../../../components/header";
import SearchBar from "../../../components/searchbar";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
//import { data } from "../../../utills/Data";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icons from "../../../asset/images";
import { getDataofHomePage } from "../../../backend/api";
import { useRoute } from "@react-navigation/native";
import {
  selectTopAds,
  setAppLoader,
  setTopAds,
} from "../../../redux/slices/config";
import { width } from "../../../utills/Dimension";

import styles from "./styles";
import { Card } from "../../../components";
import { useScrollToTop } from "@react-navigation/native";
import { selectCurrentLanguage } from "../../../redux/slices/language";
export default function Home({}) {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  useScrollToTop(scrollViewRef);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data = useSelector(selectTopAds);
  const [refreshing, setRefreshing] = useState(false);
  const [searchString, setSearchString] = useState("");
  const onRefresh = async () => {
    // setRefreshing(true);
    dispatch(setAppLoader(true));
    getData();
    setTimeout(() => {
      dispatch(setAppLoader(false));
    }, 1000);
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [selectCurrentLanguage])
  );
  const getData = useCallback(async () => {
    // dispatch(setAppLoader(true));
    try {
      const data = await getDataofHomePage();
      if (data) {
        dispatch(setTopAds(data));
      } else {
        dispatch(setTopAds([]));
      }
      dispatch(setAppLoader(false));
    } catch (error) {
      console.log("Error:", error);
      dispatch(setAppLoader(false));
    }
  });

  return (
    <ScreenWrapper
    showStatusBar={false}
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
      refreshing={refreshing}
      onRefresh={onRefresh}
      scrollViewRef={scrollViewRef}
    >
      <View style={styles.mainViewContainer}>
        <SearchBar
          search={searchString}
          setSearch={setSearchString}
          containerstyle={styles.search}
          next={true}
        />
        <CategoryList navigation={navigation} search={searchString} />
        <View style={styles.titleview}>
          <Text style={{ fontSize: width(3.5), fontWeight: "bold" }}>
            {t("home.letest")}
          </Text>
          <Pressable onPress={() => navigation.navigate(ScreenNames.LISTDATA)}>
            <Text
              style={{
                fontSize: 12,
                marginTop: 8,
                color: "grey",
                fontWeight: "bold",
              }}
            >
              {t("home.seeAll")}
            </Text>
          </Pressable>
        </View>
        <View style={{ width: width(100), alignItems: "center" }}>
          {data?.length === 0 ? (
            <View style={styles.notfoundview}>
              <Image
                source={Icons.empty}
                style={{ height: width(30), width: width(30) }}
              />
            </View>
          ) : (
            data.map((item, index) => (
              <View
                key={index}
                style={{ width: width(100), alignItems: "center" }}
              >
                <Card data={item} />
              </View>
            ))
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
