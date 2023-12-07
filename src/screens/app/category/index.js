import React from "react";
import { FlatList, Image, View } from "react-native";
import { useSelector } from "react-redux";
import { CategoryIcon, Head, Header, ScreenWrapper } from "../../../components";
import { selectCategoryList } from "../../../redux/slices/config";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";

export default function Category({ navigation, route, value }) {
  console.log('====================================');
  console.log("loggggggg",route?.params);
  console.log('====================================');
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
      <View style={[styles.mainViewContainer, { paddingBottom: height(7) }]}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            Icon = item.Icon;
            return (
              <CategoryIcon
                navigation={navigation}
                disabled={true}
                cardStyle={styles.card}
                greybackground={styles.greybackground}
                title={item?.name}
                textStyle={styles.textStyle}
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
                      search: search||'',
                    });
                  } else {
                    navigation.navigate(ScreenNames.LISTDATA, {
                      category: item?.name,
                      find: item?.name,
                      search: search||'',
                    });
                  }
                }}
              >
                {/* <Icon height={width(17)} width={width(17)} /> */}
                <Image
                  style={{ height: width(10), width: width(10) }}
                  source={{ uri: item?.image }}
                />
              </CategoryIcon>
            );
          }}
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
