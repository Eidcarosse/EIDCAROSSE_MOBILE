import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectCategoryList } from "../../redux/slices/config";
import ScreenNames from "../../routes/routes";
import { width } from "../../utills/Dimension";
import CategoryIcon from "../categories";
import styles from "./styles";

export default function CategoryList({ navigation,search }) {
  const { t } = useTranslation();
  const data = useSelector(selectCategoryList);

  return (
    <View style={styles.main}>
      <View style={styles.titleview}>
        <Text style={styles.categorytext}>{t("categorylist.categories")}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate(ScreenNames.CATEGORY, {search:search});
          }}
        >
          {<Text style={styles.textseeall}>{t("categorylist.seeAll")}</Text>}
        </Pressable>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listicon}
      >
        {data.map(({ image, name, subCategories }, index) => {
          return (
            <CategoryIcon
              navigation={navigation}
              key={index}
              title={name}
              onPress={() => {
                // if (title == "Bikes") {
                //   navigation.navigate(ScreenNames.BIKECATEGORY);
                // } else {
                //   navigation.navigate(ScreenNames.LISTDATA);
                // }
                if (name == "Bikes" || name == "Parts") {
                  navigation.navigate(ScreenNames.BIKECATEGORY, {
                    category: name,
                    find: name,
                    subCategories: subCategories,
                    show: true,
                  });
                } else {
                  navigation.navigate(ScreenNames.LISTDATA, {
                    category: name,
                    find: name,
                  });
                }
              }}
            >
              {/* <Icon
                height={width(15)}
                width={width(15)}
                tintColor="black"
                fill="black"
              /> */}
              <Image
                style={{ height: width(10), width: width(10) }}
                source={{ uri: image }}
              />
            </CategoryIcon>
          );
        })}
      </ScrollView>
    </View>
  );
}
