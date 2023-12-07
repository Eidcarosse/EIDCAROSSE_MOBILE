import React, { useEffect } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import FlashMessage from "react-native-flash-message";
import { LogBox } from "react-native";
import i18n from "./translation";
LogBox.ignoreAllLogs(true);

// import { initReactI18next } from "react-i18next";
// import i18n from "i18next"; // Import the i18n instance
// import { useTranslation, Trans } from "react-i18next";

// import translations from "./i18n/translations.json";

// i18n.use(initReactI18next).init({
//   resources: translations, // Your translation resources
//   lng: "en", // Default language
//   fallbackLng: "en",
// });
export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="bottom" icon="auto" />
    </Provider>
  );
}
// shadowColor: 'black',
// shadowOffset: { width: 0, height: 2 },
// shadowOpacity: 0.2,
// shadowRadius: 4,
// import { StatusBar } from "expo-status-bar";
// import { useTranslation } from "react-i18next";
// import { Button, StyleSheet, Text, View } from "react-native";

// export default function App() {
//   const { t } = useTranslation();
//   return (
//     <View style={styles.container}>
//       <Text style={{ fontSize: 24, fontWeight: "bold" }}>{t("login.login")}</Text>
//       <Button
//         title="Change language to BAHASA MALAYSIA"
//         onPress={() => i18n.changeLanguage("fr")}
//       />
//       <Button
//         title="Change language to ENGLISH"
//         onPress={() => i18n.changeLanguage("en")}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
