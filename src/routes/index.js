import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { LoginScreen, OnBoardingScreen, SignUpScreen } from '../screens/auth';
import { Loader } from '../components';
import ScreenNames from './routes';
import { CategoryScreen, DetailScreen, HomeScreen,BikeScreen, ListData, ProfileScreen, EditProfile, PasswordScreens, AccountScreen, WishScreen, MyListingScreen, AddPostScreen, ChatScreen, ChatView } from '../screens/app';
import { selectIsLoggedIn } from '../redux/slices/user';
import BottomNav from './bottom';
import MyDrawer from './drawr';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const isLogin = useSelector(selectIsLoggedIn)
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

        </Stack.Navigator>
    </NavigationContainer>
  );
}