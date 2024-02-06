import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Head, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";

export default function BikeCategory({ navigation, route }) {
  const subCategories = route?.params?.subCategories;
  const search = route?.params?.search;
  const { t } = useTranslation();
  return (
    <ScreenWrapper
      showStatusBar={false}
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
      <View
        style={[
          styles.mainViewContainer,
          { paddingBottom: !route?.params?.show ? 0 : height(8) },
        ]}
      >
        <FlatList
          data={subCategories}
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
                      find: item.name,
                      subcategory: item.name,
                    });
                  } else {
                    navigation.navigate(ScreenNames.LISTDATA, {
                      category: route?.params?.category,
                      find: item.name,
                      subcategory: item.name,
                      search: search || "",
                    });
                  }
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: height(4), height: height(4) }}
                />
                <Text style={{ marginLeft: width(5), fontSize: height(1.8) }}>
                  {t(`subList.${item.name}`)}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
