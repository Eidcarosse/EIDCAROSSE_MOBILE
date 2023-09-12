import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import Icons from "../../asset/images";

export default function CardView({ data }) {
  //console.log("indata", data);
  return (
    <View style={styles.main}>
      <View style={styles.imageview}>
        <Image
          resizeMode="cover"
          style={styles.image}
          // source={{ uri: data?.image[0] }}
          source={{ uri:data?.image? data?.image[0] :Icons.car }}

        />
      </View>
      <View style={styles.detail}>
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={{ fontWeight: "bold", fontSize: width(3.5) }}
          >
            {data?.title}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            <MaterialIcons name="category" color={"grey"} />
            {data?.category}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            <Entypo name="location-pin" color={"grey"} />
            {data?.address}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: width(3.5),
              color: AppColors.primary,
              fontWeight: "bold",
            }}
          >
            CHF {data?.price}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: width(2.5), color: "grey", fontWeight: "bold" }}
          >
            EUR {data?.price}
          </Text>
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity style={{ paddingVertical: 3 }}>
          <AntDesign
            size={width(4)}
            color={data?.fev ? AppColors.primary : "black"}
            name={data?.fev ? "heart" : "hearto"}
          />
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
