import React from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import {
  CategoryIcon,
  Head,
  ListingView,
  ScreenWrapper,
  SearchBar,
} from "../../../components";
import categories from "../../../svgcomponents";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
import ScreenNames from "../../../routes/routes";
import { FontAwesome } from "@expo/vector-icons";

import Icons from "../../../asset/images";
import { SelectList } from "react-native-dropdown-select-list";

export default function ListData({ navigation, route }) {
  const data = [
    {
      name: "Vogele - Super 800",
      category: "Construction Machines",
      location: "Schoberbass",
      uri: Icons.car,
      views: "114",
      chf: "29’900",
      eur: "31’165",
    },
    {
      name: "Vogele - Super 800",
      category: "Construction Machines",
      location: "Schoberbass",
      uri: Icons.car,
      views: "114",
      chf: "29’900",
      eur: "31’165",
    },
    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },

    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },
    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },
    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },

    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },
    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },
    { name: "Civic", category: "ABC", location: "AC", uri: Icons.car },
  ];
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Head navigation={navigation} />}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.filterview}>
          <SearchBar containerstyle={{ width: width(80) }} />
          <TouchableOpacity style={{marginLeft:width(2)}}>
            <FontAwesome name="sliders" size={width(7)} color={AppColors.primery}/>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: width(12) }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate(ScreenNames.DETAIL, item);
                }}
              >
                <ListingView data={item} />
              </TouchableOpacity>
            );
          }}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
