import React, { useEffect } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import FlashMessage from "react-native-flash-message";
import { LogBox } from "react-native";
import i18n from "./translation";
LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="bottom" icon="auto" />
    </Provider>
  );
}
