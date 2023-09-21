import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";
import GlobalMethods from "../../utills/Methods";
export default function ListingView({ data }) {
  const navigation = useNavigation();
  const [fav, setFav] = useState(false);
  const setMyFav = () => {
    setFav(!fav);
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(ScreenNames.DETAIL, data);
        }}
      >
        <View style={styles.imageview}>
          <Image style={styles.image} source={{ uri: data?.images[0] }} />
        </View>
        <View style={styles.detail}>
          <View style={{ paddingBottom: width(5) }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: width(4),
                color: AppColors.primary,
                fontWeight: "bold",
              }}
            >
              CHF {data?.price}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: width(3),
                color: "grey",
                fontWeight: "bold",
              }}
            >
              EUR {data?.price}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="category" color={"grey"} size={width(4)} />
              <Text
                numberOfLines={1}
                style={{ fontSize: width(3), marginLeft: width(2) }}
              >
                {data?.category}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Entypo name="location-pin" color={"grey"} size={width(4)} />
              <Text
                numberOfLines={2}
                style={{
                  fontSize: width(3),
                  marginLeft: width(2),
                  width: width(35),
                }}
              >
                {data?.address}s
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity onPress={setMyFav}>
          <AntDesign
            size={width(4)}
            color={fav ? AppColors.primary : "black"}
            name={fav ? "heart" : "hearto"}
          />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={GlobalMethods.onPressCall}
        >
          <Ionicons size={width(4)} name="call" />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={GlobalMethods.onPressMessage}
        >
          <Ionicons size={width(4)} name="chatbubble-ellipses" />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={GlobalMethods.onPressShare}
        >
          <Entypo size={width(4)} name="share" />
        </TouchableOpacity>
        <AntDesign size={width(4)} name="eye" color={"grey"} />
        <Text style={{ fontSize: width(2) }}>{data?.views} view</Text>
      </View>
    </View>
  );
}
