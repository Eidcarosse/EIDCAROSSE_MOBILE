import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Head, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";
import { Parts, bikedata, data } from "../../../utills/Data";
import { useTranslation } from "react-i18next";

export default function BikeCategory({ navigation, route }) {
  const { t } = useTranslation();

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head
          headtitle={
            route?.params?.category == "Parts"
              ? t("subcategory.titleParts")
              : t("subcategory.titleBike")
          }
          navigation={navigation}
        />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <FlatList
          data={route?.params?.category == "Parts" ? Parts : bikedata}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.card}
                onPress={() => {
                  if (!route?.params?.show) {
                    navigation.navigate(ScreenNames.ADDPOST, {
                      category: route?.params?.category,
                      find: item?.title,
                      subcategory: item?.title,
                    });
                  } else
                    navigation.navigate(ScreenNames.LISTDATA, {
                      category: route?.params?.category,
                      find: item?.title,
                      subcategory: item?.title,
                    });
                }}
              >
                <Text>{t(item.show)}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
