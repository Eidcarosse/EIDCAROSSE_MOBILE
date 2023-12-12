import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { Head, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";
import { height, width } from "../../../utills/Dimension";

export default function BikeCategory({ navigation, route }) {
  const subCategories = route?.params?.subCategories;
  const search = route?.params?.search;
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
                  } else
                    navigation.navigate(ScreenNames.LISTDATA, {
                      category: route?.params?.category,
                      find: item.name,
                      subcategory: item.name,
                      search: search || "",
                    });
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: width(8), height: width(8) }}
                />
                <Text style={{ marginLeft: width(5) }}>
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
