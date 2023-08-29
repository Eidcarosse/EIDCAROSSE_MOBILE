import React from "react";
import { FlatList, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import { MyListingView, ScreenWrapper } from "../../../components";
import CardView from "../../../components/CardView";
import CategoryList from "../../../components/categorylist";
import Header from "../../../components/header";
import {
  selectUserMeta
} from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";
import SearchBar from "../../../components/searchbar";
import { width } from "../../../utills/Dimension";
import ScreenNames from "../../../routes/routes";
export default function MyListing({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);

  const data = [
    { name: "Vogele - Super 800", category: "Construction Machines", location: "Schoberbass", uri: Icons.car ,views:'114' ,chf:'29’900',eur:'31’165'},
    { name: "Vogele - Super 800", category: "Construction Machines", location: "Schoberbass", uri: Icons.car ,views:'114' ,chf:'29’900',eur:'31’165'},
    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },
    { name: "Civic", category: "ABC", location: "ABC", uri: Icons.car },
    { name: "Civic", category: "ABC", location: "AC", uri: Icons.car },
  ];
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation}/>}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
      <View
      style={{width:width(100),alignItems:'center'}}
      >
      {data.map((item,index)=>(
        <TouchableOpacity
        activeOpacity={.8}
        onPress={()=>{
          navigation.navigate(ScreenNames.DETAIL,item)
        }}
        key={index}
        style={{width:width(100),alignItems:'center'}}
        >
        <MyListingView data={item}/>
        </TouchableOpacity>
        ))}
      
        </View>
      </View>
    </ScreenWrapper>
  );
}
