import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { Button, Header, Input, ScreenWrapper } from "../../../components";
import { setIsLoggedIn, setUserMeta } from "../../../redux/slices/user";
import { setAppLoader } from "../../../redux/slices/config";
import Icons from "../../../asset/images";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";
import ScreenNames from "../../../routes/routes";
export default function PreLogin({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
    headerUnScrollable={() => <Header navigation={navigation}/>}
    statusBarColor={AppColors.primery}
    barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>

        <Image
        source={Icons.accountbg}
        style={{width:width(85),alignSelf:'center',height:height(30)}}
        />
        <Text
        style={{fontSize:18,margin:width(10),fontWeight:'bold'}}
        >
          You must login to continue
        </Text>
       <Button
       title={'Login / SignUp'}
       containerStyle={styles.containerStyle}
       onPress={()=>{
        navigation.navigate(ScreenNames.LOGIN)
       }}
       />
      </View>
    </ScreenWrapper>
  );
}
