import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import Icons from "../../asset/images";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";
import GlobalMethods from "../../utills/Methods";
export default function CardView({ data }) {
  //console.log("indata", data);
  const navigation = useNavigation();
  const [fav, setFav] = useState(false);
  const onpressfav = () => {
    setFav(!fav);
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ flexDirection: "row" }}
        onPress={() => {
          navigation.navigate(ScreenNames.DETAIL, data);
        }}
      >
        <View style={styles.imageview}>
          <Image
            resizeMode="cover"
            style={styles.image}
            // source={{ uri: data?.image[0] }}
            source={{ uri: data?.images ? data?.images[0] : Icons.car }}
          />
        </View>
        <View style={styles.detail}>
          <View style={{}}>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "bold",
                fontSize: width(4),
                paddingBottom: width(1),
              }}
            >
              {data?.title}
            </Text>
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
          <View>
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
        </View>
      </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity
          onPress={onpressfav}
          style={{ paddingVertical: width(1) }}
        >
          <AntDesign
            size={width(4)}
            color={fav ? AppColors.primary : "black"}
            name={fav ? "heart" : "hearto"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: width(1) }}
          onPress={GlobalMethods.onPressCall}
        >
          <Ionicons size={width(4)} name="call" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: width(1) }}
          onPress={GlobalMethods.onPressMessage}
        >
          <Ionicons size={width(4)} name="chatbubble-ellipses" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: width(1) }}
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
