import React from "react";
import { Image, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { Button, Header, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
export default function PreLogin({ navigation, route }) {
  const dispatch = useDispatch();
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <Image
          source={Icons.accountbg}
          style={styles.image}
        />
        <Text style={styles.text}>
          You must login to continue
        </Text>
        <Button
          title={"Login / SignUp"}
          containerStyle={styles.containerStyle}
          onPress={() => {
            navigation.navigate(ScreenNames.LOGIN);
          }}
        />
      </View>
    </ScreenWrapper>
  );
}
