// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  BikeScreen,
  CategoryScreen,
  ChatScreen,
  HomeScreen,
  MyListingScreen,
  ProfileScreen,
} from "../../screens/app";
import { DrawerSceneWrapper } from "../../components";
import { PreLogin } from "../../screens/auth";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slices/user";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { height, width } from "../../utills/Dimension";
import ScreenNames from "../routes";
import AppColors from "../../utills/AppColors";
import { Platform, View, Fragment } from "react-native";
import { ListData } from "../../screens/app";

import AddIcon from "../../svgcomponents/plus";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function TestStack() {
  return (
    <Stack.Navigator screenOptions={{ header: () => false }}>
      <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
      <Stack.Screen name={ScreenNames.LISTDATA} component={ListData} />
      <Stack.Screen name={ScreenNames.CATEGORY} component={CategoryScreen} />
      <Stack.Screen name={ScreenNames.BIKECATEGORY} component={BikeScreen} />
    </Stack.Navigator>
  );
}
const BottomNav = ({ navigation }) => {
  const islogin = useSelector(selectIsLoggedIn);
  return (
    <DrawerSceneWrapper>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "StackHome") {
              iconName = focused ? "ios-home-outline" : "ios-home-outline";
            } else if (route.name === "myChat") {
              iconName = focused
                ? "chatbubble-ellipses-outline"
                : "chatbubble-ellipses-outline";
            } else if (route.name === "tit") {
              return (
                <View
                  style={{
                    position: "absolute",
                    ...Platform.select({
                      ios: {
                        bottom: height(0.6),
                        // Additional iOS-specific styles
                      },
                      android: {
                        bottom: height(2.8),
                        // Additional Android-specific styles
                      },
                    }),
                  }}
                >
                  {/* ///   <Ionicons
                //     name={"add-circle"}
                //     size={width(15)}
                //     color={"red"}
                //   /> */}
                  <AddIcon
                    tintColor="#2d3436"
                    height={width(15)}
                    width={width(15)}
                  />
                </View>
              );
            } else if (route.name === ScreenNames.MYADS) {
              iconName = focused
                ? "file-tray-stacked-outline"
                : "file-tray-stacked-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-outline" : "person-outline";
            } else {
              iconName = focused ? "person-outline" : "person-outline";
            }

            // Return your custom icon component
            return (
              <Ionicons
                name={iconName}
                size={width(6)}
                color={focused ? AppColors.primary : "gray"}
              />
            );
          },
          tabBarLabel: () => null, // Hide tab names
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopRightRadius: width(5),
            borderTopLeftRadius: width(5),

            ...Platform.select({
              ios: {
                height: height(8),
                paddingTop: height(0.5),
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                // Additional iOS-specific styles
              },
              android: {
                elevation: 5,
                height: height(7),
                // Additional Android-specific styles
              },
            }),
            position: "absolute",
          },
        })}
      >
        <Tab.Screen
          name="StackHome"
          component={TestStack}
          options={{ headerShown: false }}
        />
        {!islogin ? (
          <Tab.Screen
            name="pre"
            component={PreLogin}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Tab.Screen
              name="myChat"
              component={ChatScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="tit"
              component={() => (
                <CategoryScreen value="ADD" navigation={navigation} />
              )}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name={ScreenNames.MYADS}
              component={MyListingScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Tab.Navigator>
    </DrawerSceneWrapper>
  );
};

export default BottomNav;
