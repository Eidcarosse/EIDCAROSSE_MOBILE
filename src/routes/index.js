import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getDatabase, off, onValue, ref } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataofAdByID, getDataofHomePage } from "../backend/api";
import { getOwneAd, getUserByID, loginApi } from "../backend/auth";
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
  setChatRedux,
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
  getAuthAllData,
  getAuthData,
  getDatav,
  getDataw,
  getlangData,
  setAuthData,
} from "../utills/Methods";
import MyDrawer from "./drawr";
import ScreenNames from "./routes";
import { useTranslation } from "react-i18next";
import * as Network from "expo-network";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const db = getDatabase();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    dispatch(setAppLoader(true));
    getNetwork();
    languageset();
  }, []);
  useEffect(() => {
    if (isConnected) {
      getuser();
      getData();
      getCategorylist();
    } else {
      dispatch(setAppLoader(true));
      alert("Check internet conection");
    }
  }, [isConnected]);

  const getData = useCallback(async () => {
    try {
      const data = await getDataofHomePage();

      if (data) {
        dispatch(setTopAds(data));
      } else {
        dispatch(setTopAds([]));
      }
    } catch (error) {
      console.log("Error:", error);
      dispatch(setAppLoader(false));
    }
  });
  const getNetwork = async () => {
    let a = await Network.getNetworkStateAsync();
    setIsConnected(a);
  };
  const getuser = async () => {
    try {
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
    } catch (error) {
      dispatch(setAppLoader(false));
    }
  };
  const login = async (data) => {
    try {
      const response = await loginApi(data);
      if (response?.data) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(response?.data?.userDetails));
        dispatch(setToken(response?.data?.token));
        await fetchRoomsData(response?.data?.userDetails?._id);
        const userAd = await getOwneAd(response?.data?.userDetails?._id);
        setUser(response?.data?.userDetails);
        dispatch(setUserAds(userAd));
        dispatch(setAdsFav(response?.data?.userDetails?.favAdIds));
      } else if (response?.data?.success == false && isConnected) {
        dispatch(setIsLoggedIn(false));
        dispatch(setUserMeta(null));
        dispatch(setUserAds(null));
        dispatch(setAdsFav([]));
        await setAuthData(null),
          Alert.alert(t("flashmsg.alert"), t("flashmsg.reloginMsg"), [
            { text: "OK", onPress: () => {} },
          ]);
      } else {
        let userData = await getAuthAllData();
        if (userData) {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserMeta(userData));

          await fetchRoomsData(userData?._id);
          const userAd = await getOwneAd(userData?._id);
          setUser(userData);
          dispatch(setUserAds(userAd));
          dispatch(setAdsFav(userData?.favAdIds));
        }
        Alert.alert(t("flashmsg.alert"), t("Check the Internet connection"), [
          { text: "OK", onPress: () => {} },
        ]);
      }
    } catch (error) {
      errorMessage("Network error");
      dispatch(setAppLoader(false));
    }
  };

  const fetchData = useCallback(async (data) => {
    const search =
      user?._id === data.split("_")[0]
        ? data.split("_")[1]
        : data.split("_")[0];
    const fetchedUser = await getUserByID(search);
    return fetchedUser;
  });
  const myFunction = useCallback(async (data) => {
    let lastmsg = {};
    const messagesRef = ref(db, `chatrooms/${data}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();

      if (messageData) {
        const messageList = Object.values(messageData);
        messageList.forEach((message) => {
          lastmsg = {
            message: message?.text,
            date: message?.timestamp,
            image: message?.images,
          };
        });
      }
    });
    return lastmsg;
  });

  const getItems = useCallback(async (data) => {
    const response = await getDataofAdByID(data.split("_")[2]);
    return response;
  });

  async function getCategorylist() {
    const d = await getCategory();
    if (d) dispatch(setCategoryList(d));
  }
  const fetchRoomsData = async (userId) => {
    try {
      roomRef = ref(db, `users/${userId}/rooms`);

      const handleRoomUpdate = async (snapshot) => {
        const room = snapshot.val() || [];
        await promisFuntion(room);
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
  const promisFuntion = async (allRooms) => {
    try {
      const promises = allRooms.map(async (element) => {
        let u = await fetchData(element);
        let l = await myFunction(element);
        let i = await getItems(element);
        return {
          roomId: element,
          user: u,
          lastmsg: l,
          product: i,
        };
      });

      const newData = await Promise.all(promises);

      dispatch(setChatRedux(newData));
      dispatch(setAppLoader(false));
    } catch (e) {
      dispatch(setAppLoader(false));
    }
  };
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
