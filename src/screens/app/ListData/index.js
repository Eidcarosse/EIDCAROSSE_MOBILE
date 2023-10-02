import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View, Image, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Head,
  ListingView,
  ScreenWrapper,
  SearchBar,
  SearchFilter,
} from "../../../components";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
//import { data } from "../../../utills/Data";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { BaseUrl } from "../../../utills/Constants";
import { useDispatch } from "react-redux";
import { setAppLoader } from "../../../redux/slices/config";
import { getAllData } from "../../../backend/api";
import Icons from "../../../asset/images";

export default function ListData({ navigation, route }) {
  //console.log("show list page ",route?.params);

  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch(setAppLoader(true));
    let d = await getAllData();
    if (d) setData(d);
    else setData([]);
    dispatch(setAppLoader(false));
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Search Data"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.filterview}>
          <SearchBar containerstyle={{ width: width(80) }} />
          <TouchableOpacity
            style={{ marginLeft: width(2) }}
            onPress={() => refRBSheet.current.open()}
          >
            <FontAwesome
              name="sliders"
              size={width(7)}
              color={AppColors.primary}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: width(10),
            marginVertical: height(2),
            width: width(98),
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  width: width(98),
                  alignSelf: "center",
                  padding:width(3),
                  marginBottom:height(1),
                  backgroundColor:'white',
                  borderRadius:width(2)
                }}
              >
                <Text style={{color:AppColors.primary,fontWeight:'bold',fontSize:width(4)}}>Total Result : {data?.length||0}</Text>
              </View>
            );
          }}
          renderItem={({ item }) => {
            return <ListingView data={item} />;
          }}
          ListEmptyComponent={({ item }) => {
            return (
              <View
                style={{
                  height: height(100),
                  alignItems: "center",
                  marginTop: height(25),
                }}
              >
                <Image
                  source={Icons.empty}
                  style={{ height: width(50), width: width(60) }}
                />
              </View>
            );
          }}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        <View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeOnPressBack={true}
            height={height(70)}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              container: {
                borderTopLeftRadius: width(8),
                borderTopRightRadius: width(8),
                borderWidth:width(.1),
                borderBlockColor:AppColors.primary
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <SearchFilter
              onPressClear={() => refRBSheet.current.close()}
              onPressFilter={() => refRBSheet.current.close()}
            />
          </RBSheet>
        </View>
      </View>
    </ScreenWrapper>
  );
}
