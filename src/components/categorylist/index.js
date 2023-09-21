import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ScreenNames from "../../routes/routes";
import categories from "../../svgcomponents/index";
import { width } from "../../utills/Dimension";
import CategoryIcon from "../categories";
import styles from "./styles";

export default function CategoryList({ navigation }) {
  return (
    <View style={styles.main}>
      <View style={styles.titleview}>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", marginVertical: width(2) }}
        >
          Categories
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate(ScreenNames.CATEGORY,"see");
          }}
        >
          {
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 8,
                color: "grey",
              }}
            >
              See all
            </Text>
          }
        </Pressable>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listicon}
      >
        {categories.map(({ title, Icon }, index) => {
          return (
            <CategoryIcon
              navigation={navigation}
              key={index}
              title={title}
              onPress={() => {
                // if (title == "Bikes") {
                //   navigation.navigate(ScreenNames.BIKECATEGORY);
                // } else {
                //   navigation.navigate(ScreenNames.LISTDATA);
                // }
                if (title == "Bikes"||title == "Parts") {
                  navigation.navigate(ScreenNames.BIKECATEGORY,{category:title,show:true});
                } else {
                  navigation.navigate(ScreenNames.LISTDATA,{category:title});
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
