import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity, Text, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../backend/common";
import { CategoryIcon, Head, Header, ScreenWrapper } from "../../../components";
import {
  selectCategoryList,
  setAppLoader,
  setCategoryList,
} from "../../../redux/slices/config";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function Category({ navigation, route }) {
  const { t } = useTranslation();
  const data = useSelector(selectCategoryList);

  const search = route?.params?.search;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [searchString, setSearchString] = useState(data[0]);
  useEffect(() => {
    onRefresh();
  }, []);
  async function getCategorylist() {
    const d = await getCategory();
    if (d) dispatch(setCategoryList(d));
  }
  const onRefresh =  () => {
   
    setRefreshing(true);
    try {
      if (!data || data.length < 1) {
        dispatch(setAppLoader(true));
        getCategorylist();
        setTimeout(() => {
          dispatch(setAppLoader(false));
        }, 1000);
      }
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() =>
        route?.params ? (
          <Head headtitle={"categorylist.categories"} navigation={navigation} />
        ) : (
          <Header navigation={navigation} title={t("addPost.post")} />
        )
      }
      // scrollEnabled
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      <View
        style={[
          {
            paddingBottom: Platform.OS == "ios" ? height(7) : height(6),
            margin: height(1),
            flexDirection: "row",
          },
        ]}
      >
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          // scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    item?.name == searchString?.name ? "#E5E8E8" : "white",
                  padding:
                    item?.name == searchString?.name ? height(1) : height(0.3),
                  borderTopLeftRadius: height(1),
                  borderBottomLeftRadius: height(1),
                }}
              >
                <CategoryIcon
                  navigation={navigation}
                  cardStyle={{
                    paddingVertical:height(.7),
                    width:width(33),
                    marginVertical: height(.3),
                  }}
                  title={item?.name}
                  image={item?.image}
                  textStyle={styles.textStyle}
                  imageStyle={styles.imageStyle}
                  onPress={() => {
                    setSearchString(item);
                  }}
                />
              </View>
            );
          }}
          numColumns={1}
          keyExtractor={(item, index) => index}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
        <View
          style={{
            backgroundColor: "#E5E8E8",
            width: width(60),
            padding: height(0.5),
          }}
        >
          <FlatList
            data={searchString?.subCategories || []}
            showsVerticalScrollIndicator={false}
            style={{ borderRadius: 5 }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    width: width(63),
                    alignSelf: "center",
                    backgroundColor: AppColors.white,
                    padding: width(4),
                    elevation: 1,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    if (route?.params?.value == "seeAll") {
                      navigation.navigate(ScreenNames.LISTDATA, {
                        category: searchString?.name,
                        find: item.name,
                        subcategory: item.name,
                        search: search || "",
                      });
                    } else {
                      navigation.navigate(ScreenNames.ADDPOST, {
                        category: searchString?.name,
                        find: item.name,
                        subcategory: item.name,
                      });
                    }
                  }}
                >
                  <Text
                    style={{ fontSize: height(1.6), color: AppColors.black }}
                  >
                    {t(`category.${item.name}`)}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  backgroundColor: AppColors.greybackground,
                  height: 1,
                  width: width(70),
                }}
              />
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
