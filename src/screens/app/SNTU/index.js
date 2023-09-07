import React from "react";
import { Image, Text, View } from "react-native";
import Icons from "../../../asset/images";
import { Button, Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function SNTU({ navigation, route }) {
  const data =
    "You can now sell your vehicle and machines to Eidcarosse. We provide a hassle-free process and competitive prices for your vehicle. Whether you're looking to upgrade or need to sell your vehicle and things quickly, we've got you covered. Sell now and experience a seamless selling experience with us!";

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Sell Now To Us "} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      backgroundColor="white"
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.imageview}>
          <Image source={Icons.sellnow} style={styles.image} />
        </View>
        <View style={styles.container}>
          <Text style={styles.description}>{data}</Text>
        </View>
        <Button containerStyle={styles.button} title={"Sell now to us"} />
      </View>
    </ScreenWrapper>
  );
}