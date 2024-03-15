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
import { NotificationProvider } from "./screens/app/notification";

export default function App() {
  const [lang, setLang] = useState(false);
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
        <NotificationProvider>
          <Routes />
        </NotificationProvider>
        <FlashMessage position="bottom" icon="auto" />
      </Provider>
    </GestureHandlerRootView>
  );
}
