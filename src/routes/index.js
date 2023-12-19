import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getDatabase, off, onValue, ref } from "firebase/database";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataofHomePage } from "../backend/api";
import { getOwneAd, loginApi } from "../backend/auth";
import { getCategory } from "../backend/common";
import { Loader } from "../components";
import { Alert } from "react-native";
import {
  setAppLoader,
  setCategoryList,
  setShowViber,
  setShowWhatsapp,
  setTopAds,
} from "../redux/slices/config";
import { setLanguage } from "../redux/slices/language";
import {
  selectIsLoggedIn,
  setAdsFav,
  setChatRooms,
  setIsLoggedIn,
  setToken,
  setUserAds,
  setUserMeta,
} from "../redux/slices/user";
import {
  AboutUsScreen,
  AccountScreen,
  AddPostScreen,
  AppSetting,
  BikeScreen,
  CategoryScreen,
  ChatViewScreen,
  DetailScreen,
  EditProfile,
  FAQScreen,
  HTSFScreen,
  ListData,
  MapAdView,
  MyListingScreen,
  OtherProfileScreen,
  PasswordScreens,
  PrivacyPolicyScreen,
  PrivacySafety,
  ProfileScreen,
  RepairSreen,
  SellUsScreen,
  TNCScreen,
  WishScreen,
} from "../screens/app";
import {
  CPFscreen,
  ForgetPasswordScreen,
  LoginScreen,
  OnBoardingScreen,
  SignUpScreen,
  verifyScreen,
} from "../screens/auth";
import i18n from "../translation";
import {
  errorMessage,
  getAuthData,
  getDatav,
  getDataw,
  getlangData,
} from "../utills/Methods";
import MyDrawer from "./drawr";
import ScreenNames from "./routes";
import { useTranslation } from "react-i18next";
const Stack = createNativeStackNavigator();

export default function Routes() {
  const db = getDatabase();
  const { t } = useTranslation();
  const isLogin = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    getuser();
  }, []);
  useEffect(() => {
    getData();
  }, []);
  const getData = useCallback(async () => {
    dispatch(setAppLoader(true));
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
  const getuser = async () => {
    let data = await getAuthData();
    if (data) {
      login(data);
    }
    const w = await getDataw();
    const v = await getDatav();
    if (w) {
      dispatch(setShowWhatsapp(w == 1 ? true : false));
    }
    if (v) dispatch(setShowViber(v == 1 ? true : false));
  };
  const login = async (data) => {
    try {
      const response = await loginApi(data);
      if (response?.data) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(response?.data?.userDetails));
        dispatch(setToken(response?.data?.token));
        const userAd = await getOwneAd(response?.data?.userDetails?._id);
        dispatch(setUserAds(userAd));
        dispatch(setAdsFav(response?.data?.userDetails?.favAdIds));
        dispatch(setAppLoader(false));
        fetchRoomsData(response?.data?.userDetails?._id);
      } else {
        Alert.alert(t("flashmsg.alert"), t("flashmsg.reloginMsg"), [
          { text: "OK", onPress: () => {} },
        ]);
      }
    } catch (error) {
      errorMessage("Network error");
      dispatch(setAppLoader(false));
    }
  };
  useEffect(() => {
    getCategorylist();
  }, []);

  async function getCategorylist() {
    const d = await getCategory();
    if (d) dispatch(setCategoryList(d));
  }
  const fetchRoomsData = async (userId) => {
    try {
      roomRef = ref(db, `users/${userId}/rooms`);

      const handleRoomUpdate = (snapshot) => {
        const room = snapshot.val() || [];
        dispatch(setChatRooms(room));
      };

      onValue(roomRef, handleRoomUpdate);

      // Clean up the listener when the component is unmounted or the user logs out
      return () => {
        if (roomRef) {
          off(roomRef, handleRoomUpdate);
        }
      };
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  useEffect(() => {
    languageset();
  }, []);

  const languageset = async () => {
    let lang = await getlangData();
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };
  return (
    <NavigationContainer>
      <Loader />
      <Stack.Navigator screenOptions={{ header: () => false }}>
        <Stack.Screen name={"drawr"} component={MyDrawer} />
        <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={ScreenNames.FORGET}
          component={ForgetPasswordScreen}
        />
        <Stack.Screen name={ScreenNames.VERIFY} component={verifyScreen} />
        <Stack.Screen name={ScreenNames.SIGNUP} component={SignUpScreen} />
        <Stack.Screen name={ScreenNames.DETAIL} component={DetailScreen} />
        <Stack.Screen name={ScreenNames.CATEGORY} component={CategoryScreen} />
        <Stack.Screen name={ScreenNames.BIKECATEGORY} component={BikeScreen} />
        <Stack.Screen name={ScreenNames.LISTDATA} component={ListData} />
        <Stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
        <Stack.Screen
          name={ScreenNames.OTHERPROFILE}
          component={OtherProfileScreen}
        />
        <Stack.Screen name={ScreenNames.EDITPROFILE} component={EditProfile} />
        <Stack.Screen name={ScreenNames.PASSWORD} component={PasswordScreens} />
        <Stack.Screen name={ScreenNames.ACCOUNT} component={AccountScreen} />
        <Stack.Screen name={ScreenNames.WISH} component={WishScreen} />
        <Stack.Screen name={ScreenNames.MAP} component={MapAdView} />
        <Stack.Screen
          name={ScreenNames.MYLISTING}
          component={MyListingScreen}
        />
        <Stack.Screen name={ScreenNames.ADDPOST} component={AddPostScreen} />
        <Stack.Screen name={ScreenNames.CHAT} component={ChatViewScreen} />
        <Stack.Screen name={ScreenNames.FAQ} component={FAQScreen} />
        <Stack.Screen name={ScreenNames.HTSF} component={HTSFScreen} />
        <Stack.Screen name={ScreenNames.ABOUTUS} component={AboutUsScreen} />
        <Stack.Screen name={ScreenNames.TNC} component={TNCScreen} />
        <Stack.Screen name={ScreenNames.PP} component={PrivacyPolicyScreen} />
        <Stack.Screen name={ScreenNames.SNTU} component={SellUsScreen} />
        <Stack.Screen name={ScreenNames.REPAIR} component={RepairSreen} />
        <Stack.Screen name={ScreenNames.SETTING} component={AppSetting} />
        <Stack.Screen name={ScreenNames.PANDS} component={PrivacySafety} />

        <Stack.Screen name={ScreenNames.CPF} component={CPFscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
