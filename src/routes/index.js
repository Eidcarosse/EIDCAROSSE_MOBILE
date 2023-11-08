import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";

import { getDatabase, off, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { getDataofHomePage } from "../backend/api";
import { getOwneAd, loginApi } from "../backend/auth";
import { Loader } from "../components";
import { setAppLoader, setTopAds } from "../redux/slices/config";
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
  ProfileScreen,
  RepairSreen,
  SellUsScreen,
  TNCScreen,
  WishScreen,
} from "../screens/app";
import { LoginScreen, OnBoardingScreen, SignUpScreen } from "../screens/auth";
import { errorMessage, getAuthData } from "../utills/Methods";
import MyDrawer from "./drawr";
import ScreenNames from "./routes";
const Stack = createNativeStackNavigator();

export default function Routes() {
  const db = getDatabase();
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
  };
  const login = async (data) => {
    try {
      // dispatch(setAppLoader(true));
      const response = await loginApi(data);
      if (response?.data) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(response?.data?.userDetails));
        dispatch(setToken(response?.data?.token));
        const userAd = await getOwneAd(response?.data?.userDetails?._id);
        //const userFav=await getFavAds(response?.data?.userDetails?._id)
        dispatch(setUserAds(userAd));
        dispatch(setAdsFav(response?.data?.userDetails?.favAdIds));
        dispatch(setAppLoader(false));
        fetchRoomsData(response?.data?.userDetails?._id);
      } else {
        alert("Re-login");
        //  dispatch(setAppLoader(false));
      }
    } catch (error) {
      errorMessage("Network error");
      // dispatch(setAppLoader(false));
    }
  };
  // const fetchRoomsData = async (id) => {
  //   let roomRef;
  //   try {
  //     console.log(id);
  //     roomRef = ref(db, `RoomLists/${id}/rooms`);

  //     const handleRoomUpdate = (snapshot) => {
  //       const room = snapshot.val() || [];
  //       console.log('====================================');
  //       console.log(room);
  //       console.log('====================================');
  //     };

  //     onValue(roomRef, handleRoomUpdate);

  //     // Clean up the listener when the component is unmounted or the user logs out
  //     return () => {
  //       if (roomRef) {
  //         off(roomRef, handleRoomUpdate);
  //       }
  //     };
  //   } catch (error) {
  //     console.error("Error fetching room data:", error);
  //   }
  // };
  const fetchRoomsData = async (userId) => {
    console.log(userId);
    try {
      console.log("Updating rooms list");
      roomRef = ref(db, `users/${userId}/rooms`);

      const handleRoomUpdate = (snapshot) => {
        const room = snapshot.val() || [];
        console.log(room);
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

  return (
    <NavigationContainer>
      <Loader />
      <Stack.Navigator screenOptions={{ header: () => false }}>
        <Stack.Screen name={"drawr"} component={MyDrawer} />
        <Stack.Screen
          name={ScreenNames.ONBOARDING}
          component={OnBoardingScreen}
        />
        <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
