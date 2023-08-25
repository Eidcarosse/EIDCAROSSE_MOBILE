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

export default function CardView({ data }) {
  // console.log("indata", data);
  return (
    <View style={styles.main}>
      <View style={styles.imageview}>
        <Image resizeMode='stretch' style={styles.image} source={data?.uri} />
      </View>
      <View style={styles.detail}>
        <View style={{ paddingBottom: width(5) }}>
          <Text numberOfLines={1} style={{ fontWeight: "bold", fontSize: 18 }}>
            {data?.name}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: 12 }}>
            <MaterialIcons name="category" color={"grey"} />
            {data?.category}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: 12 }}>
            <Entypo name="location-pin" color={"grey"} />
            {data?.location}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              color: AppColors.primery,
              fontWeight: "bold",
            }}
          >
            CHF {data?.chf}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}
          >
            EUR {data?.eur}
          </Text>
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity style={{ paddingVertical: 3 }}>
          <AntDesign size={width(4)} color={AppColors.primery} name="heart" />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 3 }}>
          <Ionicons size={width(4)} name="call" />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 3 }}>
          <Ionicons size={width(4)} name="chatbubble-ellipses" />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 3 }}>
          <Entypo size={width(4)} name="share" />
        </TouchableOpacity>
        <AntDesign size={width(4)} name="eye" color={"grey"} />
        <Text style={{ fontSize: width(2) }}>{data?.views} view</Text>
      </View>
    </View>
  );
}
