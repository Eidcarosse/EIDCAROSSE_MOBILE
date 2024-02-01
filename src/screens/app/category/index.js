import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../backend/common";
import {
  CategoryIcon,
  Head,
  Header,
  ScreenWrapper,
  SearchBar,
} from "../../../components";
import {
  selectCategoryList,
  setAppLoader,
  setCategoryList,
} from "../../../redux/slices/config";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";

export default function Category({ navigation, route }) {
  const data = useSelector(selectCategoryList);
  const search = route?.params?.search;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = async () => {
    async function getCategorylist() {
      const d = await getCategory();
      if (d) dispatch(setCategoryList(d));
    }
    // setRefreshing(true);
    try {
      if (!data || data.length < 1) {
        dispatch(setAppLoader(true));
        getCategorylist();
        setTimeout(() => {
          dispatch(setAppLoader(false));
        }, 1000);
      }
    } catch (error) {}
  };

  return (
    <ScreenWrapper
      showStatusBar={false}
      headerUnScrollable={() =>
        route?.params ? (
          <Head headtitle={"categorylist.categories"} navigation={navigation} />
        ) : (
          <Header navigation={navigation} />
        )
      }
      scrollEnabled
      refreshing={refreshing}
      onRefresh={onRefresh}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={[{ paddingBottom: height(7), margin: width(3) }]}>
        {/* {route?.params?.value == "seeAll" && (
          <SearchBar
            search={searchString}
            setSearch={setSearchString}
            containerstyle={{
              width: width(95),
              borderRadius: height(1),
              flexDirection: "row",
              borderWidth: height(0.1),
              alignItems: "center",
              paddingVertical: height(0.5),
            }}
          />
        )} */}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
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
                  if (route?.params?.value == "seeAll") {
                    if (item.name == "Bikes" || item.name == "Parts") {
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
                  } else if (item.name == "Bikes" || item.name == "Parts") {
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
