import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Head, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function BikeCategory({ navigation, route }) {
  console.log("bike page",route?.params);
  const data = [
    { title: "E-Bike" },
    { title: "Bicycles" },
    { title: "E-Scooters" },
    { title: "Motorcycle" },
  ];
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Bikes"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            Icon = item.Icon;
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.card}
                onPress={() => {
                  if (route?.params?.category) {
                    navigation.navigate(ScreenNames.ADDPOST,{category:route?.params?.category,subcategory:item?.title,});
                  } else navigation.navigate(ScreenNames.LISTDATA);
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
