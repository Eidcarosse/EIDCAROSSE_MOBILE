import React from "react";
import { FlatList, View } from "react-native";
import { CategoryIcon, Head, Header, ScreenWrapper } from "../../../components";
import ScreenNames from "../../../routes/routes";
import categories from "../../../svgcomponents";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";

export default function Category({ navigation, route,value }) {
  console.log(route?.params);
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        route?.params? <Head headtitle={"Categories"} navigation={navigation} />: <Header  navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={[styles.mainViewContainer,{paddingBottom:route?.params?height(2):height(7)}]}>
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
                  if (value == "ADD") {
                    if (item.title == "Bikes") {
                      navigation.navigate(ScreenNames.BIKECATEGORY, {category:item?.title});
                    } else {
                      navigation.navigate(ScreenNames.ADDPOST,{category:item?.title});
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
