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
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";
import { adView, getDataofAdByID, toggleFavorite } from "../../../backend/api";
import {
  DetailFooter,
  DetailHeader,
  RelatedAd,
  ScreenWrapper,
} from "../../../components";
import { selectCategoryList } from "../../../redux/slices/config";
import {
  selectFavAds,
  selectIsLoggedIn,
  selectUserMeta,
  setAdsFav,
} from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { WebLink } from "../../../utills/Constants";
import { height, width } from "../../../utills/Dimension";
import GlobalMethods, {
  checkPrice,
  formatPrice,
  formatPriceE,
  infoMessage,
} from "../../../utills/Methods";
import styles from "./styles";
export default function Detail({ navigation, route }) {
  const { t } = useTranslation();
  const dat = route?.params;
  const loginuser = useSelector(selectUserMeta);
  const islogin = useSelector(selectIsLoggedIn);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setDat] = useState([]);
  const favAdIds = useSelector(selectFavAds);
  const [fav, setFav] = useState(false);

  const [load, setload] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  // const img = data?.images?.map((item) => {
  //   return { img: item };
  // });
  const img =
    data?.images?.map((item) => {
      return item;
    }) || [];
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
  useEffect(() => {
    if (data && mapRef?.current) {
      mapRef?.current.animateToRegion(
        {
          latitude: data?.latitude || 0,
          longitude: data?.longitude || 0,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
        3 * 1000
      );
    }
  }, [data, mapRef?.current]);
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
      } else setDat({});
      setload(false);
    } catch (error) {
      setload(false);
    }

    // dispatch(setAppLoader(false));
  };
  return (
    <ScreenWrapper
      showStatusBar={false}
      headerUnScrollable={() => (
        <DetailHeader
          onPressBack={() => navigation.goBack()}
          onPressShare={() =>
            GlobalMethods.onPressShare(`${WebLink}${data?._id}`, data?.title)
          }
        />
      )}
      footerUnScrollable={() =>
        !(data?.userId?._id == loginuser?._id || load) &&
        islogin && (
          <DetailFooter
            pNumber={data?.phone}
            onPressCall={() =>
              GlobalMethods.onPressCall(data?.userId?.phoneNumber)
            }
            onPressChat={() => {
              navigation.navigate(ScreenNames.CHAT, {
                userRoom: null,
                usr: data?.userId,
                userItem: data,
              });
            }}
            onPressMail={() =>
              GlobalMethods.onPressEmail(
                data?.userId?.email,
                loginuser?.email,
                data?.title + `${WebLink}${data?._id}`
              )
            }
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
            <Swiper
              style={{ height: height(30) }}
              activeDotColor={AppColors.primary}
              dotColor="white"
              automaticallyAdjustContentInsets={true}
            >
              {img.map((image, index) => (
                <Pressable
                  key={index}
                  style={{
                    width: width(100),
                    height: height(32),
                    // backgroundColor: AppColor.lightGrey,
                  }}
                  onPress={() => {
                    setShowModal(true);
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    resizeMode="contain"
                    style={{
                      width: width(100),
                      height: height(32),
                      marginTop: height(1),
                      // alignSelf: "center",
                    }}
                    // style={{ flex: 1, resizeMode: "cover" }}
                  />
                </Pressable>
              ))}
            </Swiper>
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
              {checkPrice(data?.price) ? (
                <View style={{}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: height(2),
                      color: AppColors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    CHF {formatPrice(data?.price)}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: height(1.5),
                      color: "grey",
                      fontWeight: "bold",
                    }}
                  >
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
              {!(data?.userId?._id === loginuser?._id) ? (
                <TouchableOpacity
                  style={{ marginHorizontal: width(3) }}
                  onPress={onpressfav}
                >
                  <AntDesign
                    size={height(2.5)}
                    color={fav ? AppColors.primary : "black"}
                    name={fav ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>

            <View style={{ width: width(70) }}>
              <Text style={{ fontWeight: "bold", fontSize: height(2.5) }}>
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
                <Entypo name="location-pin" color={"grey"} size={height(2)} />
                <Text style={{ fontSize: height(1.53) }}>{data?.address}</Text>
              </View>
            </View>
          </View>
          {
            //detail view
          }
          <View style={styles.detailview}>
            <View style={styles.detailcard}>
              <Text style={{ fontSize: height(2.5), fontWeight: "bold" }}>
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
                    {t(`type.${data?.type}`)}
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

          {!isNullOrNullOrEmpty(data?.description) && (
            <View style={{ paddingLeft: width(5), paddingBottom: width(3) }}>
              <Text style={{ fontWeight: "bold", fontSize: height(2.5) }}>
                {t("detail.description")}
              </Text>
              <Text
                selectable={true}
                style={{ fontSize: height(1.5), paddingVertical: width(2) }}
              >
                {data?.description}
              </Text>
            </View>
          )}
          {/* user profile */}
          {!(data?.userId?._id == loginuser?._id) && (
            <Pressable
              onPress={() => {
                if (islogin) {
                  navigation.navigate(ScreenNames.OTHERPROFILE, {
                    user: data?.userId,
                  });
                } else {
                  infoMessage(
                    t(`flashmsg.loginfavorite`),
                    t(`flashmsg.authentication`)
                  );
                }
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
                      fontSize: height(2),
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
                      fontSize: height(1.3),
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
                <Entypo name="chevron-right" size={height(4)} />
              </View>
            </Pressable>
          )}
          {!(data?.userId?._id == loginuser?._id) && islogin && (
            <View style={styles.contact}>
              {!isNullOrNullOrEmpty(data?.whatsapp) && (
                <TouchableOpacity
                  style={{ marginRight: height(2) }}
                  onPress={() => GlobalMethods.openWhatsApp(data?.whatsapp)}
                >
                  <Ionicons
                    size={height(5)}
                    name="logo-whatsapp"
                    color={"#41C053"}
                  />
                </TouchableOpacity>
              )}
              {!isNullOrNullOrEmpty(data?.viber) && islogin && (
                <TouchableOpacity
                  style={{ paddingTop: height(1) }}
                  onPress={() => {
                    let res = GlobalMethods.openViber(data?.viber);
                  }}
                >
                  <Fontisto size={height(4.5)} name="viber" color={"#59267c"} />
                </TouchableOpacity>
              )}
            </View>
          )}
          {!isNullOrNullOrEmpty(data?.address) && (
            <View style={{ paddingLeft: width(4) }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: height(2.5),
                  marginVertical: width(2),
                }}
              >
                {t("detail.location")}
              </Text>
            </View>
          )}
          {!isNullOrNullOrEmpty(data?.address) && (
            <View style={styles.map}>
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: data?.latitude || 0,
                  longitude: data?.longitude || 0,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: width(3),
                }}
              >
                <Marker
                  coordinate={{
                    latitude: data?.latitude || 0,
                    longitude: data?.longitude || 0,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                />
              </MapView>
            </View>
          )}
          {/* <RelatedAd category={data?.category} id={data?._id} /> */}
        </View>
      )}
      <Modal
        animationInTiming={300}
        animationOutTiming={600}
        animationIn={"lightSpeedIn"}
        animationOut={"lightSpeedOut"}
        isVisible={showModal}
        backdropOpacity={1}
        swipeDirection="down"
        backdropColor={AppColors.black}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        onSwipeComplete={() => {
          setShowModal(false);
        }}
        onBackdropPress={() => {
          setShowModal(false);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowModal(false);
          }}
          style={{
            marginTop: width(10),
            alignSelf: "flex-end",
            backgroundColor: "rgba(0, 0, 0,.6)",
          }}
        >
          <Ionicons name="close" size={height(5)} color={AppColors.white} />
        </TouchableOpacity>
        <Swiper
          showsButtons={true}
          nextButton={
            <View
              style={{ backgroundColor: "rgba(0, 0, 0,.2)", padding: width(1) }}
            >
              <AntDesign
                name="caretright"
                size={height(3)}
                color={AppColors.white}
              />
            </View>
          }
          prevButton={
            <View
              style={{ backgroundColor: "rgba(0, 0, 0,.2)", padding: width(1) }}
            >
              <AntDesign
                name="caretleft"
                size={height(3)}
                color={AppColors.white}
              />
            </View>
          }
          activeDotColor={AppColors.primary}
          dotColor="white"
          automaticallyAdjustContentInsets={true}
        >
          {img.map((image, index) => (
            <Pressable key={index} style={styles.modelView}>
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={styles.modelImage}
              />
            </Pressable>
          ))}
        </Swiper>
      </Modal>
    </ScreenWrapper>
  );
}
