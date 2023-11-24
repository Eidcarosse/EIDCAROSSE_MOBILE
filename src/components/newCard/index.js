import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavAds,
  selectUserMeta,
  setAdsFav,
} from "../../redux/slices/user";
import ScreenNames from "../../routes/routes";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import GlobalMethods, { infoMessage } from "../../utills/Methods";
import styles from "./styles";
import { toggleFavorite } from "../../backend/api";
import SwiperFlatList from "react-native-swiper-flatlist";
import { ImageSlider } from "react-native-image-slider-banner";
import categories from "../../svgcomponents";
import { useTranslation } from "react-i18next";
import { selectCurrentLanguage } from "../../redux/slices/language";
import { WebLink } from "../../utills/Constants";
export default function Card({ data, onPresshide, map = false }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const favAdIds = useSelector(selectFavAds);
  const loginuser = useSelector(selectUserMeta);
  const navigation = useNavigation();
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (isInArray(data._id, favAdIds)) {
      setFav(true);
    } else {
      setFav(false);
    }
  });
  const img = data?.images?.map((item) => {
    return { img: item };
  });
  function isInArray(element, arr) {
    // Check if arr is defined and not null
    if (arr && Array.isArray(arr)) {
      return arr.includes(element);
    }
    return false; // Return false if arr is not defined or not an array
  }
  const onpressfav = async () => {
    if (!loginuser) {
      infoMessage("Login to ad Favotite", "Authentication");
    } else {
      let fav = await toggleFavorite(data._id, loginuser._id);
      if (isInArray(data._id, fav)) {
        setFav(true);
      } else {
        setFav(false);
      }
      dispatch(setAdsFav(fav));
    }
  };
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          map && onPresshide();
          navigation.navigate(ScreenNames.DETAIL, data);
        }}
        style={{ paddingHorizontal: width(0.5) }}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          // source={{ uri: data?.image[0] }}
          source={{ uri: item ? item?.img : Icons.car }}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.main}>
      <View style={{ borderBottomWidth: width(0.1) }}>
        <Pressable
          style={styles.detail}
          onPress={() => {
            map && onPresshide();
            navigation.navigate(ScreenNames.DETAIL, data);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width(90),
            }}
          >
            <View style={{ width: width(65) }}>
              <Text numberOfLines={1} style={styles.titletext}>
                {data?.title}
              </Text>
              <View style={styles.categoryview}>
                <MaterialIcons name="category" color={"grey"} size={width(4)} />
                <Text numberOfLines={1} style={styles.categorytext}>
                  {/* {data?.category}
                   */}
                  {t(
                    categories.find(
                      (category) => category.title === data?.category
                    )?.show
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: width(20),
                justifyContent: "space-between",
                padding: width(2),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  GlobalMethods.onPressShare(
                    `${WebLink}${data?._id}`,
                    data?.title
                  )
                }
              >
                <Entypo size={width(5)} name="share" color={"grey"} />
              </TouchableOpacity>
              {!(data?.userId?._id === loginuser?._id) ? (
                <View>
                  <TouchableOpacity onPress={onpressfav}>
                    <AntDesign
                      size={width(5)}
                      color={fav ? AppColors.primary : "grey"}
                      name={fav ? "heart" : "hearto"}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </Pressable>

        <View style={styles.imageview}>
          {/* <ImageSlider
            data={img}
            showIndicator={false}
            autoPlay={false}
            preview={false}
            caroselImageStyle={styles.cics}
          /> */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={img}
            renderItem={renderItem}
          />
        </View>
        <Pressable
          style={styles.detail}
          onPress={() => {
            map && onPresshide();
            navigation.navigate(ScreenNames.DETAIL, data);
          }}
        >
          <View style={styles.detailinerview}>
            {data?.price ? (
              <View>
                <Text numberOfLines={1} style={styles.chf}>
                  CHF {data?.price}
                </Text>
                <Text numberOfLines={1} style={styles.eur}>
                  EUR {data?.price}
                </Text>
              </View>
            ) : (
              <View style={styles.cfpview}>
                <Text numberOfLines={1} style={styles.cfp}>
                  Contact for Price
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              width: width(87),
            }}
          >
            <View style={styles.categoryview}>
              <AntDesign name="clockcircleo" color={"grey"} size={width(3.5)} />
              <Text numberOfLines={1} style={styles.categorytext}>
                {GlobalMethods.calculateTimeDifference(
                  data?.createdAt,
                  language
                )}
              </Text>
            </View>
            <Text style={{ fontSize: width(3), color: "grey" }}>
              {data?.views}
              {"  Views"}
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.icons}>
        <View style={styles.categoryview}>
          <Entypo name="location-pin" color={"grey"} size={width(4)} />
          <Text numberOfLines={2} style={styles.categorytext}>
            {data?.address}
          </Text>
        </View>
        {!(data?.userId?._id === loginuser?._id) ? (
          <View
            style={{
              flexDirection: "row",
              width: width(20),
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              disabled={data?.phone ? false : true}
              onPress={() => {
                if (!loginuser) {
                  infoMessage("Login to ad Favotite", "Authentication");
                } else {
                  GlobalMethods.onPressCall(data?.phone);
                }
              }}
            >
              <Ionicons
                size={width(5)}
                name="call"
                color={data?.phone ? "grey" : "lightgrey"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!loginuser) {
                  infoMessage("Login to ad Favotite", "Authentication");
                } else {
                  navigation.navigate(ScreenNames.CHAT, {
                    userRoom: null,
                    usr: data?.userId,
                    userItem: data?._id,
                  });
                }
              }}
            >
              <Entypo size={width(5)} name="chat" color={"grey"} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
