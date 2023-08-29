import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";
import {
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";

export default function ListingView({ data }) {
  // console.log("indata", data);
  return (
    <View style={styles.main}>
      <View style={styles.imageview}>
        <Image resizeMode='stretch' style={styles.image} source={data?.uri} />
      </View>
      <View style={styles.detail}>
        <View style={{ paddingBottom:width(5) }}>
        <Text
            numberOfLines={1}
            style={{
              fontSize: width(3.5),
              color: AppColors.primery,
              fontWeight: "bold",
            }}
          >
            CHF {data?.chf}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: width(2.5), color: "grey", fontWeight: "bold" }}
          >
            EUR {data?.eur}
          </Text>
        </View>
        <View>
        
          <Text numberOfLines={1} style={{ fontWeight: "bold", fontSize: width(3.5) }}>
            {data?.name}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            <MaterialIcons name="category" color={"grey"} />
            {data?.category}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2) }}>
            <Entypo name="location-pin" color={"grey"} />
            {data?.location}
          </Text>
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity >
          <AntDesign size={width(4)} color={AppColors.primery} name="heart" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Ionicons size={width(4)} name="call" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Ionicons size={width(4)} name="chatbubble-ellipses" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Entypo size={width(4)} name="share" />
        </TouchableOpacity>
        <AntDesign size={width(4)} name="eye" color={"grey"} />
        <Text style={{ fontSize: width(2) }}>{data?.views} view</Text>
      </View>
    </View>
  );
}
