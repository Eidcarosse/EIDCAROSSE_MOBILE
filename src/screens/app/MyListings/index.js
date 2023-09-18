import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import { MyListingView, ScreenWrapper } from "../../../components";
import Header from "../../../components/header";
import { selectUserMeta } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
import { getAllMyData } from "../../../backend/api";
import { setAppLoader } from "../../../redux/slices/config";
import { getOwneAd } from "../../../backend/auth";
import { useFocusEffect } from "@react-navigation/native";
export default function MyListing({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
const [data,setData]=useState([])

useFocusEffect(
  React.useCallback(async() => {
    dispatch(setAppLoader(true));
    let d= await getOwneAd()
    if(d)setData(d)
    else setData([])
     dispatch(setAppLoader(false));
  }, [])
);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ width: width(100), alignItems: "center" }}>
          {data?.adIds?.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate(ScreenNames.DETAIL, item);
              }}
              key={index}
              style={{ width: width(100), alignItems: "center" }}
            >
              <MyListingView data={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
