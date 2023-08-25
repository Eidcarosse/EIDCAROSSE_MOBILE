import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { LoginScreen, OnBoardingScreen, SignUpScreen } from '../screens/auth';
import { Loader } from '../components';
import ScreenNames from './routes';
import { CategoryScreen, DetailScreen, HomeScreen,BikeScreen, ListData, ProfileScreen } from '../screens/app';
import { selectIsLoggedIn } from '../redux/slices/user';
import BottomNav from './bottom';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const isLogin = useSelector(selectIsLoggedIn)
  return (
    <NavigationContainer>
      <Loader />
    
        <Stack.Navigator initialRouteName={ScreenNames.ONBOARDING} screenOptions={{ header: () => false }}>
          <Stack.Screen name={ScreenNames.BUTTOM} component={BottomNav} />
          <Stack.Screen name={ScreenNames.ONBOARDING} component={OnBoardingScreen} />
          <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ScreenNames.SIGNUP} component={SignUpScreen} />
          <Stack.Screen name={ScreenNames.DETAIL} component={DetailScreen} />
          <Stack.Screen name={ScreenNames.CATEGORY} component={CategoryScreen} />
          <Stack.Screen name={ScreenNames.BIKECATEGORY} component={BikeScreen} />
          <Stack.Screen name={ScreenNames.LISTDATA} component={ListData} />
          <Stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
          
        </Stack.Navigator>
    </NavigationContainer>
  );
}