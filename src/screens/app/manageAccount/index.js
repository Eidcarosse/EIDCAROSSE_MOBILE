import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

import { useDispatch } from "react-redux";
import { Head, IconButton, ScreenWrapper } from "../../../components";
import { setAdsFav, setIsLoggedIn, setUserAds, setUserMeta } from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import { setAuthData } from "../../../utills/Methods";
export default function ManageAccount({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"manageAccount.title"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ paddingVertical: width(10) }}>
          <IconButton
            onPress={() => {
              dispatch(setIsLoggedIn(false))
              dispatch(setUserMeta(null))
              dispatch(setUserAds(null))
              dispatch(setAdsFav([]))
              setAuthData(null)

              , navigation.goBack();
            }}
            title={"manageAccount.logout"}
            containerStyle={styles.logoutcontainer}
            textStyle={{ color: AppColors.primary }}
            icon={
              <Entypo
                name="log-out"
                size={width(5)}
                color={AppColors.primary}
              />
            }
          />
          <IconButton
            title={"manageAccount.deleteaccount"}
            containerStyle={styles.deletecontainer}
            icon={
              <AntDesign
                name="delete"
                size={width(5)}
                color={AppColors.white}
              />
            }
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
