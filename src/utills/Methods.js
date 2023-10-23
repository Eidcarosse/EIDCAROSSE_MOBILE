import { Linking, Platform, Share, ToastAndroid } from "react-native";
import { formatDistanceToNow } from "date-fns";
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
import { showMessage } from "react-native-flash-message";
import AppColors from "./AppColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const toastMessage = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
export const successMessage = (description = "", message = "success") => {
  showMessage({
    message: message,
    description: description,
    type: "success",
  });
};
export const errorMessage = (description = "", message = "error") => {
  showMessage({
    message: message,
    description: description,
    type: "danger",
    position: "top",
  });
};
export const infoMessage = (description = "", message = "info") => {
  showMessage({
    message: message,
    description: description,
    type: "info",
    position: "top",
  });
};
// export const toastMessage = (description = "", message = "Info", type = "info") => {
//   showMessage({
//     message: message,
//     description: description,
//     type: type,
//   });
// };

export const setAuthData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("authUser", jsonValue);
  } catch (e) {
    // saving error
  }
};
export const getAuthData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("authUser");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
export const setThemeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("color", jsonValue);
  } catch (e) {
    // saving error
  }
};
export const getThemeData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("color");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
const onPressCall = (phoneNumber) => {
  const url =
    Platform.OS == "ios" ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;

  Linking.openURL(url)
    .then((result) => {
      if (result) {
        console.log("Phone app opened successfully");
      } else {
        console.log("Unable to open phone app");
      }
    })
    .catch((error) => console.error("Error opening phone app:", error));
};
const onPressMessage = (phoneNumber) => {
  const url = `sms:${phoneNumber}`;

  Linking.openURL(url)
    .then((result) => {
      if (result) {
        console.log("Messaging app opened successfully");
      } else {
        console.log("Unable to open messaging app");
      }
    })
    .catch((error) => console.error("Error opening messaging app:", error));
};
const onPressEmail = (email) => {
  const subject = "Eidcaross"; // Optional: Replace with the subject of your email

  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  Linking.openURL(url)
    .then((result) => {
      if (result) {
        console.log("Email app opened successfully");
      } else {
        console.log("Unable to open email app");
      }
    })
    .catch((error) => console.error("Error opening email app:", error));
};
const onPressShare = async (message) => {
  try {
    const result = await Share.share({
      message: message,
    });

    if (result.action === Share.sharedAction) {
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};
const openWhatsApp = (phoneNumber) => {
  const message = "Hello,I saw your ad on Eidcarosse!"; // Replace with your desired message

  // Construct the WhatsApp URL
  const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  // Open WhatsApp with the constructed URL
  Linking.openURL(whatsappURL)
    .then(() => {
      console.log("WhatsApp opened successfully");
    })
    .catch((error) => {
      console.error("Error opening WhatsApp:", error);
      errorMessage("Whatsapp not exist")
    });
};
const openViber = (phoneNumber) => {
  const message = "Hello, I saw your ad on Eidcarosse!"; // Replace with your desired message

  // Construct the Viber URL
  const viberURL = `viber://forward?text=${encodeURIComponent(
    message
  )}&phone=${phoneNumber}`;

  // Open Viber with the constructed URL
  Linking.openURL(viberURL)
    .then(() => {
      console.log("Viber opened successfully");
    })
    .catch((error) => {
      console.error("Error opening Viber:", error);
      errorMessage("Viber not exist")
    });
};
const calculateTimeDifference = (createdAt) => {
  const distance = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  return distance;
};
const onPressFavorite = () => {};
const GlobalMethods = {
  toastMessage,
  errorMessage,
  successMessage,
  setAuthData,
  getAuthData,
  onPressCall,
  onPressMessage,
  onPressShare,
  onPressFavorite,
  onPressEmail,
  openWhatsApp,
  openViber,
  calculateTimeDifference
};
export default GlobalMethods;
