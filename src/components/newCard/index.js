import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../backend/api";
import { selectCategoryList } from "../../redux/slices/config";
import { selectCurrentLanguage } from "../../redux/slices/language";
import {
  selectFavAds,
  selectUserMeta,
  setAdsFav,
} from "../../redux/slices/user";
import ScreenNames from "../../routes/routes";
import AppColors from "../../utills/AppColors";
import { WebLink } from "../../utills/Constants";
import { height, width } from "../../utills/Dimension";
import GlobalMethods, {
  checkPrice,
  formatPrice,
  formatPriceE,
  infoMessage,
} from "../../utills/Methods";
import styles from "./styles";
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
      infoMessage(t(`flashmsg.loginfavorite`), t(`flashmsg.authentication`));
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
        <Image style={styles.image} source={{ uri: item?.img }} />
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
                <MaterialIcons
                  name="category"
                  color={"grey"}
                  size={height(2)}
                />
                <Text numberOfLines={1} style={styles.categorytext}>
                  {/* {data?.category}
                   */}
                  {t(`category.${data?.category}`)}
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
                <Entypo size={height(2.5)} name="share" color={"grey"} />
              </TouchableOpacity>
              {!(data?.userId?._id === loginuser?._id) ? (
                <View>
                  <TouchableOpacity onPress={onpressfav}>
                    <AntDesign
                      size={height(2.5)}
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
            keyExtractor={(item, index) => index}
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
            {checkPrice(data?.price) ? (
              <View>
                <Text numberOfLines={1} style={styles.chf}>
                  CHF {formatPrice(data?.price)}
                </Text>
                <Text numberOfLines={1} style={styles.eur}>
                  EUR {formatPriceE(Math.round(data?.price * 1.06))}
                </Text>
              </View>
            ) : (
              <View style={styles.cfpview}>
                <Text numberOfLines={1} style={styles.cfp}>
                  {t("detail.CFP")}
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
              <AntDesign
                name="clockcircleo"
                color={"grey"}
                size={height(1.6)}
              />
              <Text numberOfLines={1} style={styles.categorytext}>
                {GlobalMethods.calculateTimeDifference(
                  data?.createdAt,
                  language
                )}
              </Text>
            </View>
            <AntDesign name="eye" color={"grey"} size={height(1.5)}>
              {" "}
              {data?.views}
            </AntDesign>
            {/* <Text style={{ fontSize: width(3), color: "grey" }}>
            
              {"  Views"}
            </Text> */}
          </View>
        </Pressable>
      </View>

      <View style={styles.icons}>
        <View style={styles.categoryview}>
          <Entypo name="location-pin" color={"grey"} size={height(2)} />
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
                  infoMessage(
                    t(`flashmsg.loginfavorite`),
                    t(`flashmsg.authentication`)
                  );
                } else {
                  GlobalMethods.onPressCall(loginuser?.phoneNumber);
                }
              }}
            >
              <Ionicons
                size={height(2.5)}
                name="call"
                color={data?.phone ? "grey" : "lightgrey"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!loginuser) {
                  infoMessage(
                    t(`flashmsg.loginfavorite`),
                    t(`flashmsg.authentication`)
                  );
                } else {
                  map && onPresshide();
                  navigation.navigate(ScreenNames.CHAT, {
                    userRoom: null,
                    usr: data?.userId,
                    userItem: data,
                  });
                }
              }}
            >
              <Entypo size={height(2.5)} name="chat" color={"grey"} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
