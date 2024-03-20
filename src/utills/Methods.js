import { Linking, Platform, Share, ToastAndroid } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { es, de, it, enUS, fr } from "date-fns/locale";

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
import { height, width } from "./Dimension";
export const toastMessage = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
export const successMessage = (description = "", message = "success") => {
  showMessage({
    message: message,
    description: description,
    type: "success",
    position: "top",
    statusBarHeight: height(4),
    floating: true,
    duration: 5000,
  });
};
export const errorMessage = (description = "", message = "error") => {
  showMessage({
    message: message,
    description: description,
    type: "danger",
    position: "top",
    statusBarHeight: height(4),
    floating: true,
    duration: 5000,
  });
};
export const infoMessage = (description = "", message = "info") => {
  showMessage({
    message: message,
    description: description,
    type: "info",
    position: "top",
    statusBarHeight: height(4),
    floating: true,
    duration: 5000,
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
export const setDataw = async (value) => {
  try {
    let a = await AsyncStorage.setItem("whatsapp", JSON.stringify(value));
  } catch (e) {}
};
export const setDatav = async (value) => {
  try {
    let a = await AsyncStorage.setItem("viber", JSON.stringify(value));
  } catch (e) {}
};
export const getDataw = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("whatsapp");
    return jsonValue;
  } catch (e) {
    // error reading value
  }
};
export const getDatav = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("viber");
    return jsonValue;
  } catch (e) {
    // error reading value
  }
};
export const storelangData = async (value) => {
  try {
    await AsyncStorage.setItem("language", value);
  } catch (e) {
    // saving error
  }
};
export const getlangData = async () => {
  try {
    const value = await AsyncStorage.getItem("language");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
export const setRememberMe = async (value) => {
  try {
    await AsyncStorage.setItem("remember", value);
  } catch (e) {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  }
};
export const getRememberMe = async () => {
  try {
    const value = await AsyncStorage.getItem("remember");
    if (value !== null) {
      return value;
    }
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
const onPressEmail = (email, mymail, message = "") => {
  const subject = `${message}`; // Optional: Replace with the subject of your email

  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&cc=${encodeURIComponent(mymail)}`;

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
const onPressShare = async (message, title, url) => {
  try {
    const result = await Share.share({
      message: `${title}\n${message}`,
      title: "Eidcarosse",
      url: message,
    });

    if (result.action === Share.sharedAction) {
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

const openWhatsApp = (phoneNumber) => {
  // Construct the WhatsApp URL
  const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;

  // Open WhatsApp with the constructed URL
  Linking.openURL(whatsappURL)
    .then(() => {
      console.log("WhatsApp opened successfully");
    })
    .catch((error) => {
      console.error("Error opening WhatsApp:", error);
      errorMessage("Whatsapp not exist");
    });
};
const openWhatsAppChannel = (link) => {
  Linking.openURL(link)
    .then(() => {
      console.log("WhatsApp opened successfully");
    })
    .catch((error) => {
      Linking.openURL("https://whatsapp.com");
      console.error("Error opening WhatsApp CHANEL", error);
    });
};
export const openViber = (phoneNumber) => {
  try {
    const formattedPhoneNumber =
      Platform.OS === "android" ? phoneNumber.replace(/\+/g, "") : phoneNumber;

    const viberDeepLink = `viber://chat?number=${formattedPhoneNumber}`;

    Linking.openURL(viberDeepLink).catch((err) => {
      console.error("Error opening Viber:", err);
      // Handle the error or display a message to the user
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const calculateTimeDifference = (createdAt, l) => {
  let locale;
  switch (l) {
    case "fr":
      locale = fr;
      break;
    case "de":
      locale = de;
      break;
    case "it":
      locale = it;
      break;
    case "es":
      locale = es;
      break;
    case "en":
      locale = enUS;
      break;
    default:
      locale = de;
  }
  const distance = formatDistanceToNow(new Date(createdAt), {
    locale,
    addSuffix: true,
  });
  return distance;
};
export function checkPrice(d) {
  let data = parseInt(d);
  // Check if data is not null or undefined
  if (data !== null && data !== undefined) {
    // Check if price is greater than 0 and not an array
    if (typeof data === "number" && data > 0) {
      return true; // The condition is met
    }
  }
  return false; // The condition is not met
}
export function isNullOrNullOrEmpty(value) {
  return (
    value === null ||
    value === "" ||
    value === "null" ||
    value === undefined ||
    value === "undefined"
  );
}
export const showDetails = (x) => {
  return (
    !isNullOrNullOrEmpty(x?.vhclZ) ||
    !isNullOrNullOrEmpty(x?.jobZ) ||
    !isNullOrNullOrEmpty(x?.property4sr) ||
    !isNullOrNullOrEmpty(x.animalZ) ||
    !isNullOrNullOrEmpty(x.bznessInAg) ||
    !isNullOrNullOrEmpty(x.rltnShp)
  );
};
export function shouldRenderField(field, category, sub_category) {
  const config = {
    // Main categories
    Vehicles: ["Condition", "Price"],
    Bike: ["Condition", "Price", "Year"],
    Cycles: ["Condition", "Price"],
    "Industrial & Agriculture Machinery": ["Condition", "Price"],
    "Commercial Vehicles": ["Condition", "Price"],
    Boat: ["Condition", "Price"],
    Drone: ["Condition", "Price"],
    Others: ["Price", "Condition"],

    // Subcategories
    Cars: [
      "Condition",
      "Brand",
      "Model",
      "Year",
      "AutosBodyShape",
      "gearBox",
      "fuelType",
      "km",
      "ExteriorColor",
      "interirColor",
    ],
    "Cars on Installments": [
      "Condition",
      "Brand",
      "Model",
      "Year",
      "AutosBodyShape",
      "gearBox",
      "fuelType",
      "Mileage",
      "Down Payment",
      "Monthly Installments",
      "Installment Plan",
    ],
    Bikes: [
      "Brand",
      "Model",
      "km",
      "Year",
      "bikeBodyShape",
      "BikeFuelType",
      "bikeColor",
    ],
    "Bikes on Installments": [
      "Brand",
      "Model",
      "Year",
      "km",
      "bikeBodyShape",
      "BikeFuelType",
      "bikeColor",
      "Down Payment",
      "Monthly Installments",
      "Installment Plan",
    ],
    "E-scooters": ["Brand", "Year"],
    Bicycles: ["Brand", "Year"],
    "E-bikes": ["Brand", "Year"],
    "Construction & Heavy Machinery": [
      "Brand",
      "Working Hours",
      "Condition",
      "Type",
      "Year",
    ],
    "Agriculture Machinery": [
      "Brand",
      "Working Hours",
      "Condition",
      "Type",
      "Year",
    ],
    Trucks: ["Brand", "Year", "km", "Type"],
    Vans: ["Brand", "Year", "km", "Type"],
    Trailers: ["Brand", "km", "Type"],
    Busses: ["Brand", "Year", "km", "fuelType", "Type"],
    Boats: ["Brand", "Hours Driven"],
    Drones: ["Brand"],

    "Other Vehicles": ["Year", "km"],
  };

  return (
    (config[category] && config[category].includes(field)) ||
    (config[sub_category] && config[sub_category].includes(field))
  );
}
export const formatPrice = (price) => {
  const priceString = price.toString();
  const groups = [];
  let remainingDigits = priceString.length;

  while (remainingDigits > 0) {
    const groupSize = Math.min(3, remainingDigits);
    const group = priceString.substr(remainingDigits - groupSize, groupSize);
    groups.unshift(group);
    remainingDigits -= groupSize;
  }

  const formattedPrice = groups.join("'");

  return formattedPrice + ".-";
};
export const formatPriceE = (price) => {
  const priceString = price.toString();
  const groups = [];
  let remainingDigits = priceString.length;

  while (remainingDigits > 0) {
    const groupSize = Math.min(3, remainingDigits);
    const group = priceString.substr(remainingDigits - groupSize, groupSize);
    groups.unshift(group);
    remainingDigits -= groupSize;
  }

  const formattedPrice = groups.join("'");

  return formattedPrice + ".-";
  return price.toLocaleString("en-US") + ".-";
};
export const setAuthAllData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("dataUser", jsonValue);
  } catch (e) {
    // saving error
  }
};
export const getAuthAllData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("dataUser");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
export function getPriceInitialValue(input) {
  switch (input) {
    case "Free":
      return 2;
    case "Contact":
      return 3;
    case "":
    case null:
    case "Price":
    case undefined:
      return 1;
    default:
      if (!isNaN(parseFloat(input))) {
        return 1;
      } else {
        return 0;
      }
  }
}

export function getConditionInitailValue(input) {
  switch (input) {
    case "New":
      return 1;
    case "Used":
      return 2;
    case "Recondition":
      return 3;
    case "":
    case null:
    case undefined:
      return 0;
    default:
      return 0;
  }
}

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
  openWhatsAppChannel,
  openViber,
  calculateTimeDifference,
  storelangData,
  getlangData,
};
export default GlobalMethods;
