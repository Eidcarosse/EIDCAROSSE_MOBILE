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
export default function SignUp({ navigation, route }) {
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
            <Text style={styles.logintext}>SignUp</Text>
          </View>
        </ImageBackground>
        <View style={{marginBottom:width(10)}}>
          <Input title={"First Name"} placeholder={"Enter Name"} />
          <Input
            title={"Last Name"}
            placeholder={"Enter Password"}

          />
            <Input title={"User Name"} placeholder={"Enter Name"} />
            <Input title={"Email"} placeholder={"Enter Name"} />

            <Input title={"Phone Number"} placeholder={"Enter Name"} />

          <Input
            title={"Password"}
            placeholder={"Enter Password"}
            secure={true}
          />
          <View style={{ alignSelf: "center",width:width(70) }}>
            <Text >
            I have read and agree to the Eidcarosse
            <TouchableOpacity>
              <Text style={{color:AppColors.primery,fontWeight:'bold' }}> Terms and Conditions</Text>
            </TouchableOpacity>
            </Text>
           
          </View>
          <Button containerStyle={styles.button} title={"SignUp"} />
          
      <View style={{height:height(7)}}/>

          <View style={{ alignSelf: "center", alignContent: "center",flexDirection:'row' }}>
            <Text >
            Already have an account? 
            </Text>
            <TouchableOpacity
            onPress={()=>{navigation.goBack()}}

            >
              <Text style={{color:AppColors.primery,fontWeight:'bold' }}> Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
