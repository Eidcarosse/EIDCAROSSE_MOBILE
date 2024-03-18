import { createContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

import * as Notifications from "expo-notifications";
import {
  getDatabase,
  ref,
  push,
  serverTimestamp,
  set,
  get,
} from "firebase/database";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { selectUserMeta } from "../../../redux/slices/user";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const database = getDatabase();
  const [notification, setNotification] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");

  const notificationListener = useRef();
  const responseListener = useRef();

  const loginUser = useSelector(selectUserMeta);

  useEffect(() => {
    // Check if the login ID is available
    if (loginUser?._id) {
      registerForPushNotifications();
    } else {
      console.log(
        "Login user ID is not available. Token not saved to Firebase."
      );
    }
  }, [loginUser?._id]);

  // Function to fetch and send notifications to the user upon login
  const sendNotificationsOnLogin = async () => {
    if (loginUser?._id) {
      // Retrieve notifications for the user from the database
      const notificationsRef = ref(database, `notifications/${loginUser?._id}`);
      const notificationsSnapshot = await get(notificationsRef);
      // Check if notifications exist for the user
      if (notificationsSnapshot.exists()) {
        // const notificationsData = notificationsSnapshot.val();

        // Iterate over each notification and send it as a push notification
        // Object.values(notificationsData).forEach(async (notification) => {
        //   const { title, body, createdAt } = notification;
        // const d =  Object.values(notificationsData)

        // Send push notification to the user
        const userTokenRef = ref(database, `tokens/${loginUser?._id}`);
        const tokenSnapshot = await get(userTokenRef);

        if (tokenSnapshot.exists()) {
          const userData = Object.values(tokenSnapshot.val());
          const userToken = userData[userData.length - 1].token.data;

          if (userToken) {
            //sendPushNotification(userToken,title , body || 'Sent an image');
            sendPushNotification(userToken, "New Message");
          }
        }
        // });

        // Clear notifications for the user after sending them
        await set(notificationsRef, null);
        console.log("Notifications sent and cleared.");
      }
    }
  };

  async function sendPushNotification(expoPushToken, title, messageText) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: messageText,
      data: { message: messageText },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("This is responce of Notifications", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotifications = async () => {
    let token;

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // token = (await Notifications.getExpoPushTokenAsync()).data;

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });

      // Save the token to Firebase Realtime Database
      saveTokenToFirebase(token);

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const saveTokenToFirebase = async (token) => {
    try {
      if (loginUser?._id) {
        await push(ref(database, `tokens/${loginUser?._id}`), {
          token,
          createdAt: serverTimestamp(),
        });

        sendNotificationsOnLogin();
      }
    } catch (error) {
      console.error("Error saving token to Firebase:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        registerForPushNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
