import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
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

export default function Search({ navigation, route }) {
  const data = useSelector(selectCategoryList);
  const search = route?.params?.search;
  const dispatch = useDispatch();
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
      headerUnScrollable={() => (
        <Head headtitle={"Search"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={[{ margin: height(1), paddingBottom: height(2), flex: 1 }]}>
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
        <View style={{ padding: height(1), }}>
          <Text
            style={{
              padding: height(0.5),
              fontSize: height(2.5),
              fontWeight: "bold",
            }}
          >
            Popular categories
          </Text>
        </View>
        <FlatList
          data={data}
          style={{ height: height(55) }}
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
