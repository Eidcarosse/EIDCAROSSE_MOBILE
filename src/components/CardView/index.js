import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../asset/images";
import {
  selectFavAds,
  selectUserMeta,
  setAdsFav,
} from "../../redux/slices/user";
import ScreenNames from "../../routes/routes";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import GlobalMethods from "../../utills/Methods";
import styles from "./styles";
import { toggleFavorite } from "../../backend/api";
export default function CardView({ data }) {
  const dispatch = useDispatch();
  const favAdIds = useSelector(selectFavAds);
   function isInArray(element, arr) {
    // Check if arr is defined and not null
    if (arr && Array.isArray(arr)) {
      return arr.includes(element);
    }
    return false; // Return false if arr is not defined or not an array
  }
  //console.log("indata", data);
  const loginuser = useSelector(selectUserMeta);
  const navigation = useNavigation();
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (isInArray(data._id, favAdIds)) {
      setFav(true);
    }
    else{
      setFav(false)
    }
  });

 
  const onpressfav = async () => {
    if (!loginuser) {
      alert("Please login first");
    } else {
      let fav = await toggleFavorite(data._id, loginuser._id);
      dispatch(setAdsFav(fav));
      if (isInArray(data._id, fav)) {
        setFav(true);
      } else {
        setFav(false);
      }
    }
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
          <View>
            <Text numberOfLines={1} style={styles.titletext}>
              {data?.title}
            </Text>
            <View style={styles.categoryview}>
              <MaterialIcons name="category" color={"grey"} size={width(4)} />
              <Text numberOfLines={1} style={styles.detailtext}>
                {data?.category}
              </Text>
            </View>
            <View style={styles.categoryview}>
              <Entypo name="location-pin" color={"grey"} size={width(4)} />
              <Text numberOfLines={2} style={styles.detailtext}>
                {data?.address}
              </Text>
            </View>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.chf}>
              CHF {data?.price}
            </Text>
            <Text numberOfLines={1} style={styles.eur}>
              EUR {data?.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onpressfav} style={styles.space}>
          <AntDesign
            size={width(4)}
            color={fav ? AppColors.primary : "black"}
            name={fav ? "heart" : "hearto"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.space}
          onPress={GlobalMethods.onPressCall}
        >
          <Ionicons size={width(4)} name="call" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.space}
          onPress={GlobalMethods.onPressMessage}
        >
          <Ionicons size={width(4)} name="chatbubble-ellipses" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.space}
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
