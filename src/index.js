import React, { useEffect,useRef,useState } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import FlashMessage from "react-native-flash-message";
import { LogBox } from "react-native";
import i18n from "./translation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
LogBox.ignoreAllLogs(true);
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });


export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Routes />
        <FlashMessage position="bottom" icon="auto" />
      </Provider>
    </GestureHandlerRootView>
  );
}
