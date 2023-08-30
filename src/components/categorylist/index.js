import React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import styles from "./styles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { height, width } from "../../utills/Dimension";
import CategoryIcon from "../categories";
import categories from "../../svgcomponents/index";
import Bike from "../../svgcomponents/bike";
import ScreenNames from "../../routes/routes";

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
            navigation.navigate(ScreenNames.CATEGORY);
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
                if (title == "Bikes") {
                  navigation.navigate(ScreenNames.BIKECATEGORY);
                } else {
                  navigation.navigate(ScreenNames.LISTDATA);
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
