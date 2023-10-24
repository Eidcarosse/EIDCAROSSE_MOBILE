import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ScreenNames from "../../routes/routes";
import categories from "../../svgcomponents/index";
import { width } from "../../utills/Dimension";
import CategoryIcon from "../categories";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function CategoryList({ navigation }) {
  const {t}=useTranslation();
  return (
    <View style={styles.main}>
      <View style={styles.titleview}>
        <Text style={styles.categorytext}>{t("categorylist.categories")}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate(ScreenNames.CATEGORY, "see");
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
        {categories.map(({ show, title, Icon }, index) => {
          return (
            <CategoryIcon
              navigation={navigation}
              key={index}
              title={show}
              onPress={() => {
                // if (title == "Bikes") {
                //   navigation.navigate(ScreenNames.BIKECATEGORY);
                // } else {
                //   navigation.navigate(ScreenNames.LISTDATA);
                // }
                if (title == "Bikes" || title == "Parts") {
                  navigation.navigate(ScreenNames.BIKECATEGORY, {
                    category: title,
                    find: title,
                    show: true,
                  });
                } else {
                  navigation.navigate(ScreenNames.LISTDATA, {
                    category: title,
                    find: title,
                  });
                }
              }}
            >
              <Icon
                height={width(15)}
                width={width(15)}
                tintColor="black"
                fill="black"
              />
            </CategoryIcon>
          );
        })}
      </ScrollView>
    </View>
  );
}
