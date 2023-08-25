import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { Button, IconButton, Input, ScreenWrapper } from "../../../components";
import { setIsLoggedIn, setUserMeta } from "../../../redux/slices/user";
import { setAppLoader } from "../../../redux/slices/config";
import Icons from "../../../asset/images";
import { height, width } from "../../../utills/Dimension";
import AppColors from "../../../utills/AppColors";
import ScreenNames from "../../../routes/routes";
export default function Profile({ navigation, route }) {
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
            <Text style={styles.logintext}>Profile</Text>
          </View>
        </ImageBackground>
        <View style={{ }}>
        <TouchableOpacity
              activeOpacity={.6}
                style={styles.card}
                onPress={()=>{
                 
                }}
              >
              <IconButton
              title={'Personal Information'}
              containerStyle={{backgroundColor:'white',width:width(90),justifyContent: 'flex-start',
            }}
              textStyle={{color:'black',alignSelf:'flex-start'}}
              >
                Ic
              </IconButton>
              </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
