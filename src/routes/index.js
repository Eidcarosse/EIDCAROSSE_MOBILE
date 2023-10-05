import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { getOwneAd, loginApi } from "../backend/auth";
import { Loader } from "../components";
import { setAppLoader, setTopAds } from "../redux/slices/config";
import {
  selectIsLoggedIn,
  setAdsFav,
  setIsLoggedIn,
  setToken,
  setUserAds,
  setUserMeta,
} from "../redux/slices/user";
import {
  AboutUsScreen,
  AccountScreen,
  AddPostScreen,
  BikeScreen,
  CategoryScreen,
  ChatView,
  DetailScreen,
  EditProfile,
  FAQScreen,
  HTSFScreen,
  ListData,
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
import { getDataofHomePage } from "../backend/api";
import { getFavAds } from "../backend/auth";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const isLogin = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    getuser();
  }, []);
  useEffect(()=>{
    getData();
  },[])
  const getData =useCallback( async () => {
    dispatch(setAppLoader(true));
    try {
      const data = await getDataofHomePage();

      if (data) {
        dispatch(setTopAds(data))
      } else {
        dispatch(setTopAds([]))
      }
      dispatch(setAppLoader(false));
    } catch (error) {
      console.log("Error:", error);
      dispatch(setAppLoader(false));
    }
  })
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
        dispatch(setAdsFav(response?.data?.userDetails?.favAdIds))
        dispatch(setAppLoader(false));
      } else {
        alert("Re-login");
        //  dispatch(setAppLoader(false));
      }
    } catch (error) {
      errorMessage("Network error");
      // dispatch(setAppLoader(false));
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
        <Stack.Screen name={ScreenNames.OTHERPROFILE} component={OtherProfileScreen} />
        <Stack.Screen name={ScreenNames.EDITPROFILE} component={EditProfile} />
        <Stack.Screen name={ScreenNames.PASSWORD} component={PasswordScreens} />
        <Stack.Screen name={ScreenNames.ACCOUNT} component={AccountScreen} />
        <Stack.Screen name={ScreenNames.WISH} component={WishScreen} />
        <Stack.Screen
          name={ScreenNames.MYLISTING}
          component={MyListingScreen}
        />
        <Stack.Screen name={ScreenNames.ADDPOST} component={AddPostScreen} />
        <Stack.Screen name={ScreenNames.CHAT} component={ChatView} />
        <Stack.Screen name={ScreenNames.FAQ} component={FAQScreen} />
        <Stack.Screen name={ScreenNames.HTSF} component={HTSFScreen} />
        <Stack.Screen name={ScreenNames.ABOUTUS} component={AboutUsScreen} />
        <Stack.Screen name={ScreenNames.TNC} component={TNCScreen} />
        <Stack.Screen name={ScreenNames.PP} component={PrivacyPolicyScreen} />
        <Stack.Screen name={ScreenNames.SNTU} component={SellUsScreen} />
        <Stack.Screen name={ScreenNames.REPAIR} component={RepairSreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
