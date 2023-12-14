import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { adView, getDataofAdByID, toggleFavorite } from "../../../backend/api";
import {
  DetailFooter,
  DetailHeader,
  IconButton,
  RelatedAd,
  ScreenWrapper,
} from "../../../components";
import { selectCategoryList } from "../../../redux/slices/config";
import {
  selectFavAds,
  selectUserMeta,
  setAdsFav,
} from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { WebLink } from "../../../utills/Constants";
import { height, width } from "../../../utills/Dimension";
import GlobalMethods, { infoMessage } from "../../../utills/Methods";
import styles from "./styles";
export default function Detail({ navigation, route }) {
  const { t } = useTranslation();
  const dat = route?.params;
  const loginuser = useSelector(selectUserMeta);
  const categories = useSelector(selectCategoryList);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setDat] = useState([]);
  const favAdIds = useSelector(selectFavAds);
  const [fav, setFav] = useState(false);
  const [load, setload] = useState(false);
  useEffect(() => {
    if (isInArray(data?._id, favAdIds)) {
      setFav(true);
    } else {
      setFav(false);
    }
  });
  const handlePress = () => {
    // You can replace the URL with the link you want to open
    Linking.openURL(data?.videoUrl);
  };
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
      let fav = await toggleFavorite(data?._id, loginuser?._id);
      if (isInArray(data._id, fav)) {
        setFav(true);
      } else {
        setFav(false);
      }
      dispatch(setAdsFav(fav));
    }
  };
  const img = data?.images?.map((item) => {
    return { img: item };
  });
  function isNullOrNullOrEmpty(value) {
    return (
      value === null ||
      value === "" ||
      value === "null" ||
      value === undefined ||
      value === "undefined"
    );
  }
  useEffect(() => {
    getData();
  }, [dat?._id != data?._id]);
  // useEffect(() => {
  //  if(isEnabled){

  //  }
  // }, [isEnd]);

  const getData = async () => {
    try {
      setload(true);
      let d = await getDataofAdByID(dat?._id);
      // setload(false);
      if (d) {
        setDat(d);
        if (d.userId._id != loginuser?._id) {
          await adView(dat?._id);
        }
        if (mapRef?.current) {
          mapRef?.current.animateToRegion(
            {
              latitude: d?.latitude || 0,
              longitude: d?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            3 * 1000
          );
        }
      } else setDat({});
      setload(false);
    } catch (error) {
      setload(false);
    }

    // dispatch(setAppLoader(false));
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <DetailHeader
          onPressBack={() => navigation.goBack()}
          onPressShare={() =>
            GlobalMethods.onPressShare(`${WebLink}${data?._id}`, data?.title)
          }
        />
      )}
      footerUnScrollable={() =>
        !(data?.userId?._id == loginuser?._id || load) && (
          <DetailFooter
            pNumber={data?.phone}
            onPressCall={() =>
              GlobalMethods.onPressCall(data?.userId?.phoneNumber)
            }
            onPressChat={() => {
              navigation.navigate(ScreenNames.CHAT, {
                userRoom: null,
                usr: data?.userId,
                userItem: data?._id,
              });
            }}
            onPressMail={() => GlobalMethods.onPressEmail(data?.email)}
          />
        )
      }
      statusBarColor={AppColors.primary} //{"rgba(128, 128, 128,5)"}
      barStyle="light-content"
      scrollEnabled
    >
      {load ? (
        <View
          style={{
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
            height: height(60),
          }}
        >
          <ActivityIndicator size={"large"} color={AppColors.primary} />
        </View>
      ) : (
        <View style={styles.mainViewContainer}>
          <View style={styles.imageview}>
            <ImageSlider
              showIndicator
              data={img}
              indicatorContainerStyle={{ color: AppColors.primary }}
              autoPlay={false}
              caroselImageStyle={{ resizeMode: "contain" }}
              activeIndicatorStyle={{ backgroundColor: AppColors.primary }}
              closeIconColor={AppColors.white}
              preview={true}
            />
          </View>
          <View style={styles.nameview}>
            <View
              style={{
                paddingBottom: height(2),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!isNullOrNullOrEmpty(data?.price) ? (
                <View style={{}}>
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
                    EUR {Math.round(data?.price * 1.06)}
                  </Text>
                </View>
              ) : (
                <View style={styles.cfpview}>
                  <Text numberOfLines={1} style={styles.cfp}>
                    {t("detail.CFP")}
                  </Text>
                </View>
              )}
              {!(data?.userId?._id === loginuser?._id) ? (
                <TouchableOpacity
                  style={{ marginHorizontal: width(3) }}
                  onPress={onpressfav}
                >
                  <AntDesign
                    size={width(5)}
                    color={fav ? AppColors.primary : "black"}
                    name={fav ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: width(5) }}>
                {data?.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: width(80),
                  paddingVertical: width(2),
                  alignItems: "center",
                }}
              >
                <Entypo name="location-pin" color={"grey"} size={width(5)} />
                <Text style={{ fontSize: width(3) }}>{data?.address}</Text>
              </View>
            </View>
          </View>
          {
            //detail view
          }
          <View style={styles.detailview}>
            <View style={styles.detailcard}>
              <Text style={{ fontSize: width(5), fontWeight: "bold" }}>
                {t("detail.detailword")}
              </Text>
              {!isNullOrNullOrEmpty(data?.category) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.category")}</Text>
                  <Text style={styles.cardelement2}>
                    {t(`category.${data?.category}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.subCategory) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.subcategory")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {t(`subList.${data?.subCategory}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.type) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.type")}</Text>
                  <Text style={styles.cardelement2}>
                    {data?.type === "Others"
                      ? t("category.Others")
                      : t(`type.${data?.type}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.brand) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.brand")}</Text>
                  <Text style={styles.cardelement2}>
                    {data?.brand === "Others"
                      ? t("category.Others")
                      : data?.brand}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.model) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.model")}</Text>
                  <Text style={styles.cardelement2}>
                    {data?.model === "Others"
                      ? t("category.Others")
                      : data?.model}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.year) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.year")}</Text>
                  <Text style={styles.cardelement2}>{data?.year}</Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.condition) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.condition")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.condition} */}
                    {t(`condition.${data?.condition}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.bodyShape) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.bodyshape")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {t(`bodyShapeList.${data?.bodyShape}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.engineCapacity) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.engin")}</Text>
                  <Text style={styles.cardelement2}>
                    {data?.engineCapacity}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.exteriorColor) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.exteriorcolor")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {t(`colorList.${data?.exteriorColor}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.interiorColor) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.interiorcolor")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {t(`colorList.${data?.interiorColor}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.fuelType) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.fueltype")}</Text>
                  <Text style={styles.cardelement2}>
                    {t(`fuelTypelist.${data?.fuelType}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.gearBox) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.gearbox")}</Text>
                  <Text style={styles.cardelement2}>
                    {t(`gearBoxList.${data?.gearBox}`)}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.km) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.km")}</Text>
                  <Text style={styles.cardelement2}>{t(data?.km)}</Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.videoUrl) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.videourl")}</Text>
                  <TouchableOpacity
                    style={styles.cardelement2}
                    onPress={handlePress}
                  >
                    <Text style={{ color: "blue" }}>{data?.videoUrl}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.website) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.website")}</Text>
                  <Text style={styles.cardelement2}>{data?.website}</Text>
                </View>
              )}
            </View>
          </View>
          {
            /////task uper/////
          }
          <View style={{ paddingLeft: width(5), paddingBottom: width(3) }}>
            <Text style={{ fontWeight: "bold", fontSize: width(5) }}>
              {t("detail.description")}
            </Text>
            <Text style={{ fontSize: width(3), paddingVertical: width(2) }}>
              {data?.description}
            </Text>
          </View>
          {/* user profile */}
          {!(data?.userId?._id == loginuser?._id) && (
            <Pressable
              onPress={() => {
                navigation.navigate(ScreenNames.OTHERPROFILE, {
                  user: data?.userId,
                });
              }}
              style={styles.profileview}
            >
              <View style={styles.profilecard}>
                <Image
                  source={{ uri: data?.userId?.image }}
                  style={styles.profileimage}
                />
                <View style={styles.profilecardin}>
                  <Text
                    style={{
                      marginHorizontal: width(2),
                      fontSize: width(4),
                      fontWeight: "bold",
                      width: width(50),
                      color: AppColors.black,
                    }}
                  >
                    {data?.userId?.firstName} {data?.userId?.lastName}
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: width(2),
                      fontSize: width(3),
                      color: AppColors.black,
                    }}
                  >
                    {data?.userId?.userName}
                  </Text>
                </View>

                {/* <IconButton
                textStyle={{fontSize: width(2.5),}}
                  title={"detail.seeAllAds"}
                 
                /> */}
                <Entypo name="chevron-right" size={width(10)} />
              </View>
            </Pressable>
          )}
          {!(data?.userId?._id == loginuser?._id) && (
            <View style={styles.contact}>
              {!isNullOrNullOrEmpty(data?.whatsapp) && (
                <IconButton
                  title={"WhatsApp"}
                  icon={
                    <Ionicons
                      size={width(4)}
                      name="logo-whatsapp"
                      color={AppColors.white}
                    />
                  }
                  containerStyle={{ backgroundColor: "#41C053" }}
                  onPress={() => GlobalMethods.openWhatsApp(data?.whatsapp)}
                />
              )}
              {!isNullOrNullOrEmpty(data?.viber) && (
                <IconButton
                  title={"Viber"}
                  icon={
                    <Fontisto
                      size={width(4)}
                      name="viber"
                      color={AppColors.white}
                    />
                  }
                  containerStyle={{
                    backgroundColor: "#7D3DAF",
                    marginLeft: width(2),
                  }}
                  onPress={() => GlobalMethods.openViber(data?.viber)}
                />
              )}
            </View>
          )}
          <View style={{ paddingLeft: width(4) }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: width(5),
                marginVertical: width(2),
              }}
            >
              {t("detail.location")}
            </Text>
          </View>
          <View style={styles.map}>
            <MapView
              ref={mapRef}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: width(3),
              }}
            >
              <Marker
                coordinate={{
                  latitude: dat?.latitude || 0,
                  longitude: dat?.longitude || 0,
                }}
              />
            </MapView>
          </View>
          <RelatedAd category={data?.category} id={data?._id} />
        </View>
      )}
    </ScreenWrapper>
  );
}
