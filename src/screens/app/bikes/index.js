import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Head, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function BikeCategory({ navigation, route }) {
  console.log("bike page", route?.params?.show);
  const data = [
    { title: "E-bikes" },
    { title: "Bicycles" },
    { title: "E-scooter" },
    { title: "Motorcycle" },
  ];
  const Parts = [
    { title: "Autos" },
    { title: "Bikes" },
    { title: "Boats" },
    { title: "Drones" },
    { title: "Construction Machines" },
    { title: "Trucks" },
    { title: "Vans" },
    { title: "Trailers" },
    { title: "Buses" },
    { title: "Others" },
  ];
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head
          headtitle={route?.params?.category == "Parts" ? "Parts" : "Bikes"}
          navigation={navigation}
        />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <FlatList
          data={route?.params?.category == "Parts" ? Parts : data}
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
                      subcategory: item?.title,
                    });
                  } else
                    navigation.navigate(ScreenNames.LISTDATA, {
                      category: item?.title,
                      // subcategory: item?.title,
                    });
                }}
              >
                <Text>
                  {item.title}
                  {route?.params?.category == "Parts" ? " Parts" : ""}
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
