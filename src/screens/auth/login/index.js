import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { Button, Input, ScreenWrapper } from "../../../components";
import { setIsLoggedIn, setUserMeta } from "../../../redux/slices/user";
import { setAppLoader } from "../../../redux/slices/config";
import Icons from "../../../asset/images";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";
import ScreenNames from "../../../routes/routes";
export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      statusBarColor={AppColors.primery}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground
          source={Icons.bglogo}
          style={{ width: width(100), height: height(40) }}
        >
          <View style={styles.imageiner}>
            <Text style={styles.logintext}>Login</Text>
          </View>
        </ImageBackground>
        <View style={{ height: height(60) }}>
          <Input title={"Name"} placeholder={"Enter Name"} />
          <Input
            title={"Password"}
            placeholder={"Enter Password"}
            secure={true}
          />
          <Button containerStyle={styles.button} title={"Login"} 
            onPress={()=>{navigation.navigate(ScreenNames.BUTTOM)}}
          />
          <View style={{ alignSelf: "center", alignContent: "center",flexDirection:'row' }}>
            <Text >
              Can’t login?
            </Text>
            <TouchableOpacity>
              <Text style={{color:AppColors.primery,fontWeight:'bold' }}> Forgot Password</Text>
            </TouchableOpacity>
          </View>
      <View style={{height:height(15)}}/>

          <View style={{ alignSelf: "center", alignContent: "center",flexDirection:'row' }}>
            <Text >
            Don’t have account? 
            </Text>
            <TouchableOpacity
            onPress={()=>{navigation.navigate(ScreenNames.SIGNUP)}}
            
            >
              <Text style={{color:AppColors.primery,fontWeight:'bold' }}> Register Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
