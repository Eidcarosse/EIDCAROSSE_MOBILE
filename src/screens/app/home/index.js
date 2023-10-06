import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenWrapper } from "../../../components";
import CardView from "../../../components/CardView";
import CategoryList from "../../../components/categorylist";
import Header from "../../../components/header";
import SearchBar from "../../../components/searchbar";
import { selectUserMeta } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
//import { data } from "../../../utills/Data";
import { useFocusEffect } from "@react-navigation/native";
import { getDataofHomePage } from "../../../backend/api";
import {
  selectTopAds,
  setAppLoader,
  setTopAds,
} from "../../../redux/slices/config";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import Icons from "../../../asset/images";
import { toastMessage } from "../../../utills/Methods";

export default function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const data = useSelector(selectTopAds);
  const ddata = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  const [refreshing, setRefreshing] = useState(false);
  const [searchString, setSearchString] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
    toastMessage("Refresh");
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  const getData = useCallback(async () => {
    // dispatch(setAppLoader(true));
    try {
      const data = await getDataofHomePage();
      if (data) {
        dispatch(setTopAds(data));
      } else {
        dispatch(setTopAds([]));
      }
      dispatch(setAppLoader(false));
    } catch (error) {
      console.log("Error:", error);
      // dispatch(setAppLoader(false));
    }
  });
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      <View style={styles.mainViewContainer}>
        {/* <View
        style={{position:'absolute',backgroundColor:Appcolor.White,zIndex:1,top:height(3)}}
        >
        <SelectList
          setSelected={(val) =>{}}
          data={ddata}
          save="value"
          maxHeight={height(80)}
          boxStyles={styles.searchbox}
          dropdownStyles={styles.dropdown}
        />
        </View> */}
        <SearchBar
          search={searchString}
          setSearch={setSearchString}
          next={true}
        />

        {/* <SelectList
            setSelected={(val) => {navigation.navigate(ScreenNames.LISTDATA)}}
            data={ddata}
            save="value"
            placeholder={'Serach here'}
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          /> */}
        {/* <View>
          <TextInput style={styles.searchinput} placeholder="search" />
        </View> */}
        <CategoryList navigation={navigation} />
        <View style={styles.titleview}>
          <Text style={{ fontSize: width(3.5), fontWeight: "bold" }}>
            Latest Ads
          </Text>
          <Pressable onPress={() => navigation.navigate(ScreenNames.LISTDATA)}>
            <Text
              style={{
                fontSize: 12,
                marginTop: 8,
                color: "grey",
                fontWeight: "bold",
              }}
            >
              See all
            </Text>
          </Pressable>
        </View>
        <View style={{ width: width(100), alignItems: "center" }}>
          {data?.length === 0 ? (
            <View style={styles.notfoundview}>
              <Image
                source={Icons.empty}
                style={{ height: width(50), width: width(60) }}
              />
            </View>
          ) : (
            data
              .map((item, index) => (
                <View
                  key={index}
                  style={{ width: width(100), alignItems: "center" }}
                >
                  <CardView data={item} />
                </View>
              ))
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
