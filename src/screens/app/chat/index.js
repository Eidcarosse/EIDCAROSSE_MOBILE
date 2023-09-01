import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { FlatList, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import { ChatIcon, ScreenWrapper } from "../../../components";
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
import { SelectList } from "react-native-dropdown-select-list";
import { data } from "../../../utills/Data";

export default function ChatList({ navigation, route }) {
  const data=[
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Usama',
      uri:Icons.car,
      date:'2023-9-1'
    },
    {
      name:'Us',
      uri:Icons.car,
      date:'2023-9-1'
    },
  ]
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation}/>}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
    <FlatList
    showsVerticalScrollIndicator={false}
    data={data}
    renderItem={({item})=><ChatIcon data={item} onPress={()=>{navigation.navigate(ScreenNames.CHAT)}}/>}
    keyExtractor={(item,index)=>index}
    />
      </View>
    </ScreenWrapper>
  );
}
