import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreen, OnBoardingScreen, SignUpScreen } from '../screens/auth';
import { Loader } from '../components';
import ScreenNames from './routes';
import { CategoryScreen, DetailScreen, HomeScreen,BikeScreen, ListData, ProfileScreen, EditProfile, PasswordScreens, AccountScreen, WishScreen, MyListingScreen, AddPostScreen, ChatScreen, ChatView, FAQScreen, HTSFScreen, AboutUsScreen, TNCScreen, PrivacyPolicyScreen, SellUsScreen, RepairSreen } from '../screens/app';
import { selectIsLoggedIn, setIsLoggedIn, setToken, setUserMeta } from '../redux/slices/user';
import BottomNav from './bottom';
import MyDrawer from './drawr';
import { setAppLoader } from '../redux/slices/config';
import { ApiManager } from '../backend/ApiManager';
import { getAuthData } from '../utills/Methods';
import { errorMessage } from '../utills/Methods';
import { successMessage } from '../utills/Methods';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const isLogin = useSelector(selectIsLoggedIn)
  const dispatch=useDispatch();

React.useEffect(()=>{
  getuser()
},[])
const getuser=async()=>{
  let data=await getAuthData()
  if(data){
    login(data);
  }
}
  const login = async (data) => {
    try {
     
      dispatch(setAppLoader(true))
      const response = await ApiManager.post("/auth", data);
    // console.log("in coming data ",data);
      if (response?.data) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(response?.data?.data?.userData));
        dispatch(setToken(response?.data?.data?.token));
        dispatch(setAppLoader(false))
      }
      else{alert("Relogin"),dispatch(setAppLoader(false))}
    } catch (error) {
      errorMessage("Network error")
      dispatch(setAppLoader(false))
    }
  };

  
  return (
    <NavigationContainer>
      <Loader />
    
        <Stack.Navigator  screenOptions={{ header: () => false }}>
          <Stack.Screen name={'drawr'} component={MyDrawer} />
          <Stack.Screen name={ScreenNames.ONBOARDING} component={OnBoardingScreen} />
          <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ScreenNames.SIGNUP} component={SignUpScreen} />
          <Stack.Screen name={ScreenNames.DETAIL} component={DetailScreen} />
          <Stack.Screen name={ScreenNames.CATEGORY} component={CategoryScreen} />
          <Stack.Screen name={ScreenNames.BIKECATEGORY} component={BikeScreen} />
          <Stack.Screen name={ScreenNames.LISTDATA} component={ListData} />
          <Stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
          <Stack.Screen name={ScreenNames.EDITPROFILE} component={EditProfile} />
          <Stack.Screen name={ScreenNames.PASSWORD} component={PasswordScreens} />
          <Stack.Screen name={ScreenNames.ACCOUNT} component={AccountScreen} />
          <Stack.Screen name={ScreenNames.WISH} component={WishScreen} />
          <Stack.Screen name={ScreenNames.MYLISTING} component={MyListingScreen} />
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