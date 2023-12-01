import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import { Menu, MenuItem } from "react-native-material-menu";

import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import { deleteAdById, refreshApi } from "../../backend/api";
import { useDispatch, useSelector } from "react-redux";
import { setAppLoader } from "../../redux/slices/config";
import { selectUserMeta, setUserAds } from "../../redux/slices/user";
import { getOwneAd } from "../../backend/auth";
import GlobalMethods from "../../utills/Methods";
import { useTranslation } from "react-i18next";
import { selectCurrentLanguage } from "../../redux/slices/language";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";

export default function MyCard({ data }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const language = useSelector(selectCurrentLanguage);
  const userid = userInfo?._id;
  const getData = useCallback(async (id) => {
    let d = await getOwneAd(id);
    if (d) dispatch(setUserAds(d));
    else dispatch(setUserAds([]));
  });
  const [sold, setSold] = useState(false);
  const [publish, setPublish] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const hideMenu = () => setModalVisible(false);

  const showMenu = () => setModalVisible(true);
  const deleteAd = async (id) => {
    dispatch(setAppLoader(true));
    try {
      const data = await deleteAdById(id);
      await getData(userid);
      dispatch(setAppLoader(false));
    } catch (error) {
      console.log("Error:", error);
      dispatch(setAppLoader(false));
    }
  };
  const refreshAd = async () => {
    dispatch(setAppLoader(true));
    try {
      const d = await refreshApi(data?._id);
      await getData(userid);
      dispatch(setAppLoader(false));
    } catch (error) {
      console.log("Error:", error);
      dispatch(setAppLoader(false));
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.imageview}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: data?.images[0] }}
        />
      </View>
      <View style={styles.detail}>
        <View>
          <Text numberOfLines={1} style={styles.titletext}>
            {data?.title}
          </Text>
          <View style={styles.categoryview}>
            <AntDesign name="clockcircleo" color={"grey"} size={width(4)} />
            <Text numberOfLines={1} style={styles.textcategory}>
              {GlobalMethods.calculateTimeDifference(data?.createdAt, language)}
            </Text>
          </View>

          <View style={styles.categoryview}>
            <AntDesign name="eye" color={"grey"} size={width(4)} />
            <Text numberOfLines={2} style={styles.textcategory}>
              {data?.views} Views
            </Text>
          </View>
        </View>
        {/* <View>
          <Text numberOfLines={1} style={styles.chf}>
            CHF {data?.price}
          </Text>
          <Text numberOfLines={1} style={styles.eur}>
            EUR {data?.price}
          </Text>
        </View> */}
        <View style={styles.detailinerview}>
          {data?.price ? (
            <View>
              <Text numberOfLines={1} style={styles.chf}>
                CHF {data?.price}
              </Text>
              <Text numberOfLines={1} style={styles.eur}>
                EUR {data?.price}
              </Text>
            </View>
          ) : (
            <View style={styles.cfpview}>
              <Text numberOfLines={1} style={styles.cfp}>
                Disabled Price
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.grey,
            padding: width(2),
            borderRadius: width(1),
          }}
          onPress={showMenu}
        >
          <Entypo size={width(4)} name="dots-three-vertical" />
        </TouchableOpacity>
        {sold ? (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: AppColors.primary,
              paddingHorizontal: width(3),
              padding: width(1),
              borderRadius: width(5),
              backgroundColor: AppColors.primary,
            }}
            disabled={true}
          >
            <Text
              style={{
                fontSize: width(2),
                color: AppColors.white,
                fontWeight: "bold",
              }}
            >
              {t("myad.sold")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: publish ? AppColors.grey : AppColors.primary,
              paddingHorizontal: width(3),
              padding: width(1),
              borderRadius: width(5),
              backgroundColor: publish ? AppColors.green : AppColors.primary,
            }}
            disabled={true}
          >
            <Text
              style={{
                fontSize: width(2.5),
                color: AppColors.white,
                fontWeight: publish ? "600" : "bold",
              }}
            >
              {publish ? t("myad.published") : t("myad.mute")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Menu visible={isModalVisible} onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            hideMenu();
            navigation.navigate(ScreenNames.ADDPOST, { data: data });
          }}
        >
          {t("myad.edit")}
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu();
            refreshAd();
          }}
        >
          {t("myad.refresh")}
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu(), deleteAd(data._id);
          }}
        >
          {t("myad.delete")}
        </MenuItem>
        {!sold && (
          <MenuItem
            onPress={() => {
              hideMenu();
              setSold(true);
            }}
          >
            {t("myad.markassold")}
          </MenuItem>
        )}
        {!sold ? (
          publish ? (
            <MenuItem
              onPress={() => {
                hideMenu();
                setPublish(false);
              }}
            >
              {t("myad.mute")}
            </MenuItem>
          ) : (
            <MenuItem
              onPress={() => {
                hideMenu();
                setPublish(true);
              }}
            >
              {t("myad.republish")}
            </MenuItem>
          )
        ) : (
          <MenuItem
            onPress={() => {
              hideMenu();
              setSold(false);
            }}
          >
            {t("myad.unsold")}
          </MenuItem>
        )}
      </Menu>
    </View>
  );
}
