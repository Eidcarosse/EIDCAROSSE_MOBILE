import React from "react";
import { FlatList, TouchableOpacity, View,Text } from "react-native";
import { CategoryIcon, Head, ScreenWrapper } from "../../../components";
import categories from "../../../svgcomponents";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
import ScreenNames from "../../../routes/routes";

export default function BikeCategory({ navigation, route }) {

    const data=[
        {title:'E-Bike'},
        {title:'Bicycles'},
        {title:'E-Scooters'},
        {title:'Motorcycle'},
        
    ]
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Head headtitle={"Bikes"}  navigation={navigation} />}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
    >
      <View
        style={styles.mainViewContainer}
      >
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            Icon = item.Icon;
            return (
              <TouchableOpacity
              activeOpacity={.6}
                style={styles.card}
                onPress={()=>{
                  if(route.params=='ADD'){
                    navigation.navigate(ScreenNames.ADDPOST);
                  }
                 else navigation.navigate(ScreenNames.LISTDATA);
                }}
              >
               <Text>{item.title}</Text>
              </TouchableOpacity>
            );
          }}

          keyExtractor={(item,index)=>index}
        />
      </View>
    </ScreenWrapper>
  );
}
