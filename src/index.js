import React, { useEffect, useRef, useState } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import FlashMessage from "react-native-flash-message";
import { LogBox, AppState } from "react-native";
import i18n from "./translation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
LogBox.ignoreAllLogs(true);
import { Platform } from "react-native";
import { appUpgradeVersionCheck } from "app-upgrade-react-native-sdk";
import { getlangData } from "./utills/Methods";

// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [lang, setLang] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const languageset = async () => {
      let l = await getlangData();
      setLang(l);
    };
    languageset();
  }, []);
  useEffect(() => {
    if (lang) appUpgradeVersionCheck(appInfo, xApiKey, alertConfig);
  }, [lang]);
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }
  //   const { status: existingStatus } =
  //     await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== "granted") {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== "granted") {
  //     alert("Failed to get push token for push notification!");
  //     return;
  //   }
  //   // Learn more about projectId:
  //   // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //   token = (
  //     await Notifications.getExpoPushTokenAsync({
  //       projectId:"ecec4ccc-ca34-4185-9f67-707b25fb0b4d",
  //     })
  //   ).data;
  //   console.log(token);

  //   return token;
  // }

  const xApiKey = "OTlmODUxMTktYjg3ZC00ZDEzLTkzZjMtNWZjY2JkMWI3MWRh"; // Your project key
  const appInfo = {
    appId: "com.eidcarosse.Eidcarossech", // Your app id in play store or app store
    appName: "Eidcarosse.ch", // Your app name
    appVersion: "1.0.4", // Your app version
    platform: "android",
    // platform: 'ios', // App Platform, android or ios
    environment: "development", // App Environment, production, development
    appLanguage: lang || "de", //Your app language ex: en, es etc. Optional.
  };

  // Alert config is optional
  const alertConfig = {
    title: lang == "en" ? "Update" : "Aktualisierung",
    updateButtonTitle: lang == "en" ? "Update" : "Aktualisierung",
    laterButtonTitle: lang == "en" ? "later" : "Später",
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Routes />
        <FlashMessage position="bottom" icon="auto" />
      </Provider>
    </GestureHandlerRootView>
  );
}
