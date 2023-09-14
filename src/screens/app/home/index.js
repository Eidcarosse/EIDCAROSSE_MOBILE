import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
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
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { SelectList } from "react-native-dropdown-select-list";
import LottieView from "lottie-react-native";
import { setAppLoader } from "../../../redux/slices/config";
import { useFocusEffect } from "@react-navigation/native";
import { BaseUrl } from "../../../utills/Constants";
import { getDataofHomePage } from "../../../backend/api";

export default function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [data, setData] = useState([]);
  const ddata = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  const getData = async () => {
    dispatch(setAppLoader(true));
    let d= await getDataofHomePage()
    if(d)setData(d)
    else setData([])
     dispatch(setAppLoader(false));
  
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        {/* <View
        style={{position:'absolute',backgroundColor:'white',zIndex:1,top:height(3)}}
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
        <SearchBar />

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
          <Text style={{ fontSize: width(3), fontWeight: "bold" }}>
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
        <View style={{ width: width(100), alignItems: "center",flex:1 }}>
          {data.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate(ScreenNames.DETAIL, item);
              }}
              key={index}
              style={{ width: width(100), alignItems: "center" }}
            >
              <CardView data={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
