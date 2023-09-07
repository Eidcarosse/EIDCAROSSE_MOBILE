import React from "react";
import { FlatList, View } from "react-native";
import { CategoryIcon, Head, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import categories from "../../../svgcomponents";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";

export default function Category({ navigation, route }) {
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"All Category"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <FlatList
          data={categories}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            Icon = item.Icon;
            return (
              <CategoryIcon
                navigation={navigation}
                disabled={true}
                cardStyle={styles.card}
                title={item?.title}
                onPress={() => {
                  if (route?.params == "ADD") {
                    if (item.title == "Bikes") {
                      navigation.navigate(ScreenNames.BIKECATEGORY, "ADD");
                    } else {
                      navigation.navigate(ScreenNames.ADDPOST);
                    }
                  } else if (item.title == "Bikes") {
                    navigation.navigate(ScreenNames.BIKECATEGORY);
                  } else {
                    navigation.navigate(ScreenNames.LISTDATA);
                  }
                }}
              >
                <Icon height={width(20)} width={width(20)} />
              </CategoryIcon>
            );
          }}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
