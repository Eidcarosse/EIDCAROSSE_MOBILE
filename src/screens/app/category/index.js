import React from "react";
import { FlatList, Image, View } from "react-native";
import { useSelector } from "react-redux";
import { CategoryIcon, Head, Header, ScreenWrapper } from "../../../components";
import { selectCategoryList } from "../../../redux/slices/config";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

export default function Category({ navigation, route, value }) {
  const data = useSelector(selectCategoryList);
  const search = route?.params?.search;
  return (
    <ScreenWrapper
      headerUnScrollable={() =>
        route?.params ? (
          <Head headtitle={"categorylist.categories"} navigation={navigation} />
        ) : (
          <Header navigation={navigation} />
        )
      }
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={[{ paddingBottom: height(7), margin: width(3) }]}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CategoryIcon
                navigation={navigation}
                cardStyle={styles.card}
                title={item?.name}
                image={item?.image}
                textStyle={styles.textStyle}
                imageStyle={styles.imageStyle}
                onPress={() => {
                  if (value == "ADD") {
                    if (item.name == "Bikes" || item.name == "Parts") {
                      navigation.navigate(ScreenNames.BIKECATEGORY, {
                        category: item?.name,
                        find: item?.name,
                        subCategories: item?.subCategories,
                      });
                    } else {
                      navigation.navigate(ScreenNames.ADDPOST, {
                        category: item?.name,
                        find: item?.name,
                      });
                    }
                  } else if (item.name == "Bikes" || item.name == "Parts") {
                    navigation.navigate(ScreenNames.BIKECATEGORY, {
                      category: item?.name,
                      find: item?.name,
                      show: true,
                      subCategories: item?.subCategories,
                      search: search || "",
                    });
                  } else {
                    navigation.navigate(ScreenNames.LISTDATA, {
                      category: item?.name,
                      find: item?.name,
                      search: search || "",
                    });
                  }
                }}
              />
            );
          }}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
