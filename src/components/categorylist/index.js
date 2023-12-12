import React from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { selectCategoryList } from "../../redux/slices/config";
import ScreenNames from "../../routes/routes";
import { width } from "../../utills/Dimension";
import CategoryIcon from "../categories";
import styles from "./styles";

export default function CategoryList({ navigation, search }) {
  const { t } = useTranslation();
  const d = useSelector(selectCategoryList);
  const data = d.slice(0, 6);
  const renderItem = ({ item }) => {
    return (
      <CategoryIcon
        navigation={navigation}
        title={item.name}
        image={item.image}
        onPress={() => {
          if (item.name == "Bikes" || item.name == "Parts") {
            navigation.navigate(ScreenNames.BIKECATEGORY, {
              category: item.name,
              find: item.name,
              subCategories: item.subCategories,
              show: true,
            });
          } else {
            navigation.navigate(ScreenNames.LISTDATA, {
              category: item.name,
              find: item.name,
            });
          }
        }}
      />
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.titleview}>
        <Text style={styles.categorytext}>{t("categorylist.categories")}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate(ScreenNames.CATEGORY, { search: search });
          }}
        >
          {<Text style={styles.textseeall}>{t("categorylist.seeAll")}</Text>}
        </Pressable>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={({ item, index }) => index}
      />
    </View>
  );
}
