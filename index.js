import { AppRegistry, Platform } from "react-native";
import { registerRootComponent } from "expo";
import App from "./src";
import { name as appName } from "./app.json";
// import { initializeApp } from '@react-native-firebase/app';
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNgp2owPCTFdoonCCfEIA3c-mdTP52bXs",
  authDomain: "eidcarosse-7d282.firebaseapp.com",
  databaseURL:
    "https://eidcarosse-7d282-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eidcarosse-7d282",
  storageBucket: "eidcarosse-7d282.appspot.com",
  messagingSenderId: "232832919856",
  appId: "1:232832919856:web:c2cd17aa51558494f0c0f5",
  measurementId: "G-Q5SN026G80",
};

// // Initialize Firebase
// initializeApp(firebaseConfig);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
// if (Platform.OS == "android") {
registerRootComponent(App);
// } else {
// AppRegistry.registerComponent('main', () => App);

//}
import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export default database = getDatabase();
