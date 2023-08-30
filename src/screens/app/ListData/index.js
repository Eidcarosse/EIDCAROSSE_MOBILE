import React, { useState,useRef } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import {
  CategoryIcon,
  Head,
  ListingView,
  ScreenWrapper,
  SearchBar,
  SearchFilter,
} from "../../../components";
import Modal from "react-native-modal";
import RBSheet from "react-native-raw-bottom-sheet";
import categories from "../../../svgcomponents";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import ScreenNames from "../../../routes/routes";
import { FontAwesome } from "@expo/vector-icons";
import {data} from '../../../utills/Data'
import Icons from "../../../asset/images";
import { SelectList } from "react-native-dropdown-select-list";

export default function ListData({ navigation, route }) {
  const refRBSheet = useRef();
  const [visible, setVisible] = useState(false);
  
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Search Data"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primery}
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
              color={AppColors.primery}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: width(10), marginVertical: height(2) }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate(ScreenNames.DETAIL, item);
                }}
              >
                <ListingView data={item} />
              </TouchableOpacity>
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
        height={height(80)}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container:{
            borderTopLeftRadius:width(8),
            borderTopRightRadius:width(8),
            
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
      <SearchFilter/>
      </RBSheet>
        </View>
      </View>
    </ScreenWrapper>
  );
}
