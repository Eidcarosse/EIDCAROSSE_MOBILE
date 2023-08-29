import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { Entypo, Fontisto, Ionicons,AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import {
  Button,
  Head,
  Header,
  IconButton,
  Input,
  ScreenWrapper,
} from "../../../components";
import { setIsLoggedIn, setUserMeta } from "../../../redux/slices/user";
import { setAppLoader } from "../../../redux/slices/config";
import Icons from "../../../asset/images";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";
import ScreenNames from "../../../routes/routes";
export default function ManageAccount({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Head headtitle={"Manage Account"} navigation={navigation} />}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ paddingVertical: width(10) }}>
        <IconButton
        onPress={()=>{
          dispatch(setIsLoggedIn(false)),
          navigation.goBack();
        }}
        title={'LogOut'}
        containerStyle={styles.logoutcontainer}
        textStyle={{color:AppColors.primery}}
        icon={<Entypo name="log-out" size={width(5)} color={AppColors.primery}/>}
        />
        <IconButton
        title={'Delete Account'}
        containerStyle={styles.deletecontainer}
        icon={<AntDesign name="delete" size={width(5)} color={AppColors.white}/>}
        />

        </View>
      </View>
    </ScreenWrapper>
  );
}
